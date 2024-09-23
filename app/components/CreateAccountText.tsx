import Image from "next/image";
import SignInImage from '../public/SignInImage.svg';
import RegistrationForm from "./RegistrationForm";
import RoundLogo from "../public/RoundLogo.svg";

export default function CreateAccountText() {
    return (
      <div className='flex h-screen bg-[#e5dece]'>
      <div className='w-1/2 h-full relative'>
          <Image 
            src={SignInImage} 
            alt="logo" 
            layout="fill" 
            objectFit="cover"
          />
      </div>

      <div className='w-1/2 flex flex-col justify-start items-center bg-[#e5dece]'>
        <div className='mt-[20px] mb-[14px]'>
          <Image 
            src={RoundLogo} 
            alt="Round Logo" 
            height={150}
            width={150}
          />
        </div>
        <span className="font-['Inter'] text-[40px] font-normal leading-100px] text-[#000] tracking-[-0.4px] text-center mb-[24px]">
          Create an Account
        </span>

        <RegistrationForm/>

      </div>
    </div>
    );
  }