import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function FirstSection() {
    const navigate = useNavigate()

    const [notloggedin, setnotloggedin] = useState(false);


    if (localStorage.getItem("jwt_token") === "") {
        setnotloggedin(true)
    }

    return (
        <>
            {notloggedin === true ? (
                <div className="firstsection">
                    <div className="firstsection-1">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                    <div className="firstsection-2">
                        <h3 onClick={() => { navigate('/usersignup') }}>Signup</h3>
                        <button onClick={() => { navigate('/login') }}>Log in</button>
                    </div>
                </div>
            ) : (
                <div className="firstsection">
                    <div className="firstsection-1">
                        <span class="material-symbols-outlined">
                            arrow_back_ios
                        </span>
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                    <div style={{ gap: "30px"}} className="firstsection-2">
                        <i class="fa-regular fa-bell fa-lg"></i>
                        <i class="fa-solid fa-user fa-lg"></i>
                    </div>
                </div>
                // different page show
            )}
        </>
    );
}