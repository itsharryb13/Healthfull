
"use client";
import Image from "next/image";
import Logo from '../public/Logo.svg';
import Link from  'next/link';

export default function SignInNavBar() {
  return (
    <div className='main-container w-[1687px] h-[92px] relative mx-auto my-0'>
      <div className = 'w-full h-full absolute top-5 left-0'>
                <Link href="/">
                <Image src={Logo} alt="Logo" />
                </Link>
        </div>
     
      <div className='flex w-[264px] h-[65px] gap-[16px] items-center flex-nowrap absolute top-[14px] left-[1373px] z-[2]'>
        <button className='flex pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[3] pointer'>
          <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[4]">
            Register
          </span>
        </button>
      </div>
    </div>
  );
}