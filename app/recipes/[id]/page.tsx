"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, addDoc, collection, where, query, getDocs, onSnapshot, Timestamp, DocumentData, updateDoc, increment, deleteDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { NavBarH } from "@/app/components/Shared/NavbarH";
import { Footer } from "@/app/components/Shared/Footer";
import { RecipeCard } from "@/app/components/Recipe Card/ReciepeCard";

interface Recipe {
  recipeName: string;
  recipeDescription: string;
  hours: number;
  minutes: number;
  likes: number;
  portionSize: number;
  ingredientsList: string[];
  instructions: string[];
  difficulty: string;
  tags: string[];
  imageUrl: string;
  ID: string;
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: Timestamp;
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [relatedRecipes, setRelatedRecipes] = useState<Recipe[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

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

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }
    if (!user) {
      alert("You need to be logged in to comment.");
      return;
    }
  
    try {
      const commentsRef = collection(db, "recipes", params.id, "comments");
      await addDoc(commentsRef, {
        user: user.displayName || user.email || "Unknown User", // Fetch username properly
        text: newComment,
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
  

  useEffect(() => {
    const checkIfUserLiked = async () => {
      if (!user) return;
  
      try {
        const likesRef = collection(db, "recipes", params.id, "likes");
        const q = query(likesRef, where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
  
        setUserHasLiked(!querySnapshot.empty); // Set to true if the user has liked
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };
  
    checkIfUserLiked();
  }, [user, params.id]);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const docRef = doc(db, "recipes", params.id);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Fetched recipe data:", data); 
          if (isRecipe(data)) {
            setRecipe(data);
            fetchRelatedRecipes(data.tags);
            fetchComments(); 
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen">
      <NavBarH />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10">
       <div className="col-span-2">
          {recipe && (
            <>
      <div className="flex items-center bg-[#e5dece] rounded-lg gap-10 p-6 mb-10">
          <img
             src={recipe.imageUrl}
             alt={recipe.recipeName}
             className="w-96 h-96 object-cover rounded-lg"
            />
           <div className="flex-1">
              <h1 className="text-5xl font-bold mb-5">{recipe.recipeName}</h1>
                  <p className="text-xl mb-4">{recipe.recipeDescription}</p>
                  <p className="text-lg mb-2"><strong>Servings:</strong> {recipe.portionSize}</p>
                  <p className="text-lg mb-2"><strong>Prep Time:</strong> {recipe.hours}h {recipe.minutes}m</p>
                  <p className="text-lg mb-2"><strong>Difficulty Level:</strong> {recipe.difficulty}</p>
                  <p className="text-lg mb-2"><strong>Likes:</strong> {recipe.likes}</p>
                  <button
                    onClick={handleLike}
                    className={`mt-2 px-4 py-2 ${
                    userHasLiked ? "bg-gray-500" : "bg-gray-800"
                    } text-white rounded`}
                    >
                    {userHasLiked ? "Unlike" : "Like"}
                  </button>
                </div>
              </div>

              <div className="bg-[#e5dece] rounded-lg p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
                <ul className="list-disc list-inside">
                  {recipe.ingredientsList.map((ingredient, index) => (
                    <li key={index} className="text-lg">{ingredient}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#e5dece] rounded-lg p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <div className="space-y-4">
                  {recipe.instructions.map((step, index) => (
                    <p key={index} className="text-lg">{index + 1}. {step}</p>
                  ))}
                </div>
              </div>

              {/* Comments Section */}
            <div className="bg-[#e5dece] rounded-lg p-6 mb-10">
              <h2 className="text-2xl font-semibold mb-4">Comments</h2>
              <div className="space-y-4">
                 {comments.length > 0 ? (
                    comments.map((comment) => (
              <div key={comment.id} className="border-b pb-2 mb-2 flex justify-between">
              <div>
                  <p className="text-lg font-semibold">{comment.user}</p>
                  <p className="text-gray-700">{comment.text}</p>
                  <p className="text-sm text-gray-500">
              {new Date(comment.timestamp.toDate()).toLocaleString()}
            </p>
          </div>

          {user && (comment.user === user.displayName || comment.user === user.email) && (
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
            <p>No comments yet. Be the first to comment!</p>
          )}
        </div>

        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Write your comment..."
          />
          <button
           onClick={handleAddComment}
          className="mt-2 px-4 py-2 bg-gray-800 text-white rounded"
           >
            Add Comment
            </button>
           </div>
          </div>

               </>
          )}
        </div>

        <div className="bg-[#e5dece] p-6 rounded-lg mb-10">
          <h2 className="text-2xl font-semibold mb-4">Related Recipes</h2>
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
      <Footer />
    </div>
  );
}