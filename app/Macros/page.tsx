import { NavBarH } from "../components/Shared/NavbarH";

import { Footer } from "../components/Shared/Footer";
import MacrosInfo from "../components/Macros/MacrosInfo";
import MacrosRecoder from "../components/Macros/MacroRecorder";


const MacrosPage = () => {
 return (
  <div className='flex flex-col min-h-screen'>
  <NavBarH />

  <MacrosInfo />
 
  {/* <Footer /> */}
</div>
 );
};
export default MacrosPage;