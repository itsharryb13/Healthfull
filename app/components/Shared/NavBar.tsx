"use client";
import Image from "next/image";
import Link from "next/link";
import SunIcon from "../../public/sun.svg";
import MoonIcon from "../../public/moon.svg";
import RoundLogo from "../../public/RoundLogo.svg";
import { useState, useEffect } from "react";

export function NavBar() {
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
        localStorage.setItem("theme", newTheme);
    };

    return (
        <nav className="flex items-center justify-between w-full h-12 px-6 py-4 bg-background text-foreground shadow-md">
            {/* Logo */}
            <Link href="/">
                <div className="flex items-center">
                    <Image
                        src={RoundLogo}
                        alt="Round Logo"
                        className="w-12 h-12 object-contain"
                    />
                </div>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
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

                {/* Sign-In & Register Buttons */}
                <Link
                    href="../SignIn"
                    className="px-4 py-2 bg-signin signintext rounded-lg border border-gray-500 hover-bg-button  transition"
                >
                    Sign In
                </Link>
                <Link
                    href="../Registration"
                    className="px-4 py-2 bg-button text-white rounded-lg border border-gray-700 hover-bg-button transition"
                >
                    Register
                </Link>
            </div>
        </nav>
    );
}
