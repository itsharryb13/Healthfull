//import Link from "next/link";
import { NavBarH } from "../components/Shared/NavbarH";
import NewRecipeForm from "../components/NewRecipe/NewRecipeForm";
import { Footer } from "../components/Shared/Footer";


const NewRecipePage = () => {
 return (
     <div>
       <NavBarH/>  
       <NewRecipeForm/>
       <Footer/>
     </div>
 );
};
export default NewRecipePage;
