"use client";
import { NavBarH } from "../components/Shared/NavbarH";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { RecipeCard } from "../components/Recipe Card/ReciepeCard";
import { collection, getDocs } from "firebase/firestore"; // Firestore methods
import { db, storage } from "../../firebaseConfig"; // Firebase Firestore instance
import { ref, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { useEffect, useState } from "react";

// Interface for Recipe
interface Recipe {
  id: string;
  recipeName?: string;
  recipeDescription?: string;
  imagePreview?: string;
}

export default function Planner() {
  const [items, setItems] = useState<Recipe[]>([]); // State for the fetched recipe items
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Days of the week
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  // Fetch data from Firestore and Firebase Storage
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipes")); // Change "recipes" to your collection name
        const data: Recipe[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];

        const updatedData = await Promise.all(
          data.map(async (recipe) => {
            if (recipe.imagePreview) {
              try {
                const imageRef = ref(storage, recipe.imagePreview);
                const imageURL = await getDownloadURL(imageRef); // Convert image path to URL
                return { ...recipe, imagePreview: imageURL }; // Add the image URL to the recipe object
              } catch (error) {
                console.error(`Error getting URL for ${recipe.imagePreview}:`, error);
                return recipe;
              }
            }
            return recipe;
          })
        );

        setItems(updatedData); // Update items state with the fetched recipes
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load recipes");
      } finally {
        setLoading(false); // Set loading to false once done
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Helper to render each carousel with exactly 3 items and no scroll behavior
  const renderStaticCarousel = () => (
    <div className="carousel-container w-full h-[60%] mx-auto pt-[5%] pb-[5%] pr-[2%] pl-[2%] gap-[5%] items-start relative drop-shadow">
      <Carousel className="w-[90%] h-full relative">
        <CarouselContent className="flex justify-center">
          {items.slice(0, 3).map((item) => (
            <CarouselItem
              key={item.id}
              className="basis-[30%] flex-shrink-0 mx-4"
              style={{ minWidth: "30%" }} // Ensures only 3 items are shown
            >
              <RecipeCard
                ID={item.id}
                name={item.recipeName}
                description={item.recipeDescription}
                imageUrl={item.imagePreview}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );

  return (
    <>
      <NavBarH />
      <div className="meal-plan">
        <h2 className="text-2xl font-bold text-center my-8">Meal Planner</h2>

        {/* Render each carousel with a corresponding day label */}
        {days.map((day, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-center mb-4">{day}</h3>
            {renderStaticCarousel()}
          </div>
        ))}
      </div>
    </>
  );
}