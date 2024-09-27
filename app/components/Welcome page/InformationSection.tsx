import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { RecipeCard2 } from "../Recipe Card/RecipeCard2";
import { RecipeCard3 } from "../Recipe Card/RecipeCard3";
import { RecipeCard4 } from "../Recipe Card/RecipeCard4";

export function InformationSection(){
    return(
        <>
        <div className="information-cointainer flex h-[40vw] mx-auto pt-[1vw] pb-[3vw] pr-[5vw] pl-[5vw] mt-[05vw] flex-col gap-[2vw] items-start shrink-0 flex-nowrap relative">
            <span className="h-[5vw] self-stretch shrink-0 basis-auto font-['Inter'] text-[3vw] font-['Inter'] leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[1] justify-left pt-[1vw] pb-[6vw]">
                Get Access to Thousands of Recipes
            </span>  
            
            <div className="flex flex-row gap-[6vw]"> 
                <RecipeCard/>
                <RecipeCard2/>
                <RecipeCard3/>
                <RecipeCard4/>
            </div>
        </div>
         
        </>
    );


}