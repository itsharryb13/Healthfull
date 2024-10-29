"use client";
import { useEffect, useState } from "react";
import { NavBarH } from "../components/Shared/NavbarH";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { RecipeCard } from "../components/Recipe Card/ReciepeCard";
import { Footer } from "../components/Shared/Footer";
import useEmblaCarousel from "embla-carousel-react";
import { collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { getAuth } from "firebase/auth";

// Interface for Recipe
interface Recipe {
  id: string;
  recipeName?: string;
  recipeDescription?: string;
  imagePreview?: string;
}

export default function Planner() {
  // Setup seven independent carousels
  const [emblaRef1] = useEmblaCarousel({ loop: true });
  const [emblaRef2] = useEmblaCarousel({ loop: true });
  const [emblaRef3] = useEmblaCarousel({ loop: true });
  const [emblaRef4] = useEmblaCarousel({ loop: true });
  const [emblaRef5] = useEmblaCarousel({ loop: true });
  const [emblaRef6] = useEmblaCarousel({ loop: true });
  const [emblaRef7] = useEmblaCarousel({ loop: true });

  const [mondayRecipes, setMondayRecipes] = useState<Recipe[]>([]);
  const [tuesdayRecipes, setTuesdayRecipes] = useState<Recipe[]>([]);
  const [wednesdayRecipes, setWednesdayRecipes] = useState<Recipe[]>([]);
  const [thursdayRecipes, setThursdayRecipes] = useState<Recipe[]>([]);
  const [fridayRecipes, setFridayRecipes] = useState<Recipe[]>([]);
  const [saturdayRecipes, setSaturdayRecipes] = useState<Recipe[]>([]);
  const [sundayRecipes, setSundayRecipes] = useState<Recipe[]>([]);
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

          const dayKeys = [
            { key: "MondayMeals", setter: setMondayRecipes },
            { key: "TuesdayMeals", setter: setTuesdayRecipes },
            { key: "WednesdayMeals", setter: setWednesdayRecipes },
            { key: "ThursdayMeals", setter: setThursdayRecipes },
            { key: "FridayMeals", setter: setFridayRecipes },
            { key: "SaturdayMeals", setter: setSaturdayRecipes },
            { key: "SundayMeals", setter: setSundayRecipes },
          ];

          // Fetch each day's recipes from Firestore and set state
          for (const { key, setter } of dayKeys) {
            const recipeIds: string[] = userData[key] || [];
            const fetchedRecipes: Recipe[] = [];

            for (const recipeId of recipeIds) {
              const recipeRef = doc(db, "recipes", recipeId);
              const recipeSnapshot = await getDoc(recipeRef);

              if (recipeSnapshot.exists()) {
                const recipeData = recipeSnapshot.data();
                fetchedRecipes.push({
                  id: recipeId,
                  recipeName: recipeData.recipeName,
                  recipeDescription: recipeData.recipeDescription,
                  imagePreview: recipeData.imagePreview,
                });
              } else {
                console.error('No recipe found with ID: ${recipeId}');
              }
            }

            // Set the state for each day
            setter(fetchedRecipes);
          }

          // Fetch recipes for "EverydayForWeek" and add to each day's list
          const everydayRecipeIds: string[] = userData["EverydayForWeek"] || [];
          for (const recipeId of everydayRecipeIds) {
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

              // Add the recipe to each day's list, ensuring no duplicates
              setMondayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setTuesdayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setWednesdayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setThursdayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setFridayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setSaturdayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
              setSundayRecipes((prev) => prev.some((r) => r.id === recipeId) ? prev : [...prev, newRecipe]);
            } else {
              console.error('No recipe found with ID: ${recipeId}');
            }
          }
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

  const renderCarousel = (recipes: Recipe[], emblaRef, dayName: string) => {
    if (recipes.length === 0) {
      return (
        <div className="carousel-container w-full h-48 mx-auto py-8 flex items-center justify-center relative drop-shadow bg-f5f5f5 rounded-lg text-center">
          <p className="text-lg text-gray-500">{dayName} is currently empty.</p>
        </div>
      );
    }

    return (
      <div className="carousel-container w-[80%] h-auto mx-auto py-8 items-center justify-center relative drop-shadow bg-f5f5f5 rounded-lg">
        <div className="embla" ref={emblaRef}>
          <Carousel className="w-full h-full relative">
            <CarouselPrevious />
            <CarouselContent className="flex justify-center">
              {recipes.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="basis-[30%] flex-shrink-0 mx-4"
                  style={{ minWidth: "30%" }}
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
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBarH />
      <div className="scroll-container w-full h-screen mx-auto py-8 px-8 gap-8 items-start relative drop-shadow bg-[#ffffff] rounded-lg overflow-y-scroll max-h-screen">
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Monday</h3>
          {renderCarousel(mondayRecipes, emblaRef1, "Monday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Tuesday</h3>
          {renderCarousel(tuesdayRecipes, emblaRef2, "Tuesday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Wednesday</h3>
          {renderCarousel(wednesdayRecipes, emblaRef3, "Wednesday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Thursday</h3>
          {renderCarousel(thursdayRecipes, emblaRef4, "Thursday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Friday</h3>
          {renderCarousel(fridayRecipes, emblaRef5, "Friday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Saturday</h3>
          {renderCarousel(saturdayRecipes, emblaRef6, "Saturday")}
        </div>
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Sunday</h3>
          {renderCarousel(sundayRecipes, emblaRef7, "Sunday")}
        </div>
      </div>
      <Footer />
    </>
  );
}