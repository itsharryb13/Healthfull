import { Footer } from "../components/Shared/Footer";
import InfoHomePage from "../components/HomePage/InfoHomePage";
import { NavBarH } from "../components/Shared/NavbarH";
import { Banner } from "../components/Welcome page/Banner";


export default function Homepage(){
    return(
        <>
       <NavBarH/>
        <InfoHomePage/>
        <Footer/>
        </>
    );

}