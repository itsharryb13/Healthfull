import { RecipeCard } from "../Recipe Card/ReciepeCard";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react';
import { EmblaPluginType } from 'embla-carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useEffect, useState, useCallback } from "react";
import { collection, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { db, storage } from '../../../firebaseConfig'; // Firebase Firestore instance
import {ref, getDownloadURL } from "firebase/storage"; // Firebase Storage methods

// Props interface for the InformationSection component
interface RecipeListProps {
  collectionName: string; // Name of the Firestore collection to retrieve data from
}

// Interface representing a recipe object
interface Recipe {
  id: string;           // Unique identifier for each recipe
  recipeName?: string;        // Optional name field for the recipe
  recipeDescription?: string; // Optional description field for the recipe
  imagePreview?: string;     // Optional picture field (initially a Firebase storage path, later a full URL)
}

// Main component that displays a list of recipes in a carousel
export function InformationSection({ collectionName }: RecipeListProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({delay: 200})]); // Carousel setup with autoplay

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


  const [items, setItems] = useState<Recipe[]>([]); // State to hold the recipe data
  const [loading, setLoading] = useState<boolean>(true); // Loading state for data fetching
  const [error, setError] = useState<string | null>(null); // Error state for data fetching

  // Fetch data from Firestore and Firebase Storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch documents from Firestore collection
        const recipesRef = collection(db, "recipes");
        const q = query(recipesRef, where("status", "==", "published"));
        const querySnapshot = await getDocs(q);
        const data: Recipe[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];

        // Map over the data and fetch the download URL for each image reference
        const updatedData = await Promise.all(
            data.map(async (recipe) => {
              if (recipe.imagePreview) {
                try {
                  console.log(recipe.imagePreview);
                    const imageRef = ref(storage, recipe.imagePreview);
                    const imageURL = await getDownloadURL(imageRef);  // Convert URL
                    return { ...recipe, Picture: imageURL };
                  } catch (error) {
                    console.error(`Error getting URL for ${recipe.imagePreview}: `, error);
                    return recipe;  // Return recipe without changing Picture if URL fails
                  }
              }
              return recipe; // Return the recipe if no picture is found
            })
          );

        setItems(updatedData); // Update the items state with recipes and their images
      } catch (error) {
        console.error("Error fetching data: ", error); // Log the error to console
        setError("Failed to Load Data"); // Set error message in state
      } finally {
        setLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchData(); // Call fetchData on component mount
  }, [collectionName]); // Re-run when collectionName changes

  // Loading state rendering
  if (loading) {
    return (
      <>
        <div className="information-container flex flex-col w-full h-[60%] mx-auto pt-[5%] pb-[2%] pr-[2%] pl-[2%] gap-[5%] items-start shrink-0 flex-nowrap relative drop-shadow">
          <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] leading-xl text-[#1e1e1e] relative text-center whitespace-nowrap z-[1] justify-left  pt-[5%] pb-[2%]">
            Loading...
          </span>
        </div>
      </>
    );
  }

  // Error state rendering
  if (error) {
    return (
      <>
        <div className="information-container flex flex-col w-full h-[60%] mx-auto pt-[5%] pb-[2%] pr-[2%] pl-[2%] gap-[5%] items-start shrink-0 flex-nowrap relative drop-shadow">
          <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] leading-xl text-[#1e1e1e] relative text-center whitespace-nowrap z-[1] justify-left pb-[2%]">
            {error}
          </span>
        </div>
      </>
    );
  }

  // Main rendering of the carousel with recipe cards
  return (
    <>
      <div className="information-container flex flex-col w-full h-[60%] mx-auto pt-[5%] pb-[5%] pr-[2%] pl-[2%] gap-[5%] items-start relative drop-shadow ">
        <span className="self-stretch shrink-0 basis-auto font-['Inter'] text-[2vw] leading-xl text-foreground relative text-center whitespace-nowrap z-[1] justify-left pt-[5%] pb-[2%]">
          Get Access to Thousands of Recipes
        </span>

        <Carousel  className="w-[90%] h-full relative mr-[5%] ml-[5%] pt-[2%]" plugins={[Autoplay({ delay: 8000})]} onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay}>
          <CarouselPrevious   className="bg-button text-button-text border border-custom rounded-full p-2 shadow-md hover:bg-button-hover-bg transition-transform transform hover:scale-110"/>
          <CarouselContent>
            {/* Map through the items (recipes) and render each one in the carousel */}
            {items.map((item) => (
              <CarouselItem className="basis-1/3" key={item.id}>
                <RecipeCard ID={item.id} name={item.recipeName} description={item.recipeDescription} imageUrl={item.imagePreview} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="bg-button text-button-text border border-custom rounded-full p-2 shadow-md hover:bg-button-hover-bg transition-transform transform hover:scale-110"/>
        </Carousel>
      </div>
    </>
  );
}

{/* TODO: Do a stop carousel autoplay when mouse enter the carousel.
  
  
  */}