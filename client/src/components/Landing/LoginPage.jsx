import { useState } from "react";
import axios from "axios";
import LandingFooter from "./LandingFooter";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [values, setvalue] = useState({
    email: "",
    password: "",
  });

  function handlechange(event) {
    const { name, value } = event.target;

    setvalue({
      ...values,
      [name]: value,
    });
  }

  async function handlesubmit(event) {
    event.preventDefault();

    try {
      const response = await axios({
        url: "auth/login",
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({
          username: values.email,
          password: values.password,
        }),
      });

      if (response.status === 201) {
        toast("Login successfully!", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        localStorage.setItem("jwt_token", response.data.token);
        localStorage.setItem("role", response.data.role);

        navigate("/");
      } else if (response.status === 401) {
        toast.error(response.data.message);
      }
    } catch (error) {
      // Handle network or unexpected errors
      if (error.response) {
        // Server responded with a status other than 2xx
        toast.error(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // Request was made but no response received
        toast.error("No response from the server. Please try again.");
      } else {
        // Something else caused the error
        toast.error("An unexpected error occurred. Please try again.");
      }
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
          <h1 style={{ fontSize: "2em", margin: "48px 0px" }}>
            Login to music-Player
          </h1>
          <hr />
          <form onSubmit={handlesubmit}>
            <div className="login-box">
              <div class="input-box">
                <span class="material-symbols-sharp icon">mail</span>
                <input
                  name="email"
                  value={values.email}
                  onChange={handlechange}
                  type="email"
                  required
                />
                <label>Email</label>
              </div>

              <div class="input-box">
                <span class="material-symbols-sharp icon">key</span>
                <input
                  name="password"
                  value={values.password}
                  onChange={handlechange}
                  type="password"
                  required
                />
                <label>Password</label>
              </div>

              <div class="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>

              <button type="submit">Login</button>
            </div>
          </form>
          <hr style={{ width: "80%" }} />

          <div class="register-link">
            <p>
              Don't have an account? <a href="/#">Register</a>
            </p>
          </div>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
}
