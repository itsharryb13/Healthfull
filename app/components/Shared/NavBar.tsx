
import Image from "next/image";
import Logo from '../../public/Logo.svg';
import Link from  'next/link';



export function NavBar(){
    return(
        <nav className='flex w-full h-[4vw] main-containerNav relative mx-auto overflow-hidden'>
            
            <div className = 'w-[14vw] h-[4vw] mx-auto absolute top-[.2vw] left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className="w-[12vw]"/>
                </Link>
            </div>


            <div className='flex w-[15vw] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[1vw] right-[1.8vw]'>
                
                    <button className="flex justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#FFFFFF] rounded-[8px] border-solid border border-[#FFFFFF] relative overflow-hidden z-[5] pointer">
                        <Link href="../SignIn">
                            <span className="h-[1vw] shrink-0 basis-auto font-['Inter'] text-[1vw] font-normal leading-[16px] text-[#303030] relative text-left whitespace-nowrap">
                                Sign In
                            </span>
                        </Link>
                    </button>    

                <button className='flex justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>
                    <Link href="../Registration">
                    <span className="h-[1vw] shrink-0 basis-auto font-['Inter'] text-[1vw] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[6]">
                        Register
                    </span>
                    </Link>
                </button>
            </div>
        </nav>
    );
} 