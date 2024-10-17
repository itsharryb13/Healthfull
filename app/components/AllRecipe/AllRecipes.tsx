"use client";


import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { RecipeCard } from '../Recipe Card/ReciepeCard';


interface Recipe {
 id?: string;
 recipeName?: string;
 recipeDescription?: string;
 imagePreview?: string;
 tags?: string[];
}


export default function AllRecipes() {
 const [recipes, setRecipes] = useState<Recipe[]>([]);
 const [loading, setLoading] = useState(true);
 const [filters, setFilters] = useState<string[]>([]);
 const filterOptions = ["Dairy-Free", "Gluten-Free", "Vegan", "Breakfast", "Lunch", "Dinner"];


 useEffect(() => {
   const fetchPublishedRecipes = async () => {
     try {
       const recipesRef = collection(db, "recipes");
       const q = query(recipesRef, where("status", "==", "published"));
       const querySnapshot = await getDocs(q);
       const recipesData: Recipe[] = querySnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       })) as Recipe[];
       setRecipes(recipesData);
     } catch (error) {
       console.error("Error fetching recipes: ", error);
     } finally {
       setLoading(false);
     }
   };


   fetchPublishedRecipes();
 }, []);


 const handleFilterChange = (filter: string) => {
   if (filters.includes(filter)) {
     setFilters(filters.filter(f => f !== filter));
   } else {
     setFilters([...filters, filter]);
   }
 };


 const filteredRecipes = filters.length === 0
   ? recipes
   : recipes.filter(recipe => filters.every(filter => recipe.tags?.includes(filter)));


 return (
   <div className="flex flex-col items-center w-full h-[70vw] pb-[2%] overflow-hidden">
     {/* Main Container */}
     <div className="flex flex-row gap-6 w-full bg-[#e5dece] rounded-lg mt-8 h-[98%] px-[2%] py-[2%]">
      
       {/* Filters Section */}
       <div className="filters w-[12%] bg-[#f5f5f5] p-6 rounded-lg shadow-md">
         <h2 className="text-2xl font-semibold mb-4">Filters</h2>
         <div className="flex flex-col space-y-2">
           {filterOptions.map(option => (
             <label key={option} className="flex items-center space-x-2">
               <input
                 type="checkbox"
                 checked={filters.includes(option)}
                 onChange={() => handleFilterChange(option)}
                 className="w-4 h-4"
               />
               <span className="text-lg">{option}</span>
             </label>
           ))}
         </div>
         <button
           onClick={() => setFilters([])}
           className="mt-6 px-4 py-2 bg-black text-white rounded"
         >
           Clear Filter
         </button>
       </div>


       {/* Recipes Section */}
       <div className="recipes w-[88%] bg-[#fdf9f3] p-6 rounded-lg max-h-full shadow-md overflow-y-scroll">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-3xl font-semibold">All Recipes</h2>
           <input
             type="text"
             placeholder="Search for recipes"
             className="px-4 py-2 border rounded w-1/3"
           />
         </div>


         <div className="recipe-cards grid grid-cols-3 gap-10">
           {loading ? (
             <p>Loading recipes...</p>
           ) : filteredRecipes.length > 0 ? (
             filteredRecipes.map((recipe) => (
               <RecipeCard
                 ID={recipe.id}
                 name={recipe.recipeName}
                 imageUrl={recipe.imagePreview}
                 description={recipe.recipeDescription}
               />
             ))
           ) : (
             <p>No recipes found matching the filters.</p>
           )}
         </div>
       </div>
     </div>
   </div>
 );
}
{/* TODO: make the search bar works in the nav bar and all recipe section 
  TODO: Save button on the recipe card does not work on this page*/}