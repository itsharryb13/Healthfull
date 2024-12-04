//import Link from "next/link";
import { NavBarH } from "../components/Shared/NavbarH";
import NewRecipeForm from "../components/NewRecipe/NewRecipeForm";
import { Footer } from "../components/Shared/Footer";


const NewRecipePage = () => {
 return (
  <div className='flex flex-col min-h-screen'>
  <NavBarH />

  <div className='flex-grow flex justify-center items-start mt-8 mb-8'>
    <NewRecipeForm docNumber={""} />
  </div>
 
  {/* <Footer /> */}
</div>
 );
};
export default NewRecipePage;
