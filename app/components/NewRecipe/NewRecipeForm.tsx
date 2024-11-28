"use client"
import React, { useState, useRef, useEffect } from 'react';
import { collection, addDoc, updateDoc, arrayUnion, query, where, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { db, storage } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";
import { ref, uploadString, getDownloadURL  } from 'firebase/storage';
import { useRouter } from "next/router";

interface Ingredient {
  name: string;
  quantity: number;
  measurement: string | null;
}

interface Recipe {
  recipeName: string;
  recipeDescription: string;
  hours: number;
  minutes: number;
  portionSize: number;
  instructions: string[];
  difficulty: string;
  tags: string[];
  ingredientsList: Ingredient[];
  imagePreview: string;
}

// Define the props interface to include docNumber as an optional prop
interface NewRecipeFormProps {
  docNumber: string; 
  draftData?: Recipe | null;
}



export default function NewRecipeForm({ docNumber, draftData }: NewRecipeFormProps) {
  const [image, setImage] = useState<any>("");
  let uuid = crypto.randomUUID();
  const storageRef = ref(storage, uuid);
 const [recipeName, setRecipeName] = useState('');
 const [recipeDescription, setRecipeDescription] = useState('');
 const [hours, setHours] = useState('');
 const [minutes, setMinutes] = useState('');
 const [ingredient, setIngredient] = useState('');
 const [measurement, setMeasurement] = useState('Select Measurement');
 const [quantity, setQuantity] = useState('');
 const [instructions, setInstructions] = useState('');
 const [tags, setTags] = useState<string[]>([]);
 const [portionSize, setPortionSize] = useState('');
 const [difficulty, setDifficulty] = useState('Intermediate');
 const [ingredientsList, setIngredientsList] = useState<Ingredient[]>([]);
 const [imagePreview, setImagePreview] = useState<string>("");
 const [Loading, setLoading] = useState<boolean>(false);



 const [errors, setErrors] = useState({
   recipeName: '',
   recipeDescription: '',
   cookingTime: '',
   instructions: '',
   ingredients: '',
   portionSize: ''
 });

 type Ingredient = {
  name: string;
  quantity: number;
  measurement: string | null;
};

 const validateForm = (recipeStatus: string) => {
   const newErrors: any = {};
   let isValid = true;


   // validation for published recipes
   if (recipeStatus === 'published') {
     if (!recipeName) {
       newErrors.recipeName = 'Recipe name is required.';
       isValid = false;
     }
     if (!recipeDescription) {
       newErrors.recipeDescription = 'Recipe description is required.';
       isValid = false;
     }
     if (!hours && !minutes) {
       newErrors.cookingTime = 'Please provide cooking time in hours or minutes.';
       isValid = false;
     }
     if (!instructions) {
       newErrors.instructions = 'Recipe instructions are required.';
       isValid = false;
     }
     if (!portionSize) {
       newErrors.portionSize = 'Portion size is required.';
       isValid = false;
     }
     if (ingredientsList.length === 0) {
       newErrors.ingredients = 'Please add at least one ingredient.';
       isValid = false;
     }
     if (!image) {
      newErrors.image = 'Image is required for publishing.';
      isValid = false;
    }
     
   }


   //  At least one field must be filled
   if (recipeStatus === 'draft') {
     const isAnyFieldFilled =
       recipeName ||
       recipeDescription ||
       hours ||
       minutes ||
       ingredientsList.length > 0 ||
       instructions ||
       tags ||
       portionSize ||
       imagePreview;


     if (!isAnyFieldFilled) {
       newErrors.recipeName = 'At least one field must be filled to save as a draft.';
       isValid = false;
     }
   }


   setErrors(newErrors);
   return isValid;
 };

 const handleUpload = async () => {
  try {
    if (image) {
      // Upload image to Firebase Storage
      await uploadString(storageRef, image, "data_url");
      const url = await getDownloadURL(storageRef);
      console.log("URL from storage:", url);
      setImagePreview(url); // Set the preview image URL after upload
      setLoading(true);
    } else {
      console.log("No image to upload");
    }
  } catch (error) {
    console.log("Upload error:", error);
  }
};



const removeDraftFromUser = async (draftId: string) => {
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDocRef = userSnapshot.docs[0].ref;
      const userDoc = await getDoc(userDocRef);
      const currentDrafts = userDoc.data()?.draftRecipes || [];

      const updatedDrafts = currentDrafts.filter((id: string) => id !== draftId);
      await updateDoc(userDocRef, { draftRecipes: updatedDrafts });
    }
  }
};


const handleSubmit = async (recipeStatus: string) => {
  console.log(`Submitting recipe with status: ${recipeStatus}`); // Debug log
  console.log(`docNumber: ${docNumber}`); // Log to check docNumber value

  if (!validateForm(recipeStatus)) {
    const errorMessage =
      recipeStatus === "published"
        ? "Failed to publish recipe, please check for missing fields."
        : "Failed to save draft, please fill in at least one field.";
    alert(errorMessage);
    return;
  }

  try {
    // Upload the image if publishing and an image exists
    if (recipeStatus === "published" && image) {
      await handleUpload();
    }

    const instructionsArray = instructions
      .split("\n")
      .filter((step) => step.trim() !== "");

    const formData = {
      recipeName,
      recipeDescription,
      hours: parseInt(hours) || 0,
      minutes: parseInt(minutes) || 0,
      instructions: instructionsArray,
      portionSize: parseInt(portionSize) || 0,
      difficulty,
      tags,
      ingredientsList,
      imagePreview,
      status: recipeStatus,
      likes: 0
    };

     if (!docNumber) {
      const docRef = await addDoc(collection(db, "recipes"), formData);
      console.log(`Created new recipe with ID: ${docRef.id}`);
      
      // Update user's drafts if saving as draft
      if (recipeStatus === "draft") {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const userQuery = query(collection(db, "users"), where("uid", "==", user.uid));
          const userSnapshot = await getDocs(userQuery);
          if (!userSnapshot.empty) {
            const userDocRef = userSnapshot.docs[0].ref;
            await updateDoc(userDocRef, {
              draftRecipes: arrayUnion(docRef.id)
            });
          }
        }
      }
    } else {
      // If docNumber exists, update existing document
      const recipeRef = doc(db, "recipes", docNumber);
      await updateDoc(recipeRef, formData);
      console.log(`Updated recipe with ID: ${docNumber}`);
    }

    if (recipeStatus === "published") {
      if (docNumber) {
        await removeDraftFromUser(docNumber);
      }
      alert("Recipe published successfully!");
    } else {
      alert(docNumber ? "Draft updated successfully!" : "Draft saved successfully!");
    }

  } catch (err) {
    console.error("Error in handleSubmit:", err);
    alert("Error submitting form");
  }
};


const handleAddIngredient = () => {
  if (!ingredient || !quantity) {
    alert('Please fill out both the ingredient and quantity fields.');
    return;
  }

  const newIngredient: Ingredient = {
    name: ingredient,
    quantity: parseFloat(quantity), 
    measurement: measurement && measurement !== 'Select Measurement' ? measurement : null,
  };

  setIngredientsList([...ingredientsList, newIngredient]);
  setIngredient('');
  setMeasurement('Select Measurement');
  setQuantity('');
};


 const handleRemoveIngredient = (index: number) => {
   setIngredientsList(ingredientsList.filter((_, i) => i !== index));
 };


 const handleImageUpload = (e: any) => {
  const reader = new FileReader();
        
  if(e.target.files && e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
  }
  reader.onload = (readerEvent: any) => {
      setImage(readerEvent.target.result);
      console.log("picked images >>>", readerEvent.target.result);
  };
 };

 const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { value, checked } = event.target;
  if (checked) {
    setTags([...tags, value]); // Add tag to array if checked
  } else {
    setTags(tags.filter(tag => tag !== value)); // Remove tag from array if unchecked
  }
};


 // clear all fields
 const handleCancel = () => {
   setRecipeName('');
   setRecipeDescription('');
   setHours('');
   setMinutes('');
   setIngredient('');
   setMeasurement('Select Measurement');
   setQuantity('');
   setInstructions('');
   setTags([]);
   setPortionSize('');
   setDifficulty('Intermediate');
   setIngredientsList([]);
   setImagePreview('');
   setImage('');
   alert('Form cleared');
 };

 useEffect(() => {
  if (draftData) {
    // Populate form with draft data, including the ID
    setRecipeName(draftData.recipeName || '');
    setRecipeDescription(draftData.recipeDescription || '');
    setHours(draftData.hours?.toString() || '');
    setMinutes(draftData.minutes?.toString() || '');
    setPortionSize(draftData.portionSize?.toString() || '');
    setInstructions(draftData.instructions?.join("\n") || '');
    setDifficulty(draftData.difficulty || 'Intermediate');
    setTags(draftData.tags || []);
    setIngredientsList(draftData.ingredientsList || []);
    setImagePreview(draftData.imagePreview || '');
  }
}, [draftData]);
useEffect(() => {
  console.log("Received docNumber:", docNumber);
}, [docNumber]);


 return (
   <form className='flex flex-col space-y-6 p-10 bg-container rounded-lg w-[96%] mx-auto'>
     <div className='flex'>
    
       <div className='flex flex-col items-center mr-8'>
         <label className='text-foreground font-semibold mb-2'>Upload an Image:</label>
         <div className='w-[200px] h-[200px] bg-input bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-4'>
           {image ? (
             <img src={image} alt="Preview" className='w-full h-full object-cover rounded-lg bg-input' />
           ) : (
             <span className='text-gray-400'>No image uploaded</span>
           )}
         </div>
         <input type='file' accept='image/*' onChange={handleImageUpload} className='block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none bg-input' />
       </div>


       <div className='flex flex-col space-y-6 w-full'>


         <div className='flex items-center mt-8'>
           <label className='w-1/3 text-lg text-foreground font-semibold'>Recipe Title:</label>
           <input
             className='flex-1 p-2 border rounded border-gray-400 bg-input'
             placeholder="Give your recipe a name"
             value={recipeName}
             onChange={(e) => setRecipeName(e.target.value)}
           />
         </div>

         <div className='flex items-center'>
           <label className='w-1/3 text-lg text-foreground font-semibold'>Description:</label>
           <textarea
             className='flex-1 p-2 border rounded border-gray-400 bg-input'
             placeholder="Introduce your recipe"
             value={recipeDescription}
             onChange={(e) => setRecipeDescription(e.target.value)}
           />
         </div>

  
         <div className='flex items-center'>
           <label className='w-1/3 text-lg font-semibold text-foreground'>Cooking Time:</label>
           <div className='flex-1 flex space-x-1 w-1/2'>
           <input
             className='flex-1 p-2 border rounded border-gray-400 w-1/2 bg-input'
             placeholder="Hours"
             type="number"
             min="0"
             value={hours}
             onChange={(e) => setHours(e.target.value)}
           />
           <input
             className='flex-1 p-2 border rounded border-gray-400 w-1/2 bg-input'
             placeholder="Minutes"
             type="number"
             min="0"
             value={minutes}
             onChange={(e) => setMinutes(e.target.value)}
           />
         </div>
         </div>
       </div>
     </div>

     <div>
       <label className='text-lg font-semibold text-foreground'>Ingredients:</label>
       <div className='flex space-x-2'>
         <input
           className='flex-1 p-2 border rounded border-gray-400 bg-input'
           placeholder="Ingredient"
           value={ingredient}
           onChange={(e) => setIngredient(e.target.value)}
         />
         <input
           type = 'number'
           className='flex-1 p-2 border rounded border-gray-400 bg-input'
           placeholder="Quantity"
           value={quantity}
           min="0"
           onChange={(e) => setQuantity(e.target.value)}
         />
     
          <select
           className='flex-1 p-2 border rounded border-gray-400 bg-input'
           value={measurement}
           onChange={(e) => setMeasurement(e.target.value)}       
           >
           <option value=" ">Select Measurement</option>
           <option value={parseInt(quantity) == 1 ? "Cup" : "Cups"}>Cup(s)</option>
           <option value={parseInt(quantity) == 1 ? "Gallon" : "Gallons"}>Gallon(s)</option>
           <option value={parseInt(quantity) == 1 ? "Gram" : "Grams"}>Gram(s)</option>
           <option value={parseInt(quantity) == 1 ? "Kilogram" : "Kilograms"}>Kilogram(s)</option>
           <option value={parseInt(quantity) == 1 ? "Liter" : "Liters"}>Liter(s)</option>
           <option value={parseInt(quantity) == 1 ? "Milliliter" : "Mililiters"}>Milliliter(s)</option>
           <option value={parseInt(quantity) == 1 ? "Ounce" : "Ounces"}>Ounce(s)</option>
           <option value={parseInt(quantity) == 1 ? "Pound" : "Pounds"}>Pound(s)</option>
           <option value={parseInt(quantity) == 1 ? "Pint" : "Pints"}>Pint(s)</option>
           <option value={parseInt(quantity) == 1 ? "Tablespoon" : "Tablespoons"}>Tablespoon(s)</option>
           <option value={parseInt(quantity) == 1 ? "Teaspoon" : "Teaspoons"}>Teaspoon(s)</option>
           </select>
         <button
           type="button"
           onClick={handleAddIngredient}
           className='p-2 bg-gray-800 text-white bg-button rounded'>
           Add
         </button>
       </div>
       <div className='mt-4'>
  {ingredientsList.map((ingredient, index) => (
    <div key={index} className='flex items-center space-x-2 mb-2'>
      <span className='bg-gray-100 p-2 rounded'>
        {ingredient.name} ({ingredient.quantity} {ingredient.measurement || ''})
      </span>
      <button
        type="button"
        onClick={() => handleRemoveIngredient(index)}
        className='text-red-500'>
        &times;
      </button>
      </div>
     ))}
</div>
     </div>
    
     <div className='flex flex-col'>
       <label className='w-1/3 text-lg font-semibold text-foreground'>Instructions:</label>
       <textarea
        className='flex-1 p-2 border rounded border-gray-400 bg-input'
        placeholder="Add each step on a new line"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        rows={6}
      />
     </div>

      {/* Tags Checkboxes */}
      <div className='flex flex-col '>
        <label className='text-lg font-semibold text-foreground'>Tags:</label>
        <div className='grid grid-cols-2 gap-2 text-foreground'>
          <label>
            <input
              type="checkbox"
              value="Dairy-Free"
              onChange={handleTagChange}
              checked={tags.includes("Dairy-Free")}
              className='mr-2'
            />
            Dairy-Free
          </label>
          <label>
            <input
              type="checkbox"
              value="Gluten-Free"
              onChange={handleTagChange}
              checked={tags.includes("Gluten-Free")}
              className='mr-2'
            />
            Gluten-Free
          </label>
          <label>
            <input
              type="checkbox"
              value="Vegan"
              onChange={handleTagChange}
              checked={tags.includes("Vegan")}
              className='mr-2'
            />
            Vegan
          </label>
          <label>
            <input
              type="checkbox"
              value="Breakfast"
              onChange={handleTagChange}
              checked={tags.includes("Breakfast")}
              className='mr-2'
            />
            Breakfast
          </label>
          <label>
            <input
              type="checkbox"
              value="Lunch"
              onChange={handleTagChange}
              checked={tags.includes("Lunch")}
              className='mr-2'
            />
            Lunch
          </label>
          <label>
            <input
              type="checkbox"
              value="Dinner"
              onChange={handleTagChange}
              checked={tags.includes("Dinner")}
              className='mr-2'
            />
            Dinner
          </label>
        </div>
      </div>



      <div className='flex items-center'>
       <label className='w-1/3 text-lg text-foreground font-semibold'>Portion Size:</label>
       <input
         className='flex-1 p-2 border rounded border-gray-400 bg-input'
         placeholder="Number of people this recipe can serve"
         type="number"
         value={portionSize}
         onChange={(e) => setPortionSize(e.target.value)}
       />
     </div>


      <div className='flex items-center'>
       <label className='w-1/3 text-lg font-semibold text-foreground'>Difficulty Level:</label>
       <select
         className='flex-1 p-2 border rounded border-gray-40 bg-input'
         value={difficulty}
         onChange={(e) => setDifficulty(e.target.value)}
       >
         <option value="Intermediate">Intermediate</option>
         <option value="Moderate">Moderate</option>
         <option value="Difficult">Difficult</option>
       </select>
     </div>


   
     <div className='flex justify-center space-x-4 mt-8'>
       <button type="button"  onClick={() => handleSubmit("published")} className='w-1/4 p-2 text-white rounded bg-button'>
         Publish
       </button>
       <button type="button"  onClick={() => handleSubmit("draft")}  className='w-1/4 p-2 bg-gray-800 text-white rounded bg-button'>
         Draft
       </button>
       <button type="button" onClick={handleCancel} className='w-1/4 p-2 bg-gray-800 text-white rounded bg-button'>
         Clear
       </button>
     </div>
   </form>
 );
}



