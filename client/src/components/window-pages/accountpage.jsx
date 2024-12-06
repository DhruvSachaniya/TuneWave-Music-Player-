import { useState, useEffect } from "react";
import Footer from "../Footer/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

export default function AccountPage() {
  const navigate = useNavigate();
  const [vendordata, setVendorData] = useState(null);

  useEffect(() => {
    async function getVendorData() {
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
              Authorization: "Bearer " + localStorage.getItem("jwt_token"),
              "Content-Type": "application/json",
            },
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
        <div
          className="accountpage-navbar-1"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={"/images/music-player-logo.png"} alt="logo" />
          <h1>Music-Player</h1>
        </div>
        <div className="accountpage-navbar-2">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "45px" }} class="material-symbols-sharp">
              account_circle
            </span>
            <p>Profile</p>
          </div>
        </div>
      </div>
      <div className="accountpage-small">
        <div className="accountpage-navbar-3">
          <div>
            <p>Your plan</p>
            {vendordata && vendordata.role ? (
              <h2>TuneWave {vendordata.role}</h2>
            ) : null}
            <div
              style={{
                position: "absolute",
                bottom: "0",
              }}
              className="librarysection-2"
            >
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
          {vendordata && vendordata.role === "artist" ? (
            <>
              <div
                className="accountpage-settings-field"
                onClick={() => navigate("/uploadmusic")}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "5px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span class="material-symbols-outlined">upload</span>
                    <h3>Upload Music</h3>
                  </div>
                  <div>
                    <span class="material-symbols-outlined">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
                onContextMenu={(e) => {
                  e.preventDefault(); // prevent the default behaviour when right clicked
                  console.log("Right Click");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">edit</span>
                  <h3>Edit Profile</h3>
                </div>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">edit</span>
                  <h3>Edit Profile</h3>
                </Box>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </Box>
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-outlined">manage_accounts</span>
                  <h3>Manage you Plan</h3>
                </div>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">help_center</span>
                  <h3>Account Settings</h3>
                </div>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">Home</span>
                  <h3>Address</h3>
                </div>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
                onContextMenu={(e) => {
                  e.preventDefault(); // prevent the default behaviour when right clicked
                  console.log("Right Click");
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">edit</span>
                  <h3>Edit Profile</h3>
                </div>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "5px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span class="material-symbols-sharp">edit</span>
                  <h3>Edit Profile</h3>
                </Box>
                <span class="material-symbols-outlined">arrow_forward_ios</span>
              </Box>
            </>
          )}
        </div>
        <div className="accountpage-help">
          <div>
            <h3>Help</h3>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <span class="material-symbols-sharp">help_center</span>
              <h3>TuneWave Support</h3>
            </div>
            <span class="material-symbols-outlined">arrow_forward_ios</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
