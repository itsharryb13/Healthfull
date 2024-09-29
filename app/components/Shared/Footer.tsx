import Image from "next/image";
import RoundLogo from "../../public/RoundLogo.svg";

export function Footer(){
    return(
    <div className='main-container flex flex-row w-full h-[20%] pt-[2%] pb-[2%] pr-[2%] pl-[2%] gap-x-5 items-start flex-wrap bg-[#e5dece] border-solid border-b border-b-[#d9d9d9] relative overflow-hidden mx-auto my-0'>
       
        <div className='flex w-[40%] flex-col gap-y-10 items-start self-stretch shrink-0'>

            < div className='shrink-0 relative '>
                <span className="flex h-full justify-start items-center font-['Inter'] text-lg font-semibold leading-xl text-[#1e1e1e] absolute left-0 text-left whitespace-nowrap">
                    About Us
                </span>
            </div>
        
            <div className='shrink-0 relative z-[14]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-lg font-semibold leading-xl text-[#1e1e1e] absolute left-0 text-left whitespace-nowrap">
                    Our Story
                </span>
            </div>
            <div className='shrink-0 relative z-[16]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-lg font-semibold leading-xl text-[#1e1e1e] absolute left-0 text-left whitespace-nowrap">
                    Benefits
                </span>
            </div>
            <div className=' shrink-0 relative z-[18]'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-lg font-semibold leading-xl text-[#1e1e1e] absolute left-0 text-left whitespace-nowrap">
                    Team
                </span>
            </div>

            <div className='shrink-0 relative z-20'>
                <span className="flex h-full justify-start items-center font-['Inter'] text-lg font-semibold leading-xl text-[#1e1e1e] absolute left-0 text-left whitespace-nowrap">
                    Contact Us
                </span>
            </div>
        </div>

        <div className='flex w-[20%] h-[80%] absolute right-[0.5%] pb-[1%]'>
            <Image src={RoundLogo} alt="round-Logo"/>
        </div>
    </div>
    );
    {/* TODO: Add links to the pages listed with const for user auticated bollean*/}
}