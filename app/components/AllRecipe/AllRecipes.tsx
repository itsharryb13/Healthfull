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
 const [searchQuery, setSearchQuery] = useState('');
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

 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setSearchQuery(event.target.value);
 };

 const filteredRecipes = recipes.filter(recipe => {
   const matchesFilters = filters.length === 0 || filters.every(filter => recipe.tags?.includes(filter));
   const matchesSearch = recipe.recipeName?.toLowerCase().includes(searchQuery.toLowerCase());
   return matchesFilters && matchesSearch;
 });

 return (
   <div className="flex flex-col items-center w-full h-[70vw] pb-[2%] overflow-hidden">
     {/* Main Container */}
     <div className="flex flex-row gap-6 w-full bg-background rounded-lg mt-8 h-[98%] px-[2%] py-[2%]">
      
       {/* Filters Section */}
       <div className="filters w-[12%] bg-container p-6 rounded-lg shadow-md">
         <h2 className="text-2xl text-foreground mb-4">Filters</h2>
         <div className="flex flex-col space-y-2">
           {filterOptions.map(option => (
             <label key={option} className="flex items-center space-x-2">
               <input
                 type="checkbox"
                 checked={filters.includes(option)}
                 onChange={() => handleFilterChange(option)}
                 className="w-4 h-4"
               />
               <span className="text-lg text-foreground">{option}</span>
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
       <div className="recipes w-[88%] bg-container p-6 rounded-lg max-h-full shadow-md overflow-y-scroll">
         <div className="flex justify-between items-center mb-6">
           <h2 className="text-3xl text-foreground">All Recipes</h2>
           <input
             type="text"
             placeholder="Search for recipes"
             value={searchQuery}
             onChange={handleSearchChange}
             className="px-4 py-2 border rounded w-1/3"
           />
         </div>

         <div className="recipe-cards grid grid-cols-3 gap-10">
           {loading ? (
             <p>Loading recipes...</p>
           ) : filteredRecipes.length > 0 ? (
             filteredRecipes.map((recipe) => (
               <RecipeCard
                 key={recipe.id}
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