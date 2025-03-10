import Image from "next/image";
import RoundLogo from "../../public/RoundLogo.svg";

export function Footer(){
    return(
    <div className='main-container flex w-full h-[15vw] pt-[3vw] pr-[3vw] pb-[8vw] pl-[4vw] gap-[6vw] items-start flex-wrap bg-container border-solid border-b border-b-[#d9d9d9] relative overflow-hidden mx-auto bottom-0'>
       
        <div className='flex w-auto  h-[90%] gap-[1vw] pb-[5%] pt[5%] flex-col items-start self-stretch shrink-0'>

            < div className='w-[89px] h-[22px] shrink-0 relative z-[14]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-[1.5vw] font-semibold leading-[22px] text-foreground absolute top-0 left-0 text-left whitespace-nowrap z-[15] hover:underline">
                    About Us
                </span>
            </div>
        
            <div className='w-[89px] h-[22px] shrink-0 relative z-[14]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-[1.5vw] font-semibold leading-[22px] text-foreground absolute top-0 left-0 text-left whitespace-nowrap hover:underline">
                    Our Story
                </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[16]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-[1.5vw] font-semibold leading-[22px] text-foreground absolute top-0 left-0 text-left whitespace-nowrap hover:underline">
                    Benefits
                </span>
            </div>
            <div className='w-[89px] h-[22px] shrink-0 relative z-[18]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-[1.5vw] font-semibold leading-[22px] text-foreground absolute top-0 left-0 text-left whitespace-nowrap hover:underline">
                    Team
                </span>
            </div>

            <div className='w-[89px] h-[22px] shrink-0 relative z-20'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-[1.5vw] font-semibold leading-[22px] text-foreground absolute top-0 left-0 text-left whitespace-nowrap hover:underline">
                    Contact Us
                </span>
            </div>
        </div>

        <div className='flex w-[20%] h-[90%] absolute right-[5%] mx-auto pb-[5%]'>
            <Image src={RoundLogo} alt="round-Logo"/>
        </div>
    </div>
    
    );
}