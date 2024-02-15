import FooterSection1 from "./footersection1";
import FooterSection2 from "./footersection2";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <FooterSection1 />
                <FooterSection2 />
                {/* <hr/> */}
                {/* @2024 music-player ab */}
            </div>
            <hr className="footer-hr" />
            <div className="footer-copyright">
                <p>@2024 music-player Ab</p>
            </div>
        </>
    )
}