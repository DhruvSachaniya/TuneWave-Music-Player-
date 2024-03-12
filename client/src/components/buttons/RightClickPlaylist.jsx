import axios from "axios";
import toast from "react-hot-toast";

export default function PlaylistRightClickWindow(props) {
    
    async function handleclick () {
        const role = localStorage.getItem("role");
        try {
            let url = "";
            if(role === "user") {
                url = "/user/playlist";
            } else if(role === "artist") {
                url = "/artist/playlist";
            }
            if(url) {
                const response = await axios({
                    url: url,
                    method: "delete",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        playlist_id: props.id
                    })
                });
                if(response.status === 200) {
                    toast(`playlist deleted successfully`,
                    {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    },
                    window.location.reload(true)
                ); 
                }
            }
        } catch(error) {

        }
    }

    return (
        <div className="right-click-mini-cart" >
            <div className="right-click-mini-cart-1">
                <div>
                    <span class="material-symbols-outlined">
                        edit
                    </span>
                    Edit details
                </div>
                <div onClick={handleclick}>
                    <span class="material-symbols-outlined">
                        delete
                    </span>
                    Delete
                </div>
            </div>
        </div>
    );
}