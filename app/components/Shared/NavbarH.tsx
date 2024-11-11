"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Logo from "../../public/Logo.svg";
import RoundLogo from "../../public/RoundLogo.svg";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import router from "next/router";

interface Recipe {
  id: string;
  recipeName: string;
  recipeDescription?: string;
  imagePreview?: string;
  ingredientsList?: string[]; // Array of ingredients
}

export function NavBarH() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);

  // Fetch all published recipes on component mount
  useEffect(() => {
    const fetchPublishedRecipes = async () => {
      try {
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("status", "==", "published"));
        const querySnapshot = await getDocs(q);
        const fetchedRecipes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];
        setRecipes(fetchedRecipes);
      } catch (error) {
        console.error("Error fetching published recipes:", error);
      }
    };

    fetchPublishedRecipes();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value) {
      const lowerCaseValue = value.toLowerCase();
      const filteredResults = recipes.filter(
        (recipe) =>
          recipe.recipeName.toLowerCase().includes(lowerCaseValue) ||
          recipe.ingredientsList?.some(
            (ingredient) =>
              typeof ingredient === "string" &&
              ingredient.toLowerCase().includes(lowerCaseValue)
          )
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]); // Clear results when input is empty
    }
  };

  const handleClickSetting = () => {
    window.location.href = "../../additionalInfo";
  };

  const handleSignOut = () => {
    signOut(auth);
    window.location.href = "/";
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
        <button className="btn-nav hover:underline">Macros</button>
        <Link href="../../Planner">
          <button className="btn-nav hover:underline">Planner</button>
        </Link>
        <Link href="../../MyAccount">
          <button className="btn-nav hover:underline">My Account</button>
        </Link>

        {/* Search Bar */}
        <div className="relative flex items-center w-[20vw] max-w-[30vw] h-[2.5vw] bg-white border border-gray-300 rounded-full px-4 shadow-sm">
          <input
            type="text"
            className="w-full bg-transparent text-gray-700 placeholder-gray-400 text-sm md:text-base focus:outline-none"
            placeholder="Search recipes or ingredients"
            value={searchInput}
            onChange={handleSearch}
          />

          {/* Display search results */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-2 bg-white border border-gray-300 rounded-md w-full max-h-60 overflow-y-auto z-50 shadow-lg">
              {searchResults.map((recipe) => (
                <Link href={`../../recipes/${recipe.id}`} key={recipe.id}>
                  <div className="p-3 hover:bg-gray-100 cursor-pointer">
                    <p className="font-semibold text-gray-800">
                      {recipe.recipeName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {recipe.recipeDescription}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Image
              src={RoundLogo}
              alt="Round Logo"
              className="flex justify-center items-center w-[3vw] h-[3vw] rounded-full"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="hover:underline"
              onClick={handleClickSetting}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:underline"
              onClick={handleSignOut}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}


{/* TODO: change the picture based on the profile picture of the user */}
{/* TODO: make the logot and settings button in dropdown menu working */}
{/* TODO: make the search bar query the database for the recipe or ingedients */}
