"use client";
import Image from "next/image";
import Logo from '../public/Logo.svg';
import Link from  'next/link';

export function RegistrationNavBar(){
    return(
        <nav className='flex w-full h-[4.0vw] main-containerNav relative mx-auto '>

            <div className = 'w-full h-full absolute top-2 left-0'>
                <Link href="/">
                <Image src={Logo} alt="Logo" />
                </Link>
            </div>

            <div className='flex w-[160px] h-[50px] gap-x-5 items-center flex-nowrap absolute top-4 right-10 '>

                <button className='flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>

                    <Link href="../SignIn">
                    <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[6]">
                        Sign in
                    </span>
                    </Link>
                </button>
            </div>
        </nav>
    );

    }