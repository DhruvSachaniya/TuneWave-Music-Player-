import { useState } from "react";

export default function SecondSection() {
    const [notloggedin, setnotloggedin] = useState(false);


    if (localStorage.getItem("jwt_token") === "") {
        setnotloggedin(true)
    }

    return (
        <>
            {notloggedin === true ? (
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
                        <h3>Made For name of user</h3>
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