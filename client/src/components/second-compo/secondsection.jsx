import { useEffect, useState } from "react";
import axios from "axios"

export default function SecondSection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [vendordata, setVendorData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkLogin() {
            try {
                const response = await axios({
                    url: "/isloggedin",
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                        "Content-Type": "application/json"
                    }
                });
                if (response.status === 200) {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.log(error);
            }
        }
        checkLogin();
    }, []);

    useEffect(() => {
        async function getVendorData() {
            try {
                const role = localStorage.getItem("role");
                if (role === "user" || role === "artist") {
                    const res = await axios({
                        url: role === "user" ? "user/details" : "artist/details",
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                            "Content-Type": "application/json"
                        }
                    });
                    setVendorData(res.data);
                    setIsLoading(false);
                }
            } catch (error) {
                console.error("Error fetching vendor data:", error.message);
            }
        }
        getVendorData();
        console.log(vendordata);
    }, []);

    return (
        <>
            {isLoggedIn === false ? (
                <div className="secondsection">
                    <div className="secondsection-1">
                        <h3>song Plyalist</h3>
                        <h3 style={{ color: "gray" }}>show all</h3>
                    </div>
                    <div className="secondsection-2">
                        <div className="secondsection-2-card">
                            <div>
                                <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            </div>
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="secondsection">
                    <div className="secondsection-1">
                        <h3>Made For </h3>
                        <h3 style={{ color: "gray" }}>show all</h3>
                    </div>
                    <div className="secondsection-2">
                        <div className="secondsection-2-card">
                            <div>
                                <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            </div>
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        <div className="secondsection-2-card">
                            <img style={{ width: "150px" }} src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song" />
                            <p>title</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}