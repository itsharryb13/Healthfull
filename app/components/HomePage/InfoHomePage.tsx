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

  return (
    <div className="flex flex-row w-auto h-[70vw] p-[2vw] gap-x-[2vw]">
      {/* Left Column: Carousel Section for Trending and Suggested Recipes */}
      <div className="flex flex-col gap-y-10 w-[70%] h-full">
        {/* Trending Recipes Section */}
        <div className="flex flex-col w-full h-[50%] bg-[#e5dece] rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[2vw] text-[#000] z-[1] pb-[5%]">Trending Recipes</span>
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 8000 })]} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <CarouselPrevious />
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard ID={item.id} name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>

        {/* Suggested Recipes Section */}
        <div className="flex flex-col w-full h-[50%] bg-[#e5dece] rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[2vw] text-[#000] z-[1] pb-[5%]">Suggested for you</span>
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 8000 })]} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
            <CarouselPrevious />
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard ID={item.id} name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Right Column: Grocery List Section */}
      <div className="flex flex-col w-[30%] h-full bg-[#e5dece] rounded-[21px] p-[1vw]">
        <div className="flex flex-col gap-[1vw] p-[1vw]">
          <span className="text-[2vw] text-[#1d1b20]">Grocery List</span>
          <div className="flex flex-col gap-y-4">
            <input className="flex-1 p-[0.5vw] border rounded border-gray-400" placeholder="Ingredient" value={ingredient} onChange={(e) => setIngredient(e.target.value)} />
            <input type="number" className="flex-1 p-[0.5vw] border rounded border-gray-400" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)} min="1" step="1" />
            <select className="flex-1 p-2 border rounded border-gray-400" value={measurement} onChange={(e) => setMeasurement(e.target.value)}>
              <option value="--">Please select from here</option>
              <option value="kg">KG</option>
              <option value="count">Count</option>
              <option value="cup">Cup</option>
              <option value="g">Grams</option>
              <option value="lb">Pound</option>
              <option value="gl">Gallon</option>
              <option value="l">Liter</option>
              <option value="ml">ML</option>
              <option value="oz">OZ</option>
              <option value="tsp">Tea_Spoon</option>
            </select>

            <button type="button" onClick={handleAddIngredient} className="p-[0.2vw] bg-gray-800 text-white rounded">Add</button>
          </div>

          <div className="mt-4">
            {groceryItem.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="bg-gray-100 p-2 rounded">{ingredient.name} ({ingredient.quantity} {ingredient.measurement})</span>
                <button type="button" onClick={() => handleRemoveIngredient(index)} className="text-red-500">&times;</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
/*
  TODO: add special query for the feature list and suggested for you recipes.
 */