"use client"
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { getAuth } from "firebase/auth";
import { doc, updateDoc, arrayUnion, getDoc} from "firebase/firestore";
import { db } from "/workspaces/Healthfull/firebaseConfig";




interface RecipeCardProps {
 id: string; // Recipe ID
 name?: string; // Name of the recipe
 imageUrl?: string; // URL of the recipe image
 description?: string; // Description of the recipe
 onSave?: () => void; // Optional save function
}


export function RecipeCard({ id, name, imageUrl, description, onSave }: RecipeCardProps) {
 const router = useRouter();
 const auth = getAuth();


 // Function to save the recipe
 const handleSaveRecipe = async () => {
   const user = auth.currentUser;


   if (!user) {
     alert("Please log in to save recipes.");
     return;
   }


   try {
     const userRef = doc(db, "users", user.uid);
     const docSnap = await getDoc(userRef);
     if (!docSnap.exists()) {
       console.log("User document does not exist!"); // Debugging log
       alert("User document not found.");
       return;
     }
     await updateDoc(userRef, {
       savedRecipes: arrayUnion(id)
     });
     alert("Recipe saved successfully!");
   } catch (error) {
     console.error("Error saving recipe:", error);
     alert("Failed to save recipe.");
   }
 };


 return (
   <div className='w-[14vw] h-[20vw] p-4 flex flex-col bg-white rounded-lg border border-gray-300 relative overflow-hidden'>
     <div className='w-full h-1/2 relative'>
       <Image
         src={imageUrl || '/default-image.svg'}
         alt={name || "Recipe Image"}
         layout="fill"
         objectFit="cover"
         className='rounded-t-lg'
       />
     </div>
     <div className="flex flex-col flex-1 p-2">
       <h2 className="text-lg font-semibold text-gray-800">{name || "Unnamed Recipe"}</h2>
       <p className="text-sm text-gray-600 flex-1 overflow-hidden">{description || "No description available."}</p>
       <button
           onClick={handleSaveRecipe}
         className="mt-2 self-end bg-gray-300 text-black px-2 py-1 text-sm rounded hover:bg-gray-400"
       >
         Save
       </button>
     </div>
   </div>
 );
}
{/* TODO: add the save button and  make it working using the layout.txs which can alter route based on authentication*/}


