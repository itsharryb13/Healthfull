"use client";
import Image from "next/image";
import Logo from '../../../public/Logo.svg';
import Link from  'next/link';
import MoonIcon from "../../../public/moon.svg";
import SunIcon from "../../../public/sun.svg";
import RoundLogo from "../../../public/RoundLogo.svg"
import { useState, useEffect } from "react";


export function RegistrationNavBar(){
    const [theme, setTheme] = useState<string>("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "light";
        setTheme(savedTheme);
        document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark", newTheme === "dark");
        localStorage.setItem("theme", newTheme);}
    return(
        <nav className='flex w-full h-[4vw] main-containerNav relative mx-auto'>
        
        <div className = 'w-[14vw] h-[4vw] mx-auto absolute top-[.2vw] left-3 overflow-hidden'>
                <Link href="/">
                <Image src={RoundLogo} alt="RoundLogo" className="w-11 h-12 object-contain"/>
                </Link>
            </div>

             
        <div className='flex w-[15vw] h-[2vw] gap-x-5 items-center flex-nowrap absolute top-[1vw] right-[1.8vw]'>
             {/* Dark Mode Toggle */}
             <button
                    onClick={toggleTheme}
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                    <Image
                        src={theme === "dark" ? SunIcon : MoonIcon}
                        alt="Toggle Theme"
                        className="w-6 h-6"
                    />
                </button>
            <Link href="../SignIn" className='flex pt-[5px] pr-[5px] pb-[5px] pl-[5px] gap-[8px] justify-center items-center grow shrink-0 basis-0 flex-nowrap bg-button rounded-[8px] border-solid border border-[#2c2c2c] relative overflow-hidden z-[5] pointer'>
                <button className="h-full shrink-0 basis-auto font-['Inter'] lg:text-lg font-normal leading-lg text-[#f5f5f5] relative text-center whitespace-nowrap z-[6]">
                    <span >
                        Sign-In
                    </span>
                </button>
            </Link>
            
        </div>
    </nav>
    );

    }