import { RecipeCard } from "./ReciepeCard";
import { RecipeCard2 } from "./RecipeCard2";
import { RecipeCard3 } from "./RecipeCard3";
import { RecipeCard4 } from "./RecipeCard4";

export function InformationSection(){
    return(
        <>
        <div className="information-cointainer flex h-[40vw] mx-auto pt-[1vw] pb-[30px] pr-[64px] pl-[65px] mt-[05vw] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative">
            <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-['Inter'] leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[1] justify-center pt-[20px] pb-[6vw] ml-[-30px]">
                Get Access to Thousands of Recipes
            </span>  
            <div className="flex flex-row gap-[60px]"> 
                <RecipeCard/>
                <RecipeCard2/>
                <RecipeCard3/>
                <RecipeCard4/>
            </div>
        </div>
         
        </>
    );


}