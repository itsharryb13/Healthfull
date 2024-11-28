import InfoHomePage from "../components/Additional/InfoPage";
import { Footer } from "../components/Shared/Footer";
import { NavBarH } from "../components/Shared/NavbarH";

export default function Homepage(){
    return(
        <>
        <NavBarH/>
        <div className="mb-8">
        <InfoHomePage />
      </div>
        <Footer/>
        </>
    );

}