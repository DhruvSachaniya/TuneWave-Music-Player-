import { useState } from "react";
import LandingFooter from "./LandingFooter";
import axios from "axios";
import toast from "react-hot-toast";

export default function UserSignUpPage() {
    
    const [values, setvalue] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handlechange = (event) => {
        const { name, value } = event.target;

        setvalue({
            ...values,
            [name]: value
        })
    }

    const  handlesubmit = async (event) => {
        event.preventDefault();

        const response = await axios({
            url: "auth/signup/user",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                values
            })
        })

        if(response.status === 201) {
            toast('usersignup sucessfully!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
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
                    <h1 style={{ fontSize: "2em", margin: "48px 0px" }}>Sign up to start listening</h1>
                    <hr />
                    <form onSubmit={handlesubmit}>
                        <div className="login-box">
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
                        <p style={{ marginTop: "3px"}}>Signup for Artist account?  <a href="/usersignup">Register</a></p>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
}