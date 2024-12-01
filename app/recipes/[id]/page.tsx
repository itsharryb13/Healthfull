"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc,arrayUnion, addDoc, collection, where, query, getDocs, onSnapshot, Timestamp, DocumentData, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { getAuth, User,onAuthStateChanged } from "firebase/auth";
import { NavBarH } from "@/app/components/Shared/NavbarH";
import { Footer } from "@/app/components/Shared/Footer";
import { RecipeCard } from "@/app/components/Recipe Card/ReciepeCard";
import Link from "next/link";
import NewRecipeForm from "@/app/components/NewRecipe/NewRecipeForm";
import AlertSystem from "../AlertSystem";
import jsPDF from "jspdf";
interface Recipe {
  recipeName: string;
  recipeDescription: string;
  hours: number;
  minutes: number;
  likes: number;
  portionSize: number;
  ingredientsList: Ingredients[];
  instructions: string[];
  difficulty: string;
  tags: string[];
  imageUrl: string;
  ID: string;
  imagePreview: string;
  status: "draft" | "published";
}

interface Comment {
  id: string;
  user: string;
  userUid: string; 
  text: string;
  timestamp: Timestamp;
}

interface Ingredients{
  name: string;
  quantity: number;
  measurement: string;
}

interface Ingredient{
  name: string;
  quantity: number;
  measurement: string;
  recipeID?:string;
}

interface IngredientMacros{
  name: string;
  quantity: number;
  measurement: string;
  calories: string;
  fat:string;
  sodium:string; 
  fiber:string;
}


export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [adjustedIngredients, setAdjustedIngredients] = useState<Ingredients[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [portionSize, setPortionSize] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [draftRecipeData, setDraftRecipeData] = useState<Recipe | null>(null);
  const [nutritionFacts, setNutritionFacts] = useState<string | null>(null);
  const [groceryItem, setGroceryItem] = useState<Ingredient[]>([]);
  const [ingredientAddStatus, setIngredientAddStatus] = useState <boolean>(true);
  const [allergies, setAllergies] = useState<string[] | null> (null);
 


   // Monitor authentication state
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Handle null or User
    });

    return () => unsubscribe();
  }, []);

  const isRecipe = (data: DocumentData): data is Recipe => {
    return (
      typeof data.recipeName === "string" &&
      typeof data.recipeDescription === "string" &&
      typeof data.difficulty === "string" &&
      typeof data.hours === "number" &&
      typeof data.minutes === "number" &&
      typeof data.portionSize === "number" &&
      typeof data.likes === "number" &&
      Array.isArray(data.ingredientsList) &&
      Array.isArray(data.tags) &&
      Array.isArray(data.instructions)
    );
  };

  const fetchRelatedRecipes = async (tags: string[]) => {
    try {
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("tags", "array-contains-any", tags));
      const querySnapshot = await getDocs(q);

      const related = querySnapshot.docs
        .map((doc) => ({ ...doc.data(), ID: doc.id } as Recipe))
        .filter((r) => r.ID !== params.id);

      setRelatedRecipes(related);
      
    } catch (error) {
      console.error("Error fetching related recipes:", error);
    }
  };

  const fetchComments = () => {
    const commentsRef = collection(db, "recipes", params.id, "comments");
    onSnapshot(commentsRef, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id, // Include the comment's ID
        ...doc.data(),
      })) as Comment[];
      setComments(fetchedComments);
    });
  };

  const getUsername = async (uid: string) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", uid)); 
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData.username || "Anonymous";
      }
      return "Anonymous"; 
    } catch (error) {
      console.error("Error fetching username:", error);
      return "Anonymous";
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }

    const username = await getUsername(user.uid);
  
    try {
      const commentsRef = collection(db, "recipes", params.id, "comments");
      await addDoc(commentsRef, {
        user: username,
        text: newComment,
        userUid: user.uid,
        timestamp: Timestamp.now(),
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!user) {
      alert("You need to be logged in to delete a comment.");
      return;
    }
  
    try {
      const commentRef = doc(db, "recipes", params.id, "comments", commentId);
      await deleteDoc(commentRef);
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment. Please try again.");
    }
  };

  const handleLike = async () => {
    if (!user) {
      alert("You need to be logged in to like a recipe.");
      return;
    }
  
    try {
      const likesRef = collection(db, "recipes", params.id, "likes");
      const q = query(likesRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
  
      const recipeRef = doc(db, "recipes", params.id);
  
      if (querySnapshot.empty) {
        setRecipe((prev) => prev && { ...prev, likes: prev.likes + 1 }); 
        setUserHasLiked(true);
        await addDoc(likesRef, { userId: user.uid });
        await updateDoc(recipeRef, { likes: increment(1) });
      } else {
        const likeDocId = querySnapshot.docs[0].id;
        const likeDocRef = doc(db, "recipes", params.id, "likes", likeDocId);
        setRecipe((prev) => prev && { ...prev, likes: prev.likes - 1 }); 
        setUserHasLiked(false);
        await deleteDoc(likeDocRef);
        await updateDoc(recipeRef, { likes: increment(-1) });
      }
    } catch (error) {
      console.error("Error updating like:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const handlePdfDownload = () => {
    if (!recipe) {
      alert("No recipe data available to generate a PDF.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(recipe.recipeName, 10, 10);
   
    doc.setFontSize(14);
    doc.text("Description:", 10, 20);
    doc.setFontSize(12);
    doc.text(recipe.recipeDescription, 10, 30);
    doc.setFontSize(14);
    doc.text("Servings:", 10, 40);
    doc.setFontSize(12);
    doc.text(recipe.portionSize.toString(), 10, 50); 

    doc.setFontSize(14);
    doc.text("Prep Time:", 10, 60);
    doc.setFontSize(12);
    doc.text(`${recipe.hours}h ${recipe.minutes}m`, 10, 70); 

    doc.setFontSize(14);
    doc.text("Difficulty Level:", 10, 80);
    doc.setFontSize(12);
    doc.text(recipe.difficulty, 10, 90); 

    doc.setFontSize(14);
    doc.text("Ingredients:", 10, 100);
    let yPosition = 110; 

    recipe.ingredientsList.forEach((ingredient) => {
      doc.setFontSize(12);
      doc.text(
        `${ingredient.quantity} ${ingredient.measurement} ${ingredient.name}`,
        10,
        yPosition
      );
      yPosition += 10;
    });

    doc.setFontSize(14);
    doc.text("Instructions:", 10, (yPosition += 5));
    recipe.instructions.forEach((step, index) => {
      doc.setFontSize(12);
      const line = `${index + 1}. ${step}`;
      const lineHeight = 10; 
      const maxWidth = 190; 
      const lines = doc.splitTextToSize(line, maxWidth); 
      lines.forEach((linePart: string | string[]) => {
        doc.text(linePart, 10, (yPosition += lineHeight));
      });
    });


    doc.save(`${recipe.recipeName}.pdf`);
  };

  useEffect(() => {
    const checkIfUserLiked = async () => {
      if (!user) return;
      console.log(user);
  
      try {
        const likesRef = collection(db, "recipes", params.id, "likes");
        const q = query(likesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        
  
        setUserHasLiked(!querySnapshot.empty); // Set to true if the user has liked
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
    const handleGroceryList = async () => {
     // Return early if `user` is not available

  if (loading) {
    // Ensure the loading process is complete before proceeding
    console.log("Data is still loading, please wait.");
    return;
  }else if(!user) {
    alert("No user login found");
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
        const existingItems: Ingredient[] = userData.groceryList.map((doc: any) => ({
          name: doc.name,
          quantity: doc.quantity,
          measurement: doc.measurement,
          recipeID: doc.recipeID
        }));
  
        setGroceryItem(existingItems);
        const recipeExists = existingItems.some((item) => item.recipeID === recipe?.recipeName);
        setIngredientAddStatus(!recipeExists);
        setAllergies(userData.Allergies);

      } catch (error) {
        console.log("Error fetching the grocery ingredients:", error);
      }
    };

    handleGroceryList();
    checkIfUserLiked();
  }, [user, recipe?.recipeName, recipe?.ingredientsList]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", params.id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          //console.log("Fetched recipe data:", data); 
          if (isRecipe(data)) {
            setRecipe(data);
            setRecipe({ ...data, ID: docSnap.id }); // Store Firebase document ID as ID
            fetchRelatedRecipes(data.tags);
            fetchComments(); 
            setPortionSize(data.portionSize);
          } else {
            console.error("Invalid recipe data structure!");
            router.push("/404");
          }
        } else {
          console.error("Recipe not found!");
          router.push("/404");
        }
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchRecipe();
  }, [params.id, router]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const docRef = doc(db, "recipes", params.id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Recipe;
          setRecipe({ ...data, ID: docSnap.id }); // Ensure ID is set here

          if (data.status === "draft") {
            setDraftRecipeData({ ...data, ID: docSnap.id }); // Pass ID to draft data
          }
        } else {
          console.error("Recipe not found!");
        }
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
  }, [params.id]);

  useEffect(() => {
    if (recipe) {
      const updatedIngredients = recipe.ingredientsList.map((ingredient) => ({
        ...ingredient,
        quantity: (ingredient.quantity / recipe.portionSize) * portionSize,
      }));
      setAdjustedIngredients(updatedIngredients);
    }
  }, [portionSize, recipe]);

  useEffect(() => {
    console.log("Recipe ID:", recipe?.ID);
  }, [recipe]);

  const addIngredientstoList = async () => {
    if (!user) {
      alert("No user login found");
      return;
    }
  
    let updatedGroceryItems = [];
  
    // If the groceryItem array is empty, add the adjustedIngredients to the list
    if (groceryItem.length === 0) {
      console.log("empty");
      updatedGroceryItems = adjustedIngredients.map((element) => ({
        name: element.name,
        quantity: element.quantity,
        measurement: element.measurement,
        recipeID: recipe?.recipeName,
      }));
    } else {
      // If the groceryItem array is not empty, check if ingredients are already present
      updatedGroceryItems = [...groceryItem];
      adjustedIngredients.forEach((element) => {
        const exists = groceryItem.some(
          (item) => item.name === element.name && item.recipeID === recipe?.recipeName
        );
  
        if (!exists) {
          updatedGroceryItems.push({
            name: element.name,
            quantity: element.quantity,
            measurement: element.measurement,
            recipeID: recipe?.recipeName,
          });
        }
      });
    }
  
    try {
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", user.uid)
      );
      const userSnapshot = await getDocs(userQuery);
  
      if (userSnapshot.empty) {
        console.log("No user found with the specified UID");
        return;
      }
  
      const userDocRef = userSnapshot.docs[0].ref;
  
      // Update Firestore with the new grocery list
      await updateDoc(userDocRef, {
        groceryList: updatedGroceryItems, // Update with the new list
      });
  
      // Update the local state with the new grocery list
      setGroceryItem(updatedGroceryItems);
      setIngredientAddStatus(false);
      console.log("Ingredients added to grocery list and status updated.");
    } catch (error) {
      console.error("Error adding ingredients to grocery list:", error);
    }
  };


  const alertSystem = async () => {
    console.log("User allergies:", allergies);
  
    // Validate input
    if (!allergies) {
      console.warn("No allergies specified.");
      return;
    }
  
    if (!recipe?.ingredientsList || recipe.ingredientsList.length === 0) {
      console.warn("Recipe ingredients list is missing or empty.");
      return;
    }
  
    // Create a copy of the ingredients list
    const ingredientList = [...recipe.ingredientsList];
    console.log("Recipe ingredients:", ingredientList);
  
    // Check for allergens
    try {
      const allergen = await AlertSystem(allergies, ingredientList);
  
      if (!allergen || allergen.length === 0) {
        console.log("No allergens found in the recipe.");
      } else {
        // Create detailed alert
        const allergenList = allergen.join(", ");
        const alertMessage = `Warning: This recipe can contains the following ingredient(s) that may pose health risks to you based on your allergies:\n${allergenList} \nPlease consult with your doctor or dietitian before consuming this dish.
        `;
  
        // Display the alert with title and message
        alert(`${alertMessage}`);
      }
    } catch (error) {
      console.error("Error occurred while checking allergens:", error);
    }
  };
  
  useEffect(() => {
  if (allergies && recipe?.ingredientsList) {
    alertSystem();
  }
}, [allergies, recipe?.ingredientsList]);
  

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
    <NavBarH />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
      <div className="col-span-2">
        {recipe ? (
          recipe.status === "draft" ?(
            // Render the NewRecipeForm if the recipe is a draft
            <NewRecipeForm  
            docNumber={params.id} // Pass the ID from params directl
            draftData={draftRecipeData} />
          ) : (
            <>
              {/* Main published recipe content */}
              <div className="flex items-center bg-container rounded-lg gap-10 p-6 mb-10">
                <img
                  src={recipe.imagePreview}
                  alt={recipe.recipeName}
                  className="w-96 h-96 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-5xl text-foreground font-bold mb-5">{recipe.recipeName}</h1>
                  <p className="text-xl text-foreground mb-4">{recipe.recipeDescription}</p>
                  <p className="text-lg text-foreground mb-2"><strong>Servings:</strong> {recipe.portionSize}</p>
                  <p className="text-lg text-foreground mb-2"><strong>Prep Time:</strong> {recipe.hours}h {recipe.minutes}m</p>
                  <p className="text-lg text-foreground mb-2"><strong>Difficulty Level:</strong> {recipe.difficulty}</p>
                  <p className="text-lg text-foreground mb-2"><strong>Likes:</strong> {recipe.likes}</p>

                  <div className="flex flex-row gap-x-[4vw]">
                    {/* Like Button */}
                    <button
                      onClick={handleLike}
                      className={`w-[17%] h-[10%] mt-2 px-4 py-2 ${
                        userHasLiked ? "bg-gray-800" : "bg-button"
                      } text-white rounded`}
                    >
                      {userHasLiked ? "Unlike" : "Like"}
                    </button>

                    <div className="flex flex-row h-[10%] gap-x-1">
                      <input
                        type="number"
                        className="flex w-[25%] h-full mt-3 px-2 py-2 rounded border-gray-400"
                        placeholder="Quantity"
                        value={portionSize}
                        onChange={(e) => setPortionSize(e.target.valueAsNumber)}
                        min="1"
                        step="1"
                      />
                      <p className="text-foreground mt-4"> Please select the serving size</p>
                      <button
                          onClick={handlePdfDownload}
                          className="bg-gray-800 text-white px-4 py-2 rounded ml-4 mt-3"
                        >
                          Print PDF
                        </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-container rounded-lg p-6 mb-10">
                
                <h2 className="text-2xl text-foreground font-semibold mb-4">Ingredients</h2>
              
                
                <ul className="list-disc list-inside pb-[2%]">
                  {adjustedIngredients.map((ingredient, index) => (
                    <li key={index} className="text-lg text-foreground">
                      {ingredient.name} ({ingredient.quantity} {ingredient.measurement})
                    </li>
                  ))}
                </ul>
                {ingredientAddStatus ? (
                    <button  onClick={addIngredientstoList}
                      className={`w-full h-[10%] ${
                      userHasLiked ? "bg-gray-800" : "bg-button"
                      } text-white rounded`
                    }>
                    Add Ingredients to the Grocery list
                    </button>) : (<button
                    disabled
                    className={`w-full h-[10%] ${
                    userHasLiked ? "bg-gray-500" : "bg-gray-800"
                    } text-white rounded`}>
                      Ingredients Added to the Grocery list
                    </button>)

                }
                
                
                
              </div>

              <div className="bg-container rounded-lg p-6 mb-10">
                <h2 className="text-2xl text-foreground font-semibold mb-4">Instructions</h2>
                <div className="space-y-4 text-foreground">
                  {recipe.instructions.map((step, index) => (
                    <p key={index} className="text-lg">
                      {index + 1}. {step}
                    </p>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
              <div className="bg-container rounded-lg p-6 mb-14.1">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">Comments</h2>
                <div className="space-y-4">
                  {comments.length > 0 ? (
                    comments.map((comment) => (
                      <div key={comment.id} className="border-b pb-2 mb-2 flex justify-between">
                        <div>
                          <p className="text-lg text-foreground font-semibold">{comment.user}</p>
                          <p className="text-foreground">{comment.text}</p>
                          <p className="text-sm text-foreground">
                            {new Date(comment.timestamp.toDate()).toLocaleString()}
                          </p>
                        </div>

                        {/* Check if the current user matches the comment's owner UID */}
                        {user && comment.userUid === user.uid && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-foreground">No comments yet. Be the first to comment!</p>
                  )}
                </div>

                <div className="mt-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-2 bg-input border rounded"
                    placeholder="Write your comment..."
                  />
                  <button
                    onClick={handleAddComment}
                    className="mt-2 px-4 py-2 bg-button text-white rounded"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </>
          )
        ) : (
          <div>Loading...</div>
        )}
      </div>

      {/* Right column: Related recipes or other sidebar content */}
      <div className="col-span-1 flex flex-col h-full space-y-8">
        {/* Nutrients Section */}
        <div className="bg-container p-6 rounded-lg flex-1 overflow-hidden">
          <h2 className="text-2xl text-foreground font-semibold mb-2">Nutrients</h2>
          <label>{nutritionFacts}</label>
        </div>

        {/* Related Recipes Section */}
        <div className="bg-container p-6 rounded-lg flex-1 overflow-y-auto">
          <h2 className="text-2xl text-foreground font-semibold mb-4">Related Recipes</h2>
          <div className="space-y-4">
            {relatedRecipes.length > 0 ? (
              relatedRecipes.map((relatedRecipe) => (
                <RecipeCard
                  key={relatedRecipe.ID}
                  ID={relatedRecipe.ID}
                  name={relatedRecipe.recipeName}
                  imageUrl={relatedRecipe.imageUrl}
                  description={relatedRecipe.recipeDescription}
                />
              ))
            ) : (
              <p>No related recipes found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
}
/*
TODO: Get the picture diplay working on the page
*/






