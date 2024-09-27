import banner from '../../public/banner.svg';
import Image from 'next/image';

export function Banner(){
    return(

        <div className='main-container w-full h-full text-[0px] relative mx-auto my-0 pt-[5vw]'>
            <span className="flex w-[40vw] h-auto justify-left items-start font-['Inter'] text-[6vw] font-bold leading-[1.1] text-[#000] tracking-[-0.3vw] relative text-center whitespace-nowrap z-[2] pt-[2vw] ml-[2vw]">
                Healthful.
            </span>
            <span className="flex w-[60vw] h-auto justify-left items-start font-['Inter'] text-[2vw] font-normal leading-[1.25] text-[#000] relative text-left z-[2] ml-[2vw] pt-[2vw]">
                The right choice makes all the 
                <br /> 
                difference <br />
            </span>
            <div className='w-full h-full opacity-90 absolute top-0 left-0'>
                <Image src={banner} alt="logo" />
            </div>
        </div>
    

    );
}