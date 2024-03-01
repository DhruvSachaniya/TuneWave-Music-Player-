import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";

export default function AccountPage() {

    const [vendordata, setVendorData] = useState(null);

    useEffect(() => {
        async function getVendorData() {
            console.log("hii")
            const role = localStorage.getItem("role");
            try {
                let url = "";
                if (role === "user") {
                    url = "/user/details";
                } else if (role === "artist") {
                    url = "/artist/details";
                }
                if (url) {
                    const response = await axios({
                        url: url,
                        method: "get",
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("jwt_token"),
                            "Content-Type": "application/json"
                        }
                    });
                    setVendorData(response.data);
                }
            } catch (error) {
                console.error("Error fetching vendor data:", error.message);
            }
        }
        getVendorData();
    }, []);

    return (
        <div className="accountpage-container">
            <div className="accountpage-navbar">
                <div className="accountpage-navbar-1">
                    <img src={"/images/music-player-logo.png"} alt="logo" />
                    <h1>Music-Player</h1>
                </div>
                <div className="accountpage-navbar-2">
                    <span style={{ fontSize: "45px" }} class="material-symbols-sharp">
                        account_circle
                    </span>
                    <p>Profile</p>
                </div>
            </div>
            <div className="accountpage-small">
                <div className="accountpage-navbar-3">
                    <div>
                        <p>Your plan</p>
                        {vendordata && vendordata.role ? (
                            <h2>TuneWave {vendordata.role }</h2>
                        ) : null}
                        <div style={{
                            position: "absolute",
                            bottom: "0"
                        }} className="librarysection-2">
                            <p>🌐English</p>
                        </div>
                    </div>
                    <div>
                        <img src={"/images/music-player-logo.png"} alt="logo" />
                    </div>
                </div>
                <div className="accountpage-settings">
                    <div>
                        <h3>Account</h3>
                    </div>
                    <div></div>
                </div>
                <div className="accountpage-help">
                    <div>
                        <h3>Help</h3>
                    </div>
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "5px"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}>
                            <span class="material-symbols-sharp">
                                help_center
                            </span>
                            <h3>TuneWave Support</h3>
                        </div>
                        <span class="material-symbols-outlined">
                            arrow_forward_ios
                        </span>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}