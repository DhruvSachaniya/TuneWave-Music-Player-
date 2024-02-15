import FirstCompo from "../first-compo/fiirstcompo";
import SecondCompo from "../second-compo/secondcompo";

export default function AppBase () {
    return(
        <div className="container">
            <FirstCompo/>
            <SecondCompo/>
        </div>
    );
}