import axios from "axios";
import toast from "react-hot-toast";

export default async function AddToLikedSongFunction(props) {
  try {
    const response = await axios({
      url: "/addlikedsong",
      method: "post",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt_token"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        music_id: props,
      }),
    });

    if (response.status === 201) {
      toast.success("Added To Liked Songs", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      window.location.reload(true);
    } else {
      toast.error("Failed to add to liked songs");
    }
  } catch (error) {
    toast.error("Failed to add to liked songs");
  }
}
