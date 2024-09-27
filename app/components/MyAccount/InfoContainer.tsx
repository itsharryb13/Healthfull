import { RecipeCard } from "../Recipe Card/ReciepeCard";

export default function InfoContainer(){
    return(
        <div className='flex flex-row w-auto h-[80vw] pt-[2vw] pr-[2vw]  pl-[2vw] gap-x-[5%]  mx-auto'>

            {/* need to add the profile picture box which has capabilty to update the profile picture using dropdown picture */}

            <div className='flex flex-col w-[30%] h-[70%] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] relative pr-[2%] pl-[2%] overflow-hidden'>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[50%]'>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Saved Recipes
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[55%] '>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Recipe Drafts
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[60%] '>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Settings
                    </span>
                </button>
                <button className='flex w-full h-[8%] justify-center items-center flex-nowrap bg-[#1e1e1e] rounded-[8px] border-solid border border-[#2c2c2c] relative top-[65%]'>
                    <span className=" shrink-0 basis-auto font-['Inter'] text-[2vw] font-semibold  text-[#f5f5f5] relative text-left whitespace-nowrap z-[5]">
                        Logout.
                    </span>
                </button>
            </div>

            <div className="flex flex-col w-[70%] h-[95%] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw]">
                <RecipeCard/>

            </div>
        </div>
    );
}