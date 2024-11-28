import Image from "next/image";
import SignInImage from '../../../public/SignInImage.svg';
import RegistrationForm from "./RegistrationForm";
import RoundLogo from "../../../public/RoundLogo.svg";

export default function CreateAccountText() {
  return (
    <div className="h-screen bg-container">
      <div className="flex h-full">
        {/* Left Section */}
        <div className="w-1/2 h-full relative">
          <Image
            src={SignInImage}
            alt="logo"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-1/2 flex flex-col justify-start items-center bg-container h-full">
          {/* Move elements down */}
          <div className="mt-[50px] mb-[14px]">
            <Image
              src={RoundLogo}
              alt="Round Logo"
              height={140}
              width={140}
            />
          </div>
          <span className="font-['Inter'] text-[40px] font-normal leading-[60px] text-foreground tracking-[-0.4px] text-center mb-[20px] mt-[20px]">
            Create an Account
          </span>
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}