"use client";

import { RecipeCard } from "../Recipe Card/ReciepeCard";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from '../../../firebaseConfig';
import { ref, getDownloadURL } from "firebase/storage";

// Interface representing a recipe object
interface Recipe {
  id?: string;
  recipeName?: string;
  recipeDescription?: string;
  imagePreview?: string;
}

export default function InfoHomePage() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()]);
  const [items, setItems] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [ingredient, setIngredient] = useState('');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);
  const [measurement, setMeasurement] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleAddIngredient = () => {
    if (!ingredient || !measurement || !quantity) {
      alert('Please fill out all ingredient fields.');
      return;
    }
    const newIngredient = `${ingredient} (${quantity} ${measurement})`;
    setIngredientsList([...ingredientsList, newIngredient]);
    setIngredient('');
    setMeasurement('');
    setQuantity('');
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredientsList(ingredientsList.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes"));
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
                return { ...recipe, Picture: imageURL };
              } catch (error) {
                console.error(`Error getting URL for ${recipe.imagePreview}: `, error);
                return recipe;
              }
            }
            return recipe;
          })
        );

        setItems(updatedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError("Failed to Load Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, ['recipes']);

  return (
    <div className="flex flex-row w-auto h-[70vw] p-[2vw] gap-x-[2vw]">
      <div className="flex flex-col gap-y-10 w-[70%] h-full">
        {/* Trending Recipes Section */}
        <div className="flex flex-col w-full h-[50%] bg-[#e5dece] rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[32px] text-[#000] z-[1] pb-[5%]">
            Trending Recipes
          </span>
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselPrevious />
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>

        {/* Suggested Recipes Section */}
        <div className="flex flex-col w-full h-[50%] bg-[#e5dece] rounded-[21px] p-[2vw] relative">
          <span className="ml-[28px] font-['Inter'] text-[32px] text-[#000] z-[1] pb-[5%]">
            Suggested for you
          </span>
          <Carousel className="w-[90%] h-full mx-[5%] pt-[2%]" plugins={[Autoplay({ delay: 2000 })]}>
            <CarouselPrevious />
            <CarouselContent>
              {items.map((item) => (
                <CarouselItem className="basis-1/2" key={item.id}>
                  <RecipeCard name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Right column with Grocery list */}
      <div className="flex flex-col w-[30%] h-full bg-[#e5dece] rounded-[21px] p-[1vw]">
        <div className="flex flex-col gap-[16px] p-[24px]">
          <span className="text-[24px] text-[#1d1b20]">Grocery List</span>
          <span className="text-[14px] text-[#49454f]">Add and remove items</span>
          <div className="flex flex-col gap-y-4">
            <input
              className="flex-1 p-2 border rounded border-gray-400"
              placeholder="Ingredient"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            <input
              type="number"
              className="flex-1 p-2 border rounded border-gray-400"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              step="1"
            />
            <select
              className='flex-1 p-2 border rounded border-gray-400'
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            >
              <option value="--">Please select from here</option>
              <option value="kg">KG</option>
              <option value="g">Grams</option>
              <option value="lb">Pound</option>
              <option value="gl">Gallon</option>
              <option value="l">Liter</option>
              <option value="ml">ML</option>
              <option value="oz">OZ</option>
              <option value="tsp">Tea_Spoon</option>
              </select>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="p-2 bg-gray-800 text-white rounded"
            >
              Add
            </button>
          </div>
          <div className="mt-4">
            {ingredientsList.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2 mb-2">
                <span className="bg-gray-100 p-2 rounded">{ingredient}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveIngredient(index)}
                  className="text-red-500"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

{/* TODO: make grocery pane load the stuff stored on the database and let person add the grocery items to it*/}