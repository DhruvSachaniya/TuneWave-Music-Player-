import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import CreatePlaylistForm from "./createplyalist";
import AddToLikedSongFunction from "./AddtoLIkedSong";

export default function PlaylistEllipsisWindow(props) {
    const [isToggleButton, setIsToggleButton] = useState(false);
    const [vendordata, setVendorData] = useState(null);
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(false);

    const toggleCreatePlaylist = () => {
        setIsCreatePlaylistOpen(!isCreatePlaylistOpen);
    };

    const closeCreatePlaylistForm = () => {
        setIsCreatePlaylistOpen(false);
    };

    async function handleclick(playlist_id, music_id) {
        const role = localStorage.getItem("role");
        try {
            let url = "";
            if(role === "user") {
                url = "/user/addmusic";
            } else if(role === "artist") {
                url = "/artist/addmusic";
            }
            if(url) {
                const response = await axios({
                    url,
                    method: "post",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        playlist_id,
                        music_id
                    })
                })

                if(response.status === 201) {
                    toast.success("Added To Playlist", {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                } else {
                    toast.error("Faild To Add Playlist");
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

    async function handledelete(playlist_id, music_id) {
        const role = localStorage.getItem("role");
        try {
            let url = "";
            if(role === "user") {
                url = "/user/deletemusic";
            } else if(role === "artist") {
                url = "/artist/removemusic";
            }
            if(url) {
                const response = await axios({
                    url,
                    method: "delete",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        playlist_id,
                        music_id
                    })
                })

                if(response.status === 200) {
                    toast.success("Removed From Playlist", {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    });
                    window.location.reload(true);
                } else {
                    toast.error("Faild To Add Playlist");
                }
            }
        } catch(error) {
            console.log(error);
        }
    }

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
                }
            } catch (error) {
                console.error("Error fetching vendor data:", error.message);
            }
        }
        getVendorData();
    }, []);

    return (
        <>
        <div
            className="ellipsis-click-mini-cart"
            onMouseEnter={() => setIsToggleButton(true)}
            onMouseLeave={() => setIsToggleButton(false)}
        >
            <div className="ellipsis-click-mini-cart-1" >
                <div>
                    <span class="material-symbols-outlined">add</span>
                    Add to Playlist
                    <span class="material-symbols-outlined">arrow_right</span>
                </div>
                <div onClick={() => handledelete(props.playlistid, props.songId)}>
                    <span class="material-symbols-outlined">delete</span>
                    Delete
                </div>
                <div onClick={() => AddToLikedSongFunction(props.songId)}>
                    <i class="fa-solid fa-heart" style={{ color: "#c50707" }}></i>
                    Add to liked song
                </div>
            </div>
            {isToggleButton && (
                <div
                    className="ellipsis-click-mini-cart-1"
                    style={{
                        display: "block",
                        position: "absolute",
                        left: "-160px",
                        // right: "0",
                        top: "0"
                    }}
                >
                    <div onClick={toggleCreatePlaylist}>
                        <span class="material-symbols-outlined">add</span>
                        Create Playlist
                    </div>
                    
                    {vendordata && vendordata.role === "artist" && (
                        <>
                            {vendordata.Artist_Playlist.map((playlist) => (
                                <div key={playlist.id} onClick={() => handleclick(playlist.id, props.songId)}>
                                    <p>{playlist.name}</p>
                                </div>
                            ))}
                        </>
                    )}
                    {/* Additional content based on user role */}
                    {vendordata && vendordata.role === "user" && (
                        <>
                            {vendordata.User_Playlist.map((playlist) => (
                                <div key={playlist.id}>
                                    <p>{playlist.name}</p>
                                </div>
                            ))}
                        </>
                    )}
                    {/* user either artist music playlist will come here */}
                </div>
            )}
        </div>
        {isCreatePlaylistOpen && <CreatePlaylistForm closeForm={closeCreatePlaylistForm} />}
        </>
    );
}