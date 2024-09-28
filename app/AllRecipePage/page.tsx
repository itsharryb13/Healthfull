import { NavBarH } from "../components/Shared/NavbarH";
import AllRecipes from "../components/AllRecipe/AllRecipes";
import { Footer } from "../components/Shared/Footer";

const AllRecipePage  = () => {
    return (
        <div>
          <NavBarH/>  
          <AllRecipes/>
          <Footer/>
        </div>
    );
   };
   export default AllRecipePage;