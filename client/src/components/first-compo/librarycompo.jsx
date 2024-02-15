import toast from "react-hot-toast";

export default function LibrarySection() {
    return (
        <div className="librarysection">
            <div className="librarysection-1">
                <div>
                    <span class="material-symbols-outlined">
                        library_music
                    </span>
                    <p>Your Library</p>
                </div>
                <span class="material-symbols-outlined">
                    add
                </span>
            </div>
            <div className="librarysection-2">
                <p>Playlists</p>
            </div>
            <div className="librarysection-3">
                <span class="material-symbols-sharp">
                    search
                </span>
                <div>
                    <p>Recents</p>
                    <span class="material-symbols-sharp">
                        menu
                    </span>
                </div>
            </div>
            {/* liked songs area */}
            <div className="librarysection-4">
                <div className="library-likedsongs">
                    <div>
                        <img src="https://misc.scdn.co/liked-songs/liked-songs-300.png" alt="liked_song"/>
                    </div>
                    <div>
                        <h3 style={{ marginLeft: "5px"}}>Liked Songs</h3>
                        <div className="library-likedsongs-2">
                            <span style={{ color: "green"}} class="material-symbols-sharp">
                                push_pin
                            </span>
                            <p>Plyalist. 28 songs</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* all playlist  */}
            <div className="library-section-5">
                <h3>Create your first playlist</h3>
                <p>It's easy, we'll help you</p>
                <button onClick={() => { 
                    toast('Log in to create and share playlists.',
                {
                    icon: '👏',
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                }
            );
                 }}>Create Plyalist</button>
            </div>
            <div className="librarysection-2">
                 <p>🌐English</p>
            </div>
        </div>
    );
}