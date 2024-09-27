import Image from "next/image";
import Dish4 from '../../public/Dish4.svg'

export function RecipeCard4(){
    return(<>
     <div className='main-container flex w-[17vw] h-[23vw] pt-[1.5vw] pr-[13px] pb-[16px] pl-[2vw] flex-col gap-[14px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
        <div className='flex w-full h-[10vw] flex-col justify-center items-center self-stretch flex-nowrap bg-contain bg-no-repeat relative overflow-hidden'>
            <Image src={Dish4} alt="dish 1" />
        </div>
        <div className='flex w-[20vw] flex-col gap-[2vw] items-start shrink-0 flex-nowrap relative z-[1]'>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                <span className="h-[2vw] grow shrink-0 basis-auto font-['Inter'] text-[1.4vw] font-normal leading-[2vw] text-[#1e1e1e] relative text-left whitespace-nowrap z-[3] pt-[1vw]">
                    No Bake Cheesecake
                </span>
            </div>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <span className="flex w-[16vw] h-[4vw] justify-start items-start shrink-0 font-['Inter'] text-[1vw] font-normal leading-[20px] text-[#757575] relative text-left z-[5] pt-[1vw]">
                Made with homemade 
                <br />
                whipped cream and no oven   <br />
                - delicious and easy to make 
                </span>
            </div>
      </div>
    </div>
    </>);
}