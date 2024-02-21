import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"

export default function FirstSearchSection() {
    const navigate = useNavigate()

    const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                        <div className="search-input">
                            <span class="material-symbols-sharp search-input-icon">
                                search
                            </span>
                            <input type="text" placeholder="what do you want to play!" />
                        </div>
                        {/* search input field will come here */}
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
                        <div className="search-input">
                            <span class="material-symbols-sharp search-input-icon">
                                search
                            </span>
                            <input type="text" placeholder="what do you want to play!" />
                        </div>
                        {/* search input field will come here */}
                    </div>
                    <div style={{ gap: "30px" }} className="firstsection-2">
                        <i class="fa-regular fa-bell fa-lg"></i>
                        <i class="fa-solid fa-user fa-lg"></i>
                    </div>
                </div>
                // different page show
            )}
        </>
    );
}