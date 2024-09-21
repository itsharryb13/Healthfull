import Image from "next/image";
import Dish1 from '../public/Dish1.svg'

export function RecipeCard(){
    return(<>
     <div className='main-container flex w-[19vw] h-[25vw] pt-[2vw] pr-[16px] pb-[16px] pl-[2vw] flex-col gap-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
        <div className='flex w-full h-[10vw] flex-col justify-center items-center self-stretch flex-nowrap bg-contain bg-no-repeat relative overflow-hidden'>
            <Image src={Dish1} alt="dish 1" />
        </div>
        <div className='flex w-[20vw] flex-col gap-[2vw] items-start shrink-0 flex-nowrap relative z-[1]'>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                <span className="h-[2vw] grow shrink-0 basis-auto font-['Inter'] text-[1.6vw] font-normal leading-[2vw] text-[#1e1e1e] relative text-left whitespace-nowrap z-[3] pt-[1vw]">
                    Breakfast Tacos
                </span>
            </div>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <span className="flex w-[16vw] h-[4vw] justify-start items-start shrink-0 font-['Inter'] text-[1.3] font-normal leading-[22.4px] text-[#757575] relative text-left z-[5] pt-[1vw]">
                Filled with eggs, pico de gallo,
              <br />
              and avocados - flavorful and <br />
              easy to make!
                </span>
            </div>
      </div>
    </div>
    </>);
}