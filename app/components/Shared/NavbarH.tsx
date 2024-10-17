"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image";
import Logo from '../../public/Logo.svg';
import RoundLogo from '../../public/RoundLogo.svg';
import Link from 'next/link';
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../../firebaseConfig";
import router from "next/router";

export function NavBarH() {


    const [showAdditional, setAdditional] = useState();

    const handleClickSetting = () => {
        window.location.href= "../../additionalInfo";
    };
    const handleSignOut = () => {
        signOut(auth);
        window.location.href= "/";
    };

    return (
        <nav className="flex w-full h-[4vw] items-center justify-between px-[2vw] md:px-[1vw]">
            
            {/* Logo Section */}
            <div className="flex w-[35%] md:w-[15%] h-full items-center">
                <Link href="../HomePage">
                    <Image src={Logo} alt="Logo" className="w-full max-w-[30vw]" />
                </Link>
            </div>

            {/* Menu Buttons */}
            <div className="flex gap-x-[6vw] md:gap-x-[4vw] md:text-2xl items-center">
                
                <Link href="../AllRecipesPage">
                    <button className="btn-nav hover:underline">All Recipes</button>
                </Link>

                <Link href="../../NewRecipePage">
                    <button className="btn-nav hover:underline">New Recipe</button>
                </Link>

<<<<<<< Updated upstream
                <Link href="../RecipePage">
                    <button className="btn-nav hover:underline">Macros</button>
                </Link>
=======
                

                <button className="btn-nav hover:underline">Macros</button>
>>>>>>> Stashed changes

                <Link href="../../Planner">
                <button className="btn-nav hover:underline">Planner</button>
                </Link>
               

                <Link href="../../MyAccount">
                    <button className="btn-nav hover:underline">My Account</button>
                </Link>

                {/* Search Bar */}
                <div className="flex items-center w-[15vw] max-w-[25vw] h-[3vw] md:h-[2vw] bg-white border border-gray-300 rounded-lg px-3">
                    <input
                        type="text"
                        className="w-full bg-transparent border-none text-sm focus:outline-none"
                        placeholder="Recipes/Ingredients Search"
                    />
                </div>

                {/* Profile Icon */}

                <DropdownMenu>
                  <DropdownMenuTrigger><Image src={RoundLogo} alt="Round Logo" className="flex justify-center items-center w-[3vw] h-[3vw] rounded-full" /></DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="hover:underline" onClick={handleClickSetting}>Settings</DropdownMenuItem>
                    <DropdownMenuItem className="hover:underline" onClick={handleSignOut}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
}
{/* TODO: change the picture based on the profile picture of the user */}
{/* TODO: make the logot and settings button in dropdown menu working */}
{/* TODO: make the search bar query the database for the recipe or ingedients */}
