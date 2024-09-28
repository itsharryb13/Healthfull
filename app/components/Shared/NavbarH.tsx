"use client";
import Image from "next/image";
import Logo from '../../public/Logo.svg';
import RoundLogo from '../../public/RoundLogo.svg';
import Link from  'next/link';
// import {Link} from "react-router-dom";



export function NavBarH(){
    return(
        <nav className='flex w-full h-[4vw] main-containerNav md:w-7vw md:h-1vw sm:w-57px sm:h-17px overflow-hidden'>
            
            <div className = 'w-[20%] h-[4vw] mx-auto absolute top-[.2vw] left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="w-[12vw]"/>
                </Link>
            </div>


            <div className='flex w-[90%] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[.8vw] right-0 '>
            <Link href="../../NewRecipePage">
                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[20%] z-[1] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[2]">
                        New Recipe
                    </span>
                </button>
                </Link>
                
                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[30%] z-[3] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[4]">
                         Macros
                    </span>
                </button>

                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[40%] z-[5] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[6]">
                        Planner
                    </span>
                </button>
                
                <Link href="../../MyAccount">
                  <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[50%] z-[5] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[6]">
                      My Account
                    </span>
                  </button>
                </Link>

                <Link href="../../AllRecipePage">
                  <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[10%] z-[7] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[8]">
                      All Recipes
                    </span>
                  </button>
                </Link>

                <div className='flex w-[20.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute overflow-hidden top-[16.22%] right-[12.67%]  z-[7]'>
                  <input className='w-[20.13%] h-[52.87%] shrink-0 bg-transparent border-none' />
                  <span className="h-[0.8vw] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[1vw] text-[#f5f5f5] relative text-center whitespace-nowrap">
                    Search
                  </span>
                </div>
                

                <button className='flex w-[10%] h-[100%] rounded-full absolute mx-auto my-0 absolute top-[16.22%] right-[.10%]'>
                  <div className='absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] shrink'>
                  <Image src={RoundLogo} alt="Logo" className="h-[3vw]"/>
                  </div>
                </button>
            </div>
        </nav>
    );
} 