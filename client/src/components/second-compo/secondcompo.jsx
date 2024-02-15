import Footer from "../Footer/Footer";
import FirstSection from "./firstsection";
import SecondSection from "./secondsection";

export default function SecondCompo() {
    return(
        <div className="secondcompo">
            <FirstSection/>
            <SecondSection/>
            <Footer/>
        </div>
    );
}