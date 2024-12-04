"use client";

import { RecipeCard } from "../Recipe Card/ReciepeCard";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { collection, getDoc, getDocs, doc, query, where, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, storage, auth } from '../../../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";


// Interface that defines the structure of a Recipe object
interface Recipe {
  id: string;
  recipeName?: string;
  recipeDescription?: string;
  imagePreview?: string;
}

interface Ingredient {
  name: string;
  quantity: number;
  measurement: string;
  recipeID: string;
}

export default function InfoHomePage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 200 })]);

  const stopAutoplay = () => {
    if (emblaApi && emblaApi.plugins().autoplay) {
      emblaApi.plugins().autoplay.stop();
    }
  };

  const startAutoplay = () => {
    if (emblaApi && emblaApi.plugins().autoplay) {
      emblaApi.plugins().autoplay.reset();
    }
  };

  const auth = getAuth();
  const user = auth.currentUser;
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [groceryItem, setGroceryItem] = useState<Ingredient[]>([]);
  const [ingredient, setIngredient] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [quantity, setQuantity] = useState<number>(0);
  const [suggestedRecipe, setSuggestedRecipe] = useState<Recipe | null>(null);
  

  // Function to add an ingredient to the grocery list
  const handleAddIngredient = async () => {
    if (!ingredient || !measurement || quantity <= 0) {
      alert('Please fill out all ingredient fields.');
      return;
    }

    const newIngredient: Ingredient = {
      name: ingredient,
      quantity: quantity,
      measurement: measurement,
      recipeID:"Personal"
    };

    if (!user) {
      return;
    }

    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.log("No user found with the specified UID");
        return;
      }

      const userDocRef = userSnapshot.docs[0].ref;

      // Append new ingredient to the grocery list in Firestore using arrayUnion
      await updateDoc(userDocRef, {
        groceryList: arrayUnion(newIngredient)
      });

      // Update the local state
      setGroceryItem([...groceryItem, newIngredient]);

      // Reset the input fields after adding the ingredient
      setIngredient('');
      setMeasurement('');
      setQuantity(0);
    } catch (error) {
      console.log("Error adding ingredient:", error);
    }
  };

  // Function to remove an ingredient locally
  const handleRemoveIngredient =  async (index: number) => {
    console.log(groceryItem[index]);
    if (!user) {
      return;
    }

    try {
      const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
      const userSnapshot = await getDocs(userQuery);

      if (userSnapshot.empty) {
        console.log("No user found with the specified UID");
        return;
      }

      const userDocRef = userSnapshot.docs[0].ref;

      // Append new ingredient to the grocery list in Firestore using arrayUnion
      await updateDoc(userDocRef, {
        groceryList: arrayRemove(groceryItem[index])
      });

      // Update the local state
      setGroceryItem(groceryItem.filter((_, i) => i !== index));
    } catch (error) {
      console.log("Error adding ingredient:", error);
    }
  };

  useEffect(() => {
    const handleGroceryList = async () => {
      if (!user) {
        return;
      }

      try {
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);

        if (userSnapshot.empty) {
          console.log("No user found with the specified UID");
          return;
        }

        const userData = userSnapshot.docs[0].data();

        // Ensure that userData.groceryList is an array and each item is an object
        if (!Array.isArray(userData.groceryList)) {
          console.log("Grocery list is not available or is not an array");
          return;
        }

        // Map over the array and extract the fields
        const existingGroceryItems: Ingredient[] = userData.groceryList.map((doc: any) => ({
          name: doc.name,
          quantity: doc.quantity,
          measurement: doc.measurement,
          recipeID:doc.recipeID
        }));

        setGroceryItem(existingGroceryItems);
      } catch (error) {
        console.log("Error fetching the grocery ingredients:", error);
      }
    };

    const fetchData = async () => {
      try {
        const recipeQuery = query(collection(db, "recipes"),where("status", "==" , "published") )
        const querySnapshot = await getDocs(recipeQuery);
        const data: Recipe[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];

        const updatedData = await Promise.all(
          data.map(async (recipe) => {
            if (recipe.imagePreview) {
              try {
                const imageRef = ref(storage, recipe.imagePreview);
                const imageURL = await getDownloadURL(imageRef);
                return { ...recipe, imagePreview: imageURL };
              } catch (error) {
                console.error(`Error getting URL for ${recipe.imagePreview}:`, error);
                return recipe;
              }
            }
            return recipe;
          })
        );

        setItems(updatedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to Load Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    handleGroceryList();
  }, [user]);

  const handleSuggestedRecipeButton = async () => {
    if (!user) return;

    try {
      const recipeQuery = query(collection(db, "recipes"), where("status", "==", "published"));
      const querySnapshot = await getDocs(recipeQuery);

      const recipes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Recipe[];
      const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
      setSuggestedRecipe(randomRecipe);
    } catch (error) {
      console.error("Error suggesting recipe:", error);
      setError("Failed to suggest a recipe.");
    }
  };


  return (
    <div className="bg-background min-h-screen">
    <div className="flex flex-row w-auto h-[70vw] p-[2vw] gap-x-[2vw]">
      {/* Left Column: Carousel Section for Trending and Suggested Recipes */}
      <div className="flex flex-col gap-y-10 w-[70%] h-full">
        {/* Trending Recipes Section */}
        <div className="flex flex-col w-full h-[48%] bg-container rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[2vw] text-foreground z-[1] pb-[3%]">Trending Recipes</span>    
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 8000 })]} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <CarouselPrevious className="text-gray-300 hover:text-gray-400"/>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard ID={item.id} name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="text-gray-300 hover:text-gray-400"/>
          </Carousel>
        </div>

        {/* Suggested Recipes Section */}
        <div className="flex flex-col w-full h-[48%] bg-container rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[2vw] text-foreground z-[1] pb-[3%]">Recipes for You</span>
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 8000 })]} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <CarouselPrevious className="text-gray-300 hover:text-gray-400"/>
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard ID={item.id} name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="text-gray-300 hover:text-gray-400"/>
          </Carousel>
        </div>
      </div>

      {/* Right Column: Grocery List Section */}
      <div className="w-[30%] col-span-1 flex flex-col h-full space-y-10">
        <div className="bg-container p-6 rounded-lg flex-1 overflow-hidden overflow-y-scroll">
        <div className="mb-4"> 
         <span className="text-[2vw] text-foreground">Grocery List</span>
         </div>
          <div className="flex flex-col space-y-4">
            <input className="flex-1 p-[0.5vw] bg-input border border-custom rounded" placeholder="Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
            <input type="number" className="flex-1 p-[0.5vw] bg-input border border-custom rounded" placeholder="Quantity"  value={quantity || ''} onChange={(e) => setQuantity(e.target.valueAsNumber)} min="0" />
            <select className="flex-1 p-2 bg-input border border-custom rounded" value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
              <option value="--">Please select from here</option>
              <option value="kg">Kilograms</option>
              <option value="count">Count</option>
              <option value="cup">Cups</option>
              <option value="g">Grams</option>
              <option value="lb">Pounds</option>
              <option value="gl">Gallons</option>
              <option value="l">Liters</option>
              <option value="ml">Mililiters</option>
              <option value="oz">Ounces</option>
              <option value="tsp">Teaspoon</option>
            </select>

            <button type="button" onClick={handleAddIngredient} className="p-[0.2vw] bg-button text-button rounded">Add</button>
          </div>

          <div className="mt-4 ">
            {groceryItem.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="bg-card p-2 rounded">{ingredient.name} ({ingredient.quantity} {ingredient.measurement})</span>
                <button type="button" onClick={() => handleRemoveIngredient(index)} className="text-red-500">&times;</button>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-container p-6 rounded-lg flex-1 overflow-y-auto h-[40%] w-[100%]">
              <button type="button" onClick= {handleSuggestedRecipeButton} className="w-full p-[0.5vw] bg-button text-button rounded" > Suggest a Recipe</button>
              {suggestedRecipe && (
            <div className="mt-4 p-4 bg-container rounded ">
              <RecipeCard ID={suggestedRecipe.id} name={suggestedRecipe.recipeName} description={suggestedRecipe.recipeDescription} imageUrl={suggestedRecipe.imagePreview} />
            </div>
          )}
        </div>
      </div>
    </div>
    </div>  
  );
}
/*
  TODO: add special query for the feature list and suggested for you recipes.
 */