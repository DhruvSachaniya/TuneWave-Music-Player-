import FirstCompo from "../first-compo/fiirstcompo";
import Footer from "../Footer/Footer";
import FirstSection from "../second-compo/firstsection";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import MusicPlayer from "../Music-player/MusicPlayer";
import { addSongsforMusicPlayer } from "../../redux/redux-files/counterlist";

export default function LikedSongPage() {
    const [likedsongdata, setLikedsongdata] = useState(null);
    const [likedsongmusic, setlikedsongmusic] = useState([]);

    const count = useSelector(state => state.counterList.state)
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchLikedSongData() {
            try {
                const res = await axios({
                    url: "/likedsong",
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                    }
                });
                setLikedsongdata(res.data);
            } catch (error) {
                console.error("Error fetching playlist data:", error.message);
            }
        }
        fetchLikedSongData();
    }, []);

    useEffect(() => {
        async function fetchMusicData() {
            try {
                if (likedsongdata && likedsongdata.length > 0) { // Check if likedsongdata is not empty
                    const promises = likedsongdata.map(async (song) => { // Map over each song object
                        const musicResponses = [];

                        const res = await axios.post("/getmusicbyids", { musicIds: song.music }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("jwt_token")
                            }
                        });

                        musicResponses.push(res.data);

                        return musicResponses; // Return array of music data for the current song
                    });

                    const allMusicData = await Promise.all(promises); // Wait for all requests to finish
                    // Flatten the array of arrays into a single array of music data
                    const flatMusicData = allMusicData.flat();
                    setlikedsongmusic(flatMusicData); // Update the state with all music data
                }
            } catch (error) {
                console.error("Error fetching music data:", error.message);
            }
        }

        fetchMusicData();
        console.log(likedsongmusic);
    }, [likedsongdata]);




    if (!likedsongdata) {
        return <div>Loading playlist data...</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "short", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container">
            <FirstCompo />
            <div className="secondcompo">
                <FirstSection />
                <div className="playlist-container">
                    <h1>Liked Songs</h1>
                    {likedsongdata ? (
                        <p>{likedsongdata.name} . {likedsongdata[0].music.length} songs</p>
                    ) : (
                        <p>Loading playlist data...</p>
                    )}
                    <div className="playlist-container-2">
                        <h3>hellow there</h3>
                        <div className="playlist-song-area">
                            <div className="playlist-song-area">
                                {/* one for first row */}
                                <div className="playlist-song-area-1">
                                    <div>#</div>
                                    <div style={{ marginLeft: "10px" }}>title</div>
                                    <div>album</div>
                                    <div>date</div>
                                    <div>time</div>
                                </div>
                                <div className="playlist-line" />
                                {likedsongdata && likedsongmusic && likedsongmusic.length > 0 ? (
                                likedsongmusic[0].map((playlist, index) => (
                                    <div className="playlist-song-area-2" key={playlist.id} onClick={() => dispatch(addSongsforMusicPlayer(likedsongmusic[0]))}>
                                        <div>{index + 1}</div>
                                        <div className="library-likedsongs playlist-song-list">
                                            <div>
                                                <img style={{ width: "40px" }} src={`http://localhost:3333/uploads/music_photos/${encodeURIComponent(playlist.music_photo)}`} alt="liked_song" />
                                            </div>
                                            <div>
                                                <h3>{playlist.name}</h3>
                                                <div className="library-likedsongs-2">
                                                    <p>{playlist.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div>{playlist.ArtistId}</div>
                                        <div>{formatDate(playlist.createdAt)}</div>
                                        <div>time</div>
                                    </div>
                                ))
                            ) : (
                                <p>No liked songs found.</p>
                            )}
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
            <MusicPlayer/>
        </div>
    );
}
