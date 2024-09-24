import Image from "next/image";
import SignInImage from '../public/SignInImage.svg';
import RoundLogo from "../public/RoundLogo.svg";
import ResetPwdForm from "./ResetPwdForm";

export default function ResetPwdText() {
  return (
    <div className='flex h-screen'>
    <div className='w-1/2 h-full relative'>
      <Image 
        src={SignInImage} 
        alt="logo" 
        layout="fill"  
        objectFit="cover" 
      />
    </div>
    <div className='w-1/2 flex flex-col justify-center items-center bg-[#e5dece]'>
    <div className='mb-[17px]'>
          <Image 
            src={RoundLogo} 
            alt="Round Logo" 
            height={150}
            width={150}
          />
        </div>
        <span className="font-['Inter'] text-[40px] font-normal leading-[50px] text-[#000] tracking-[-0.4px] text-center mb-[24px]">
          Reset your password
        </span>
        <ResetPwdForm />
      </div>
    </div>
   
  );
}