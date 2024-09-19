"use client";
import Image from "next/image";
import Logo from '../public/Logo.svg';
import Link from  'next/link';
// import {Link} from "react-router-dom";



export function NavBar(){
    return(
        <nav className='flex w-full h-[8vw] main-containerNav relative mx-auto '>
            
            <div className = 'w-full h-full absolute top-5 left-0'>
                <Link href="/">
                <Image src={Logo} alt="Logo" />
                </Link>
            </div>


            <div className='flex w-[264px] h-[65px] gap-x-5 items-center flex-nowrap absolute top-5 right-10 '>

                <div className='flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap rounded-[8px] relative overflow-hidden z-[3]'>
                    <button className="flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer">
                        <Link href="../SignIn">
                            <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[6]">
                                Sign In
                            </span>
                        </Link>
                    </button>    
                </div>

                <button className='flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>
                    
                    <Link href="../Registration">
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[6]">
                        Register
                    </span>
                    </Link>
                </button>
            </div>
        </nav>
    );
} 