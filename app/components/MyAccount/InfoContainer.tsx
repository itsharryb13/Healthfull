"use client";
import { RecipeCard } from "../Recipe Card/ReciepeCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";

interface Recipe {
  id: string;
}

interface selectedRecipe {
  id: string;
  recipeName: string;
  recipeDescription?: string;
  imagePreview?: string;
  tags?: string[];
}

export default function InfoContainer() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [recipes, setRecipes] = useState<Recipe[]>([]); // Array storing only recipe IDs
  const [selectedRecipes, setSelectedRecipes] = useState<selectedRecipe[]>([]); // Array storing full recipe info
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
          const savedRecipeIds: string[] = userData.SavedRecipe || [];

          // Ensure we have the recipe IDs
          const recipeIdObjects = savedRecipeIds.map((id) => ({ id }));
          setRecipes(recipeIdObjects); // Store recipe IDs

          // Fetch full recipe details using Promise.all
          const recipePromises = savedRecipeIds.map(async (recipeId) => {
            const recipeDocRef = doc(db, "recipes", recipeId);
            const recipeSnapshot = await getDoc(recipeDocRef);

            if (recipeSnapshot.exists()) {
              return {
                id: recipeId,
                recipeName: recipeSnapshot.data().name,
                recipeDescription: recipeSnapshot.data().description,
                imagePreview: recipeSnapshot.data().imagePreview,
              } as selectedRecipe;
            } else {
              console.error(`Recipe with ID ${recipeId} not found.`);
              return null; // Return null if not found, so we can filter out later
            }
          });

          // Wait for all promises to resolve
          const recipeResults = await Promise.all(recipePromises);
          const validRecipes = recipeResults.filter((recipe) => recipe !== null) as selectedRecipe[];

          // Update state with all the valid recipes
          setSelectedRecipes(validRecipes);
        } else {
          alert("No matching user document found.");
        }
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  return (
    <div className="flex flex-col w-auto h-[80vw] pt-[2vw] pr-[2vw] pl-[2vw] gap-x-[5%] mx-auto">
      <Tabs defaultValue="Saved" className="flex flex-col w-auto pt-[2%] pb-[2%] gap-y-[2%] mx-auto">
        <TabsList>
          <TabsTrigger value="Saved" className="text-lg w-[50%]">Saved Recipes</TabsTrigger>
          <TabsTrigger value="draft_create" className="text-lg w-[50%]">Draft/Created Recipes</TabsTrigger>
        </TabsList>

        {/* Saved Recipes Tab */}
        <TabsContent value="Saved">
          <div className="w-[85vw] h-[70vw] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10 overflow-y-scroll">
            {loading ? (
              <p>Loading saved recipes...</p>
            ) : (
              selectedRecipes.map((recipe) => (
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
          <div className="w-[85vw] h-[70vw] bg-[#e5dece] rounded-[21px] pt-[1vw] pb-[1vw] mx-auto recipe-cards grid grid-cols-3 gap-x-10 overflow-y-scroll">
            <h1>Recipe create</h1>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
