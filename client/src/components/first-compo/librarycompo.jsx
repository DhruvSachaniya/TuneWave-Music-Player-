import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";
import CreatePlaylistForm from "../buttons/createplyalist";
import { Link, useNavigate } from "react-router-dom";

export default function LibrarySection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [vendordata, setVendorData] = useState(null);
    const [likedSongCount, setLikedSongCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await axios({
                    url: "/isloggedin",
                    method: "Get",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        async function getVendorData() {
            const role = localStorage.getItem("role");
            try {
                let url = "";
                if (role === "user") {
                    url = "/user/details";
                } else if (role === "artist") {
                    url = "/artist/details";
                }
                if (url) {
                    const response = await axios({
                        url: url,
                        method: "get",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                            "Content-Type": "application/json"
                        }
                    });
                    setVendorData(response.data);
                    setLikedSongCount(response.data.Liked_songs[0].music.length);
                }
            } catch (error) {
                console.error("Error fetching vendor data:", error.message);
            } finally {
                setIsLoading(false);
            }
        }
        getVendorData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const toggleCreatePlaylist = () => {
        setIsCreatePlaylistOpen(!isCreatePlaylistOpen);
    };

    const closeCreatePlaylistForm = () => {
        setIsCreatePlaylistOpen(false);
    };

    return (
        <div className="librarysection">
            <div className="librarysection-1">
                <div>
                    <span className="material-symbols-outlined">
                        library_music
                    </span>
                    <p>Your Library</p>
                </div>
                <span
                    // style={{ cursor: "pointer" }}
                    style={isLoggedIn ? ({ cursor: "pointer" }) : ({ cursor: "not-allowed" })}
                    className="material-symbols-outlined"
                    onClick={toggleCreatePlaylist}
                >
                    add
                </span>
                {isLoggedIn && isCreatePlaylistOpen && <CreatePlaylistForm closeForm={closeCreatePlaylistForm} />}
            </div>
            <div className="librarysection-2">
                <p>Playlists</p>
            </div>
            <div className="library-scroll">
                <div className="librarysection-3">
                    <span style={{ cursor: "not-allowed"}} className="material-symbols-sharp">
                        search
                    </span>
                    <div style={{ cursor: "not-allowed"}}>
                        <p>Recents</p>
                        <span className="material-symbols-sharp">
                            menu
                        </span>
                    </div>
                </div>

                <div className="librarysection-4" onClick={() => {
                    if (isLoggedIn)
                        navigate("/likedsongs")
                }}>
                    <div className="library-likedsongs">
                        <div>
                            <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                        </div>
                        <div>
                            <h3 style={{ marginLeft: "5px" }}>Liked Songs</h3>
                            <div className="library-likedsongs-2">
                                <span style={{ color: "green" }} className="material-symbols-sharp">
                                    push_pin
                                </span>
                                <p>Plyalist. {likedSongCount} songs</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Additional content based on user role */}
                {vendordata && vendordata.role === "artist" && (
                    <>
                        {vendordata.Artist_Playlist.map((playlist) => (
                            <div className="librarysection-4" key={playlist.id} onClick={() => {
                                navigate(`/playlist/${playlist.id}`);
                            }}>
                                <div className="library-likedsongs">
                                    <div>
                                        <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                                    </div>
                                    <div>
                                        <h3>{playlist.name}</h3>
                                        <div className="library-likedsongs-2">
                                            {/* <span style={{ color: "green" }} className="material-symbols-sharp">
                                            push_pin
                                        </span> */}
                                            <p>Playlist . {vendordata.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
                {/* Additional content based on user role */}
                {vendordata && vendordata.role === "user" && (
                    <>
                        {vendordata.User_Playlist.map((playlist) => (
                            <div className="librarysection-4" key={playlist.id} onClick={() => {
                                navigate(`/playlist/${playlist.id}`)
                            }}>
                                <div className="library-likedsongs">
                                    <div>
                                        <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                                    </div>
                                    <div>
                                        <h3>{playlist.name}</h3>
                                        <div className="library-likedsongs-2">
                                            {/* <span style={{ color: "green" }} className="material-symbols-sharp">
                                            push_pin
                                        </span> */}
                                            <p>Playlist . {vendordata.name}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="librarysection-2">
                <p>🌐English</p>
            </div>
        </div>
    );
}