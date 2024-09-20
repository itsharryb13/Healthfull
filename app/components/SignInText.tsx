import Image from "next/image";
import SignInImage from '../public/SignInImage.svg';
export default function SignInText() {
  return (
    <div className='main-container flex w-[225px] h-[104px] flex-col gap-[4px] justify-center items-center flex-nowrap relative mx-auto my-0'>
      <span className="flex w-[225px] h-[50px] justify-center items-start shrink-0 basis-auto font-['Inter'] text-[40px] font-normal leading-[50px] text-[#000] tracking-[-0.4px] relative text-center whitespace-nowrap">
        Sign in
      </span>
      <div className='w-full h-full opacity-70 absolute top-0 left-0'>
     <Image src={SignInImage} alt="logo" />
     </div>
    </div>
    
  );
}