export default function HomeAndSearch() {
    return (
        <div className="homeandsearch">
            {/* for home page */}
            <div>
                <span class="material-symbols-outlined">
                    home
                </span>
                <p>Home</p>
            </div>
            {/* for search page */}
            <div>
                <span class="material-symbols-outlined">
                    search
                </span>
                <p>Search</p>
            </div>
        </div>
    );
}