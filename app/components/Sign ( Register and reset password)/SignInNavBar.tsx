
"use client";
import Image from "next/image";
import Logo from '../../public/Logo.svg';
import Link from  'next/link';

export default function SignInNavBar() {
  return(
    <nav className='flex w-full h-[4vw] main-containerNav relative mx-auto'>
        
        <div className = 'w-[14vw] h-[4vw] mx-auto absolute top-[.2vw] left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="w-[12vw]"/>
                </Link>
            </div>

        <div className='flex w-[15vw] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[1vw] right-[1.8vw]'>

            <Link href="../Registration" className='flex h-[95%] justify-center items-right grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-lg border-solid border border-[#2c2c2c] relative overflow-hidden'>
                <button className="h-full shrink-0 basis-auto font-['Inter'] lg:text-lg font-normal leading-lg text-[#f5f5f5] relative text-center whitespace-nowrap z-[6]">
                    <span >
                        Register
                    </span>
                </button>
            </Link>
        </div>
    </nav>
);
  
}