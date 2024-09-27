import Image from "next/image";
import Dish1 from '../../public/Dish1.svg'

export function RecipeCard(){ 
    // the text is overflowing out of the container
    return(<>
     <div className='main-container flex w-[25%] h-[30%] pt-[1%] pr-[.5%] pb-[1%] pl-[.5%] flex-col items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto gap-y-5% overflow-hidden '>
        <div className='flex w-full h-[50%] flex-col justify-center items-center self-stretch flex-nowrap relative overflow-hidden'>
            <Image src={Dish1} alt="dish 1" />
        </div>
        <div className="flex w-full h-[40%] flex-col items-start shrink-0 flex-nowrap relative z-[1]">
            <div className="flex items-start self-stretch shrink-0 flex-nowrap relative z-[2]">
            <span className="h-[60%] grow shrink-0 basis-auto font-['Inter'] text-[1.4vw] font-normal leading-[2vw] text-[#1e1e1e] relative text-left whitespace-normal z-[3] pt-[1vw]">
      Breakfast Tacos
    </span>
  </div>
  <div className="flex items-start self-stretch shrink-0 flex-nowrap relative z-[4]">
    <span className="flex h-[30%] text-center shrink-0 font-['Inter'] text-[1vw] font-normal text-[#757575] break-words whitespace-normal">
      Filled with eggs, pico de gallo, and avocados - flavorful and easy to make!
    </span>
  </div>
</div>

    </div>
    </>);
}