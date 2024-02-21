import { useState } from "react";
import axios from "axios"
import LandingFooter from "./LandingFooter";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const navigate = useNavigate();

    const [values, setvalue] = useState({
        email: "",
        password: ""
    });

    function handlechange(event) {
        const { name, value } = event.target;

        setvalue({
            ...values,
            [name]: value
        })
    }

    async function handlesumbit(event) {
        event.preventDefault();

        const response = await axios({
            url: "auth/login",
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                username: values.email,
                password: values.password
            })
        })

        if (response.status === 201) {
            toast('Login sucessfully!',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
            localStorage.setItem("jwt_token", response.data.token);
            localStorage.setItem("role", response.data.role);

            navigate("/");
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
                    <h1 style={{ fontSize: "2em", margin: "48px 0px" }}>Login to music-Player</h1>
                    <hr />
                    <form onSubmit={handlesumbit}>
                        <div className="login-box">
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

                            <button type="submit">Login</button>

                        </div>
                    </form>
                    <hr style={{ width: "80%" }} />

                    <div class="register-link">
                        <p>Don't have an account? <a href="/#">Register</a></p>
                    </div>
                </div>
            </div>
            <LandingFooter />
        </div>
    );
}