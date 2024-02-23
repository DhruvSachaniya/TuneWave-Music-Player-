import { useParams } from "react-router-dom";
import FirstCompo from "../first-compo/fiirstcompo";
import Footer from "../Footer/Footer";
import FirstSection from "../second-compo/firstsection";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlaylistPage() {
    const { playlistId } = useParams();
    const [playlistdata, setPlaylistData] = useState(null);

    useEffect(() => {
        async function fetchPlaylistData() {
            try {
                const role = localStorage.getItem("role");
                if (role === "user" || role === "artist") {
                    const res = await axios({
                        url: role === "user" ? `/user/playlist/${playlistId}` : `/artist/playlist/${playlistId}`,
                        method: "get",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        }
                    });
                    setPlaylistData(res.data);
                }
            } catch (error) {
                console.error("Error fetching playlist data:", error.message);
            }
        }
        fetchPlaylistData();
    }, [playlistId]);

    if (!playlistdata) {
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
                    <h1>{playlistdata.name}</h1>
                    <p>{playlistdata.name} . {playlistdata.musics.length} songs</p>
                    <div className="playlist-container-2">
                        <h3>hellow there</h3>
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
                            {/* second for the data */}
                            {playlistdata.musics.map((playlist, index) => (
                                <div className="playlist-song-area-2" key={playlist.id}>
                                    <div>{index + 1}</div>
                                    <div className="library-likedsongs playlist-song-list">
                                        <div>
                                            <img style={{ width: "40px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
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
                            ))}
                        </div>
                    </div>
                </div>
                {/* Render playlist content here */}
                <Footer />
            </div>
        </div>
    );
}
