import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function SecondSection() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [vendordata, setVendorData] = useState(null);
    const [allartistdata, setallartistData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
                        url: role === "user" ? "/user/details" : "/artist/details",
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

    }, [vendordata]);

    useEffect(() => {
        async function fetchtheallartist() {
            if(isLoggedIn) {
                try {
                    const allartist = await axios({
                        url: "/artist/all",
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt_token")
                        }
                    })
                    setallartistData(allartist.data);
                } catch(error) {
                    console.log("failed to fecth the allartist", error.message);
                }
            }
        }
        fetchtheallartist();
        // console.log(allartistdata);
    }, [vendordata])

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
                        {vendordata ? (
                            <h3>Made For {vendordata.name}</h3>
                        ): null}
                        <h3 style={{ color: "gray" }}>show all</h3>
                    </div>
                    <div className="secondsection-2">
                    {allartistdata && allartistdata.length > 0 ? (
                        allartistdata.map((playlist) => (
                        <div className="secondsection-2-card" key={playlist.id} 
                            onClick={ () => {navigate(`/artist/${playlist.id}`)}}
                        >
                            <div>
                                <img src={`http://localhost:3333/uploads/artist_photos/${playlist.album_photo}`} alt="liked_song" />
                            </div>
                            <p>{playlist.name}</p>
                            <p style={{ fontSize: "smaller", color: "#a7a7a7" }}>description</p>
                        </div>
                        ))
                    ) : null}
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