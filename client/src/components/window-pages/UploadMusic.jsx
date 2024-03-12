import { useState } from "react";
import LandingFooter from "../Landing/LandingFooter";
import axios from "axios";
import toast from "react-hot-toast";

export default function UploadMusicPage() {

    const [values, setvalue] = useState({
        musicname: "",
        description: "",
    })

    const [imagefile, setfile] = useState();
    const [musicfile, setMusicFile] = useState();

    const getimage = (e) => {
        setfile(e.target.files[0]);
    }

    const getmusic = (e) => {
        setMusicFile(e.target.files[0]);
    }

    function handlechange(event) {
        const { name, value } = event.target;

        setvalue({
            ...values,
            [name]: value
        })
    }

    async function handlesumbit(event) {
        event.preventDefault();

        const formdata = new FormData();
        // name, description, mp3, image
        formdata.append("name", values.musicname);
        formdata.append("description", values.description);
        formdata.append("mp3", musicfile);
        formdata.append("image", imagefile);

        try {
            const response = await axios({
                url: "/artist/upload",
                method: "post",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                    "Content-Type": "multipart/form-data"
                },
                data: formdata
            })

            if (response.status === 201) {
                toast('music uploaded succesfully!',
                    {
                        icon: '👏',
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                        },
                    },
                    setvalue({
                        musicname: "",
                        description: "",
                    }),
                    setfile(""),
                    setMusicFile(""),
                    window.location.reload()
                );
            }
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="login-container">
            <div className="login-container-1">
                <img src={"/images/music-player-logo.png"} alt="logo" />
                <h1>Music-Player</h1>
            </div>
            <div className="login-container-2">
                <div className="login-container-2-div">
                    <h1 style={{ fontSize: "2em", margin: "48px 0px" }}>Upload Music</h1>
                    <hr />
                    <form onSubmit={handlesumbit}>
                        <div className="login-box" style={{ gap: "0" }}>
                            <div class="input-box">
                                <span class="material-symbols-sharp icon">
                                    person
                                </span>
                                <input name="musicname" value={values.musicname} onChange={handlechange} type="text" required />
                                <label>Music Name</label>
                            </div>

                            <div class="input-box">
                                <span class="material-symbols-sharp icon">
                                    description
                                </span>
                                <input name="description" value={values.description} onChange={handlechange} type="text" required />
                                <label>Description</label>
                            </div>
                            <label>Music Image</label>
                            <div style={{ marginRight: "4rem" }}>
                                <input
                                    className="inputfile"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={getimage}
                                />
                            </div>
                            <p style={{ fontSize: "smaller", marginTop: "5px" }}>Note: Make sure That Image File Name can not containes *spaces*</p>

                            <label style={{ marginTop: "1rem"}}>Music File</label>
                            <div style={{ marginRight: "4rem" }}>
                                <input
                                    className="inputfile"
                                    type="file"
                                    accept="audio/mp3,audio/*;capture=microphone"
                                    name="mp3"
                                    onChange={getmusic}
                                />
                            </div>

                            <button style={{ marginTop: "1rem"}} type="submit">Upload</button>

                        </div>
                    </form>
                    <hr style={{ width: "80%" }} />
                </div>
            </div>
            <LandingFooter />
        </div>
    );
}