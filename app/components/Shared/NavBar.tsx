
import Image from "next/image";
import Logo from '../../public/Logo.svg';
import Link from  'next/link';



export function NavBar(){
    return(
        <nav className='flex w-full h-[4vw] main-containerNav relative mx-auto overflow-hidden'>
            
            <div className = 'w-[20%] h-[90%] mx-auto absolute left-0 overflow-hidden'>
                <Link href="/">
                <Image src={Logo} alt="Logo" className='w-[70%]  object-scale-down'/>
                </Link>
            </div>


            <div className='flex w-[40%] h-[90%] gap-x-5 items-center flex-nowrap absolute right-[2%]'>
                <Link href="../SignIn"  className="flex h-[95%] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#FFFFFF] rounded-lg border-solid border border-[#FFFFFF] relative overflow-hidden z-[5] pointer drop-shadow">
                    <button className="h-full shrink-0 basis-auto font-['Inter'] text-lg font-normal leading-lg text-[#303030] relative text-left whitespace-nowrap">
                                Sign In
                    </button>
                </Link>    
                <Link href="../Registration" className='flex h-[96%] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-[#2c2c2c] rounded-lg border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>
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