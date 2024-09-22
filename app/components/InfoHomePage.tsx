import { RecipeCard } from "./ReciepeCard";
import { RecipeCard2 } from "./RecipeCard2";
import { RecipeCard3 } from "./RecipeCard3";

export default function InfoHomePage() {
    return (
        <div className='flex flex-row w-auto h-[80vw] pt-[2vw] pr-[2vw] pb-[2vw] pl-[2vw] gap-x-[2vw]'>
            {/* Left column with Trending List and Suggested List */}
            <div className='flex flex-col gap-y-10 w-[70%]'>
                <div className='flex w-full h-[40%] bg-[#e5dece] rounded-[21px] pt-[2vw] pb-[2vw]'>
                    <RecipeCard/>
                    <RecipeCard3/>
                    <RecipeCard2/>
                    
                </div>
                <div className='flex w-full h-[40%] bg-[#e5dece] rounded-[21px] pt-[2vw] pb-[2vw]'>
                    <RecipeCard/>
                    <RecipeCard3/>
                    <RecipeCard2/>
                </div>
            </div>
            
            {/* Right column with Grocery list */}
            <div className='flex w-[30%] h-[83%] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] '>
                <h1>Grocery list</h1>
            </div>
        </div>
    );
}
