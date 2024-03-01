import MusicPlayer from "../Music-player/MusicPlayer";
import FirstCompo from "../first-compo/fiirstcompo";
import SearchSecond from "./second-search/searchsecond";

export default function SearchPage() {
    const audioFiles = [
        "http://localhost:3333/uploads/audio_file/dancemonekey-d6f1023fdd3f115e586d581025ff299405.mp3",
        "http://localhost:3333/uploads/audio_file/crash-88519af98b35319bc8323bad7cba1f310.mp3"
    ];
    return(
        <div className="container">
            <FirstCompo/>
            <SearchSecond/>
            <MusicPlayer audioFiles={audioFiles} />
        </div>
    );
}