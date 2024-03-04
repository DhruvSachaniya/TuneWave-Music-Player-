import MusicPlayer from "../Music-player/MusicPlayer";
import FirstCompo from "../first-compo/fiirstcompo";
import SearchSecond from "./second-search/searchsecond";

export default function SearchPage() {
    return(
        <div className="container">
            <FirstCompo/>
            <SearchSecond/>
            <MusicPlayer />
        </div>
    );
}