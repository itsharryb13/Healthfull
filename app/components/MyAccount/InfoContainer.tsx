"use client";
import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import Logo from "../../public/Logo.svg";

interface Recipe {
  id: string;
  recipeName: string;
  recipeDescription?: string;
  imagePreview?: string;
}
interface draftRecipe {
  id: string;
  recipeName: string;
  recipeDescription?: string;
  imagePreview?: string;
}

export default function InfoContainer() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Array storing full recipe details
  const [draftRecipes, setDraftRecipes] = useState<draftRecipe[]>([]); // Array storing full recipe details
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      if (!user) {
        alert("No user logged in, cannot retrieve saved recipes.");
        return;
      }
  
      try {
        // Fetch the user document first to get the saved recipe IDs
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          const savedRecipeIds: string[] = userData.SavedMeals || [];
          
          // Array to collect valid recipes
          const fetchedRecipes: Recipe[] = [];
  
          // Fetch full recipe details one by one
          for (const recipeId of savedRecipeIds) {
            const recipeRef = doc(db, "recipes", recipeId);
            const recipeSnapshot = await getDoc(recipeRef);
  
            if (recipeSnapshot.exists()) {
              const recipeData = recipeSnapshot.data();
              const newRecipe: Recipe = {
                id: recipeId,
                recipeName: recipeData.recipeName,
                recipeDescription: recipeData.recipeDescription,
                imagePreview: recipeData.imagePreview,
              };
  
              // Add the new recipe to the fetchedRecipes array
              fetchedRecipes.push(newRecipe);
            } else {
              console.error(`No recipe found with ID: ${recipeId}`);
            }
          }
  
          // Update the state with all valid recipes at once
          setRecipes(fetchedRecipes);
        } else {
          alert("No matching user document found.");
        }
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchDraftRecipes = async () => {
      if (!user) {
        alert("No user logged in, cannot retrieve saved recipes.");
        return;
      }
  
      try {
        // Fetch the user document first to get the saved recipe IDs
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);
  
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          const draftRecipeIds: string[] = userData.draftRecipes || [];
          
          // Array to collect valid recipes
          const fetchedDraftRecipes: draftRecipe[] = [];
  
          // Fetch full recipe details one by one
          for (const recipeId of draftRecipeIds) {
            const recipeRef = doc(db, "recipes", recipeId);
            const recipeSnapshot = await getDoc(recipeRef);
  
            if (recipeSnapshot.exists()) {
              const recipeData = recipeSnapshot.data();
              const newRecipe: draftRecipe = {
                id: recipeId,
                recipeName: recipeData.recipeName,
                recipeDescription: recipeData.recipeDescription,
                imagePreview: recipeData.imagePreview,
              };
  
              // Add the new recipe to the fetchedRecipes array
              fetchedDraftRecipes.push(newRecipe);
            } else {
              console.error(`No recipe found with ID: ${recipeId}`);
            }
          }
  
          // Update the state with all valid recipes at once
          setDraftRecipes(fetchedDraftRecipes);
        } else {
          alert("No matching user document found.");
        }
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDraftRecipes();
    fetchSavedRecipes();
  }, [user]);

  return (
    <div className="flex flex-col w-auto h-[80vw] pt-[2vw] pr-[2vw] pl-[2vw] gap-x-[5%] mx-auto">
      <Tabs defaultValue="Saved" className="flex flex-col w-auto pt-[2%] pb-[2%] gap-y-[2%] mx-auto">
        <TabsList>
          <TabsTrigger value="Saved" className="text-lg w-[50%]">Saved Recipes</TabsTrigger>
          <TabsTrigger value="draft_create" className="text-lg w-[50%]">Draft Recipes</TabsTrigger>
        </TabsList>

        {/* Saved Recipes Tab */}
        <TabsContent value="Saved">
          <div className="w-[85vw] h-[70vw] bg-container rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10 overflow-y-scroll">
            {loading ? (
              <p>Loading saved recipes...</p>
            ) : (
              recipes.map((recipe) => (
                <RecipeCard
                  ID={recipe.id}
                  name={recipe.recipeName}
                  description={recipe.recipeDescription}
                  imageUrl={recipe.imagePreview}
                />
              ))
            )}
          </div>
        </TabsContent>

        {/* Draft/Created Recipes Tab */}
        <TabsContent value="draft_create">
          <div className="w-[85vw] h-[70vw] bg-container rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10 overflow-y-scroll">
          {loading ? (
              <p>Loading saved recipes...</p>
            ) : (
              draftRecipes.map((recipe) => (
                <RecipeCard
                  ID={recipe.id}
                  name={recipe.recipeName}
                  description={recipe.recipeDescription}
                  imageUrl={recipe.imagePreview}
                />
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
{
  /*
    TODO: Need a seprate recipe for draft recipe which does not have the recipe save button or the savebutton feature get hidden on this page.
   */
}