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

  // State for daily calorie totals
  const [mondayCalories, setMondayCalories] = useState(0);
  const [tuesdayCalories, setTuesdayCalories] = useState(0);
  const [wednesdayCalories, setWednesdayCalories] = useState(0);
  const [thursdayCalories, setThursdayCalories] = useState(0);
  const [fridayCalories, setFridayCalories] = useState(0);
  const [saturdayCalories, setSaturdayCalories] = useState(0);
  const [sundayCalories, setSundayCalories] = useState(0);

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
            { key: "MondayMeals", setter: setMondayRecipes, calorieSetter: setMondayCalories },
            { key: "TuesdayMeals", setter: setTuesdayRecipes, calorieSetter: setTuesdayCalories },
            { key: "WednesdayMeals", setter: setWednesdayRecipes, calorieSetter: setWednesdayCalories },
            { key: "ThursdayMeals", setter: setThursdayRecipes, calorieSetter: setThursdayCalories },
            { key: "FridayMeals", setter: setFridayRecipes, calorieSetter: setFridayCalories },
            { key: "SaturdayMeals", setter: setSaturdayRecipes, calorieSetter: setSaturdayCalories },
            { key: "SundayMeals", setter: setSundayRecipes, calorieSetter: setSundayCalories },
          ];

          // Fetch each day's recipes and calculate calories
          for (const { key, setter, calorieSetter } of dayKeys) {
            const recipeIds: string[] = userData[key] || [];
            const fetchedRecipes: Recipe[] = [];
            let dayCalories = 0;

            for (const recipeId of recipeIds) {
              const recipeRef = doc(db, "recipes", recipeId);
              const recipeSnapshot = await getDoc(recipeRef);

              if (recipeSnapshot.exists()) {
                const recipeData = recipeSnapshot.data();
                const recipeCalories = recipeData.calories || 0;
                dayCalories += recipeCalories;

                fetchedRecipes.push({
                  id: recipeId,
                  recipeName: recipeData.recipeName,
                  recipeDescription: recipeData.recipeDescription,
                  imagePreview: recipeData.imagePreview,
                  calories: recipeCalories,
                });
              } else {
                console.error(`No recipe found with ID: ${recipeId}`);
              }
            }

            // Set recipes and calorie count for the day
            setter(fetchedRecipes);
            calorieSetter(dayCalories);
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

  const renderCarousel = (
    recipes: Recipe[], 
    emblaRef: EmblaViewportRefType, 
    dayName: string, 
    dayCalories: number
  ) => {
    if (recipes.length === 0) {
      return (
        <div className="carousel-container w-full h-48 mx-auto py-8 flex items-center justify-center relative drop-shadow bg-f5f5f5 rounded-lg text-center">
          <p className="text-lg text-gray-500">{`${dayName} is currently empty.`}</p>
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
        {[
          { day: "Monday", recipes: mondayRecipes, calories: mondayCalories, emblaRef: emblaRef1 },
          { day: "Tuesday", recipes: tuesdayRecipes, calories: tuesdayCalories, emblaRef: emblaRef2 },
          { day: "Wednesday", recipes: wednesdayRecipes, calories: wednesdayCalories, emblaRef: emblaRef3 },
          { day: "Thursday", recipes: thursdayRecipes, calories: thursdayCalories, emblaRef: emblaRef4 },
          { day: "Friday", recipes: fridayRecipes, calories: fridayCalories, emblaRef: emblaRef5 },
          { day: "Saturday", recipes: saturdayRecipes, calories: saturdayCalories, emblaRef: emblaRef6 },
          { day: "Sunday", recipes: sundayRecipes, calories: sundayCalories, emblaRef: emblaRef7 },
        ].map(({ day, recipes, calories, emblaRef }, index) => (
          <div key={index} className="mb-8 text-center">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">
                {day} {calories}/2000
              </h3>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add to Grocery List
              </button>
            </div>
            {renderCarousel(recipes, emblaRef, day, calories)}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
}

