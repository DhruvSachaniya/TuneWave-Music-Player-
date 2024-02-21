import { useNavigate } from "react-router-dom";

export default function HomeAndSearch() {
    
    const navigate = useNavigate();

    return (
        <div className="homeandsearch">
            {/* for home page */}
            <div onClick={() => navigate("/")}>
                <span class="material-symbols-outlined">
                    home
                </span>
                <p>Home</p>
            </div>
            {/* for search page */}
            <div onClick={() => navigate("/search")}>
                <span class="material-symbols-outlined">
                    search
                </span>
                <p>Search</p>
            </div>
        </div>
    );
}