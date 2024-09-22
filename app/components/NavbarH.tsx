"use client";
import Image from "next/image";
import Logo from '../public/Logo.svg';
import Link from  'next/link';
// import {Link} from "react-router-dom";



export function NavBarH(){
    return(
        <nav className='flex w-full h-[4vw] main-containerNav md:w-7vw md:h-1vw sm:w-57px sm:h-17px overflow-hidden shadow-md'>
            
            <div className = 'w-[20%] h-[4vw] mx-auto absolute top-[.2vw] left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="w-[12vw]"/>
                </Link>
            </div>


            <div className='flex w-[80%] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[.8vw] right-[1.8vw]'>

                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[30.53%] z-[1] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[2]">
                        New Recipe
                    </span>
                </button>
                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[41.91%] z-[3] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[4]">
                         Macros
                    </span>
                </button>

                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[53.76%] z-[5] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[6]">
                        Planner
                    </span>
                </button>

                <button className='flex w-[9.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#f5f5f5]  rounded-[8px] border-none absolute top-[16.22%] left-[18.67%] z-[7] pointer'>
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[8]">
                        All Recipes
                    </span>
                </button>

                <div className='flex w-[20.13%] h-[52.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] items-center self-stretch shrink-0 flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute overflow-hidden top-[16.22%] right-[10.67%]  z-[7]'>
                  <input className='w-[20.13%] h-[52.87%] shrink-0 bg-transparent border-none' />
                  <span className="h-[0.8vw] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[1vw] text-[#f5f5f5] relative text-center whitespace-nowrap">
                    Search
                  </span>
                </div>

                <button className='flex w-[9.13%] h-[50.87%] pt-[1vw] pr-[1vw] pb-[1vw] pl-[1vw] gap-[2vw] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[16.22%] right-[.67%] overflow-hidden z-10 pointer'>
                  <span className="h-[0.8vw] shrink-0 basis-auto font-['Inter'] text-[1.2vw] font-semibold leading-[1vw] text-[#f5f5f5] relative text-left whitespace-nowrap z-[11]">
                    My Account
                  </span>
                </button>
            </div>
        </nav>
    );
} 

/*
 <div className='main-container w-[1687px] h-[88.901px] relative mx-auto my-0'>
      <div className='w-full h-full bg-[#fff] absolute top-0 left-0' />
      <div className='w-[13.52%] h-[75.68%] bg-cover bg-no-repeat absolute top-[11.71%] left-[0.53%] z-[9]' />
      <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[30.53%] z-[1] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[2]">
          New Recipe
        </span>
      </button>
      <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[41.91%] z-[3] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[4]">
          Macros
        </span>
      </button>
      <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[53.76%] z-[5] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[6]">
          Planner
        </span>
      </button>
      <button className='flex w-[9.13%] h-[52.87%] pt-[8px] pr-[8px] pb-[8px] pl-[8px] gap-[8px] justify-center items-center flex-nowrap bg-[#f5f5f5] rounded-[8px] border-none absolute top-[16.22%] left-[18.67%] z-[7] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[8]">
          All Recipes
        </span>
      </button>
      <button className='flex w-[154px] h-[47px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[18px] left-[1500px] overflow-hidden z-10 pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[11]">
          My Account
        </span>
      </button>
    </div>
    */