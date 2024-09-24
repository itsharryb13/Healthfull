"use client";
import Image from "next/image";
import Logo from '../public/Logo.svg';
import Link from  'next/link';

export function RegistrationNavBar(){
    return(
        <nav className='flex w-full h-[4vw] main-containerNav relative mx-auto'>
        
        <div className = 'w-[14vw] h-[4vw] mx-auto absolute top-[.2vw] left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="w-[12vw]"/>
                </Link>
            </div>

        <div className='flex w-[15vw] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[1vw] right-[1.8vw]'>

        <button className='flex pt-[5px] pr-[5px] pb-[5px] pl-[5px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>
                
                <Link href="../SignIn">
                <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[15px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[6]">
                    Sign in
                </span>
                </Link>
            </button>
        </div>
    </nav>
    );

    }