import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { RecipeCard2 } from "../Recipe Card/RecipeCard2";
import { RecipeCard3 } from "../Recipe Card/RecipeCard3";
import { RecipeCard4 } from "../Recipe Card/RecipeCard4";

export function InformationSection(){
    return(
        <>
        <div className="information-cointainer flex flex-col w-full h-[50%] mx-auto pt-[5%] pb-[2%] pr-[2%] pl-[2%] gap-[5%] items-start shrink-0 flex-nowrap relative drop-shadow">
            <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] font-['Inter'] leading-xl text-[#1e1e1e] relative text-left whitespace-nowrap z-[1] justify-left pb-[2%]">
                Get Access to Thousands of Recipes
            </span>  
            
            <div className="flex flex-row"> 
                <RecipeCard/>
                <RecipeCard2/>
                <RecipeCard3/>
                <RecipeCard4/>
            </div>
        </div>
         
        </>
    );


}