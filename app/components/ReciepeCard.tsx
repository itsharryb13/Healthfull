import Image from "next/image";
import Dish1 from '../public/Dish1.svg'

export function ReciepeCard(){
    return(<>
     <div className='main-container flex w-[10vw] h-[15vw] pt-[1vw] pr-[16px] pb-[16px] pl-[16px] flex-col gap-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] relative mx-auto my-0'>
        <div className='flex h-[10vw] flex-col justify-center items-center self-stretch shrink-0 flex-nowrap bg-contain bg-no-repeat relative overflow-hidden'>
            <Image src={Dish1} alt="dish 1" />
        </div>
        <div className='flex w-[208px] flex-col gap-[8px] items-start shrink-0 flex-nowrap relative z-[1]'>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[2]'>
                <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[3]">
                    Poulet au Vinaigre
                </span>
            </div>
            <div className='flex items-start self-stretch shrink-0 flex-nowrap relative z-[4]'>
                <span className="flex w-[211px] h-[44px] justify-start items-start shrink-0 font-['Inter'] text-[16px] font-normal leading-[22.4px] text-[#757575] relative text-left z-[5]">
                    Irresistible chicken, cooked <br />
                    with vinegar
                </span>
            </div>
      </div>
    </div>
    </>);
}