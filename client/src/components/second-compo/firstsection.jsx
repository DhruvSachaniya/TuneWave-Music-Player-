import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"
import AccountWindow from "../windows/accountwindow";

export default function FirstSection() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAccountWindowVisible, setIsAccountWindowVisible] = useState(false);

    useEffect(() => {
        async function checklogin() {
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
                    setIsLoggedIn(true)
                }
                if (response.status === 401) {
                    console.log('hii')
                }
            } catch (error) {
                console.log(error);
            }
        }
        checklogin()
    }, []);

    const handleUserIconClick = () => {
        setIsAccountWindowVisible(!isAccountWindowVisible);
    };

    const handleOutsideClick = () => {
        setIsAccountWindowVisible(false);
    };

    return (
        <>
            {isLoggedIn === false ? (
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
                    <div style={{ gap: "30px" }} className="firstsection-2">
                        <i class="fa-regular fa-bell fa-lg"></i>
                        <i style={{ cursor: "pointer"}} class="fa-solid fa-user fa-lg"
                            onClick={handleUserIconClick}
                        ></i>
                        {isAccountWindowVisible && <AccountWindow />}
                    </div>
                </div>
                // different page show
            )}
        </>
    );
}