import { useNavigate } from "react-router-dom";

export default function AccountWindow() {
    const navigate = useNavigate();

    async function handlelogout () {
        localStorage.removeItem("jwt_token");
        window.location.reload();
    }
    
    return(
        <div className="profile-mini-cart">
            <div className="profile-mini-cart-1" onClick={() => { navigate("/account-overview")}}>
                <p> Account </p>
                <i class="fa-solid fa-arrow-up-right-from-square fa-bounce"></i>
            </div>
            <div className="profile-mini-cart-1">
                <p> Profile </p>
            </div>
            <div className="profile-mini-cart-1">
                <p> Support </p>
                <i class="fa-solid fa-arrow-up-right-from-square fa-bounce"></i>
            </div>
            <div className="profile-mini-cart-1">
                <p> Settings</p>
            </div>
            <div className="profile-mini-cart-logout" onClick={handlelogout}>
                <p>Logout</p>
            </div>
        </div>
    );
}