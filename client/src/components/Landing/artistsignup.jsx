import { useState } from "react";
import LandingFooter from "./LandingFooter";
import axios from "axios";
import toast from "react-hot-toast";

export default function ArtistSignupPage() {
    
    const [values, setvalue] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [imagefile, setfile] = useState();

    const getimage = (e) => {
        setfile(e.target.files[0]);
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
        formdata.append("name", values.username);
        formdata.append("email", values.email);
        formdata.append("image", imagefile);
        formdata.append("password", values.password);

        try {
            const response = await axios({
                url: "auth/signup/artist",
                method: "post",
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                data: formdata
            })

            if(response.status === 201) {
                toast('artist signup sucessfully!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                },
                setvalue({
                    username: "",
                    email: "",
                    password: ""
                }),
                setfile(""),
                window.location.reload()
            );
            }
        } catch(error) {
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
                    <h1 style={{ fontSize: "2em", margin: "48px 0px" }}>Sign up to create music</h1>
                    <hr />
                    <form onSubmit={handlesumbit}>
                        <div className="login-box" style={{ gap: "0"}}>
                            <div class="input-box">
                                <span class="material-symbols-sharp icon">
                                    person
                                </span>
                                <input name="username" value={values.username} onChange={handlechange} type="text" required />
                                <label>username</label>
                            </div>

                            <div class="input-box">
                                <span class="material-symbols-sharp icon">
                                    mail
                                </span>
                                <input name="email" value={values.email} onChange={handlechange} type="email" required />
                                <label>Email</label>
                            </div>
                            <div style={{ marginRight: "4rem"}}>
                                <input
                                    className="inputfile"
                                    type="file"
                                    accept="image/*"
                                    name="image"
                                    onChange={getimage}
                                />
                            </div>
                            <p style={{ fontSize: "smaller", marginTop: "5px"}}>Note: Make sure That Image File Name can not containes *spaces*</p>

                            <div class="input-box">
                                <span class="material-symbols-sharp icon">
                                    key
                                </span>
                                <input name="password" value={values.password} onChange={handlechange} type="password" required />
                                <label>Password</label>
                            </div>

                            <div class="remember-forgot">
                                <label><input type="checkbox" /> Remember me</label>
                            </div>

                            <button type="submit">Sign up</button>

                        </div>
                    </form>
                    <hr style={{ width: "80%" }} />

                    <div class="register-link">
                        <p>Already have an account?  <a href="/login">Log in here.</a></p>
                        <p style={{ marginTop: "3px" }}>Signup for Artist account?  <a href="/usersignup">Register</a></p>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
}