import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CreatePlaylistForm({ closeForm }) {
    const [isCreatePlaylistOpen, setIsCreatePlaylistOpen] = useState(true);

    const [getdata, setdata] = useState({
        name: ""
    });

    // const toggleCreatePlaylist = () => {
    //     setIsCreatePlaylistOpen(!isCreatePlaylistOpen);
    // };

    const handleClose = () => {
        setIsCreatePlaylistOpen(false);
        closeForm();
    };

    async function handlechange(event) {
        const { name, value } = event.target;

        setdata({
            ...getdata,
            [name]: value
        })
    };

    async function handlesubmit(event) {
        event.preventDefault();
        try {
            const role = localStorage.getItem("role");
            if (role === "user" || role === "artist") {
                const res = await axios({
                    url: role === "user" ? "user/playlist" : "artist/playlist",
                    method: "POST",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        name: getdata.name
                    })
                });
                if (res.status === 201) {
                    toast(`${getdata.name} playlist created`,
                        {
                            icon: '👏',
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
                        }
                    );
                    setdata({
                        name: ""
                    })
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Error fetching vendor data:", error.message);
        }
    }
    
    return (
    <div className={`create-playlist-overlay ${isCreatePlaylistOpen ? 'open' : 'closed'}`}>
        <form className="create-playlist-overlay-1" onSubmit={handlesubmit}>
            <div className="overlay-header">
                <h3>Create Playlist</h3>
                <span style={{ cursor: "pointer" }} className="material-symbols-sharp" onClick={handleClose}>
                    close
                </span>
            </div>
            <div class="input-box">
                <span class="material-symbols-sharp icon">
                    person
                </span>
                <input name="name" value={getdata.name} onChange={handlechange} type="text" required />
                <label>Plyalist name</label>
            </div>
            <div className="create-playlist-overlay-3">
                <button type="submit">Save</button>
            </div>
        </form>
    </div>
);
}
