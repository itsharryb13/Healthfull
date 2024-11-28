"use client";
import { useEffect, useState } from "react";
import { NavBarH } from "../components/Shared/NavbarH";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { RecipeCard } from "../components/Recipe Card/ReciepeCard";
import { Footer } from "../components/Shared/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { EmblaViewportRefType } from 'embla-carousel-react';

// Interface for Recipe with calories
interface Recipe {
  id: string;
  recipeName?: string;
  recipeDescription?: string;
  imagePreview?: string;
  calories?: number;
}

export default function Planner() {
  // Setup seven independent carousels
  const emblaRefs = Array(7).fill(null).map(() => useEmblaCarousel({ loop: true })[0]);
  
  const [dayRecipes, setDayRecipes] = useState<Recipe[][]>(Array(7).fill([]));
  const [dayCalories, setDayCalories] = useState<number[]>(Array(7).fill(0));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDayRecipes = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("No user logged in, cannot retrieve saved recipes.");
        setLoading(false);
        return;
      }

      try {
        const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
        const userSnapshot = await getDocs(userQuery);

        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();

          const days = [
            "MondayMeals",
            "TuesdayMeals",
            "WednesdayMeals",
            "ThursdayMeals",
            "FridayMeals",
            "SaturdayMeals",
            "SundayMeals",
          ];

          const fetchedRecipes = [];
          const caloriesCount = [];

          for (const day of days) {
            const recipeIds: string[] = userData[day] || [];
            const recipes: Recipe[] = [];
            let dayCalories = 0;

            for (const recipeId of recipeIds) {
              const recipeRef = doc(db, "recipes", recipeId);
              const recipeSnapshot = await getDoc(recipeRef);

              if (recipeSnapshot.exists()) {
                const recipeData = recipeSnapshot.data();
                dayCalories += recipeData.calories || 0;

                recipes.push({
                  id: recipeId,
                  recipeName: recipeData.recipeName,
                  recipeDescription: recipeData.recipeDescription,
                  imagePreview: recipeData.imagePreview,
                  calories: recipeData.calories || 0,
                });
              }
            }

            fetchedRecipes.push(recipes);
            caloriesCount.push(dayCalories);
          }

          setDayRecipes(fetchedRecipes);
          setDayCalories(caloriesCount);
        } else {
          console.error("No matching user document found.");
        }
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDayRecipes();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading recipes...</p>
      </div>
    );
  }

  const renderCarousel = (
    recipes: Recipe[], 
    emblaRef: EmblaViewportRefType, 
    dayName: string, 
    dayCalories: number
  ) => {
    if (recipes.length === 0) {
      return (
        <div className="carousel-container w-full h-48 mx-auto py-8 flex items-center justify-center relative rounded-lg text-center shadow-md">
        <p className="text-lg text-gray-500 ">{`${dayName} is currently empty.`}</p>
        </div>
      );
    }
  
    return (
      <div className="carousel-container w-[90%] mx-auto py-6 relative bg-container shadow-md rounded-lg">
      <div className="embla" ref={emblaRef}></div>
        <div className="embla" ref={emblaRef}>
          <Carousel>
            <CarouselPrevious className="bg-button text-button-text border border-custom rounded-full p-2 shadow-md hover:bg-button-hover-bg transition-transform transform hover:scale-110"/>
            <CarouselContent>
              {recipes.map((item) => (
                <CarouselItem key={item.id} className="flex-shrink-0 px-4">
                  <RecipeCard
                    ID={item.id}
                    name={item.recipeName}
                    description={item.recipeDescription}
                    imageUrl={item.imagePreview}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="bg-button text-button-text border border-custom rounded-full p-2 shadow-md hover:bg-button-hover-bg transition-transform transform hover:scale-110"/>
          </Carousel>
        </div>
        </div>
    );
  };

  return (
    <>
      <NavBarH />
      <div className="scroll-container w-full h-screen py-6 px-4 bg-background overflow-y-auto">
  <div className="text-center mb-10">
    <h1 className="text-4xl font-extrabold text-foreground">
      Your Weekly Meal Planner
    </h1>
    <p className="text-gray-500 mt-3 text-lg ">
      Plan your meals for the week and track your calorie goals!
    </p>
  </div>

  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
    (day, index) => (
      <div
        key={index}
        className="mb-12 px-4 py-6 bg-container shadow-lg rounded-lg transition-transform transform hover:scale-105"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            {day}
            <span className="text-sm text-gray-500 ml-2">
              ({dayCalories[index]}/2000 Calories)
            </span>
          </h2>
          <button className="bg-button text-white px-4 py-2 rounded hover-bg-button transition-colors">
            Add to Grocery List
          </button>
        </div>
        {renderCarousel(dayRecipes[index], emblaRefs[index], day, dayCalories[index])}
      </div>
    )
  )}
</div>
      <Footer />
    </>
  );
}