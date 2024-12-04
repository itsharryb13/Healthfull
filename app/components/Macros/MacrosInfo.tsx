"use client";

import { useEffect, useState } from "react";
import { getDoc, doc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/firebaseConfig";
import DietPlanner from "./DietPlanner";

interface NutritionData {
  title: string;
  current: number;
  goal: number;
  percentage: number;
  color: string;
}

interface Recipe {
  recipeName: string;
  nutritionData?: Record<string, string>;
}

interface UserMeals {
  MondayMeals?: string[];
  TuesdayMeals?: string[];
  WednesdayMeals?: string[];
  ThursdayMeals?: string[];
  FridayMeals?: string[];
  SaturdayMeals?: string[];
  SundayMeals?: string[];
}

const defaultGoalData = {
  calories: 2300,
  protein: 100,
  fat: 76,
  carbohydrates: 301,
  fiber: 30,
};

function NutritionCard({ title, percentage, current, goal, color }: NutritionData) {
  return (
    <div className="bg-card rounded-lg shadow-md p-6 w-72 flex flex-col justify-between space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-gray-500">{`${current} / ${goal}`}</p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 relative">
        <div
          className={`absolute top-0 left-0 h-3 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-right text-sm font-medium text-foreground">
        {percentage}%
      </div>
    </div>
  );
}

export default function MacrosInfo() {
  const [nutritionData, setNutritionData] = useState<NutritionData[]>([]);
  const [selectedDay, setSelectedDay] = useState<string>("Monday");
  const [goalData, setGoalData] = useState(defaultGoalData);
  const [editingGoals, setEditingGoals] = useState(false);
  const [userDetails, setUserDetails] = useState<{
    height: { feet: number | null; inches: number | null };
    weight: { value: number | null; unit: string | null };
    age: number | null;
    healthConditions: string[] | null;
  }>({
    height: { feet: null, inches: null },
    weight: { value: null, unit: null },
    age: null,
    healthConditions: null,
  });

  const calculateAge = (birthday: string): number => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const fetchGoals = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        if (userData.goals) {
          setGoalData(userData.goals);
        }

        setUserDetails({
          height: {
            feet: userData.height?.feet || null,
            inches: userData.height?.inches || null,
          },
          weight: {
            value: userData.weight?.value || null,
            unit: userData.weight?.unit || null,
          },
          age: userData.birthday ? calculateAge(userData.birthday) : null,
          healthConditions: userData.healthConditions || null,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchDailyMacros = async (day: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("No user document found for the authenticated user.");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data() as UserMeals;

      const mealIds = userData[`${day}Meals` as keyof UserMeals] || [];
      if (mealIds.length === 0) {
        setNutritionData([]);
        return;
      }

      const recipePromises = mealIds.map((id) => getDoc(doc(db, "recipes", id)));
      const recipeDocs = await Promise.all(recipePromises);

      const aggregatedNutrition = recipeDocs.reduce((totals, recipeDoc) => {
        if (recipeDoc.exists()) {
          const recipeData = recipeDoc.data() as Recipe;
          if (recipeData.nutritionData) {
            Object.entries(recipeData.nutritionData).forEach(([key, value]) => {
              const numericValue = parseFloat(value.toString().replace(/[^\d.-]/g, ""));
              totals[key.toLowerCase()] =
                (totals[key.toLowerCase()] || 0) + numericValue;
            });
          }
        }
        return totals;
      }, {} as Record<string, number>);

      const formattedData = Object.entries(aggregatedNutrition).map(([key, value]) => ({
        title: key.charAt(0).toUpperCase() + key.slice(1),
        current: value,
        goal: goalData[key as keyof typeof goalData] || 100,
        percentage: Math.min(
          Math.round((value / (goalData[key as keyof typeof goalData] || 100)) * 100),
          100
        ),
        color:
          key === "calories"
            ? "bg-blue-500"
            : key === "protein"
            ? "bg-red-500"
            : key === "fat"
            ? "bg-yellow-500"
            : key === "carbohydrates"
            ? "bg-green-500"
            : key === "fiber"
            ? "bg-purple-500"
            : "bg-gray-500",
      }));

      setNutritionData(formattedData);
    } catch (error) {
      console.error("Error fetching daily macros:", error);
    }
  };

  const handleGoalChange = (key: string, value: number) => {
    setGoalData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const saveGoals = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        console.error("User not authenticated");
        return;
      }

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userDocRef = doc(db, "users", userDoc.id);

        await updateDoc(userDocRef, { goals: goalData });
        console.log("Goals updated successfully.");
      }
    } catch (error) {
      console.error("Error saving goals:", error);
    }

    setEditingGoals(false);
    fetchDailyMacros(selectedDay);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    fetchDailyMacros(selectedDay);
  }, [selectedDay, goalData]);

  const handleDietPlanner = async () => {
    try {
      const recommendations = await DietPlanner(userDetails);
      if (recommendations) {
        console.log("Recommended Dietary Intake:", recommendations);

        setGoalData({
          calories: recommendations.calories,
          protein: recommendations.protein,
          fat: recommendations.fat,
          carbohydrates: recommendations.carbohydrates,
          fiber: recommendations.fiber,
        });
      } else {
        console.error("Failed to generate dietary recommendations.");
      }
    } catch (error) {
      console.error("Error in DietPlanner:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-background p-8">
      <div className="text-center mb-6">
        <h2 className="text-4xl font-extrabold text-foreground mb-2">Macros</h2>
        <p className="text-lg text-foreground">
          Select a day to see your detailed nutrition breakdown or edit your goals.
        </p>
      </div>
      <div className="bg-container p-8 rounded-lg shadow-lg w-full max-w-6xl relative">
        <div className="absolute top-4 right-4">
          <select
            className="p-3 border border-custom rounded-md bg-input shadow-sm text-foreground"
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
          >
            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <button
          className="bg-button text-white px-4 py-2 rounded hover:bg-button-hover-bg transition-colors mb-4"
          onClick={() => setEditingGoals((prev) => !prev)}
        >
          {editingGoals ? "Cancel Editing" : "Edit Goals"}
        </button>
        {editingGoals ? (
          <div className="mt-6 gap-x-30">
            <h3 className="text-lg font-bold text-foreground mb-4">Edit Your Goals</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(goalData).map((key) => (
                <div key={key} className="flex items-center space-x-4">
                  <label className="text-sm text-foreground w-32">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type="number"
                    value={goalData[key as keyof typeof goalData]}
                    onChange={(e) =>
                      handleGoalChange(key, parseInt(e.target.value, 10))
                    }
                    className="p-2 border border-custom rounded-md bg-input text-foreground"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-row gap-[2vw] ">
            <button
              className="mt-4 bg-green-800 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
              onClick={saveGoals}
            >
              Save Goals
            </button>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              onClick={handleDietPlanner}
            >
              Get Diet Recommendations
            </button>
            </div>
            </div>
        ) : (
          <>
            {nutritionData.length === 0 ? (
              <p className="text-gray-600 text-center">
                No nutrition data available for {selectedDay}.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
                {nutritionData.map((item, index) => (
                  <NutritionCard
                    key={index}
                    title={item.title}
                    percentage={item.percentage}
                    current={item.current}
                    goal={item.goal}
                    color={item.color}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
