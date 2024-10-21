"use client"
import React, { useState } from 'react';
import { collection, addDoc, doc, updateDoc, arrayUnion, query, where, getDocs} from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import { getAuth } from "firebase/auth";




export default function NewRecipeForm() {
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
 const [ingredientsList, setIngredientsList] = useState<string[]>([]);
 const [imagePreview, setImagePreview] = useState<string | null>(null);


 const [errors, setErrors] = useState({
   recipeName: '',
   recipeDescription: '',
   cookingTime: '',
   instructions: '',
   ingredients: '',
   portionSize: ''
 });

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


 // Submit handler for both draft and publish
 const handleSubmit = async (recipeStatus: string) => {
  if (!validateForm(recipeStatus) && recipeStatus === "published") {
    alert("Failed to publish recipe, please check for missing fields.");
    return;
  } else if (!validateForm(recipeStatus) && recipeStatus === "draft") {
    alert("Failed to save draft, please fill in at least one field.");
    return;
  }

  try {
    const instructionsArray = instructions
      .split('\n')
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
      likes: 0,
    };

    // Save form data to Firestore
    const docRef = await addDoc(collection(db, "recipes"), formData);
    const recipeId = docRef.id;

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('No user logged in, cannot save recipe to profile');
      return;
    }

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      alert("No matching user document found.");
      return;
    }

    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

    if (recipeStatus === 'published') {
      await updateDoc(userRef, {
        publishedRecipes: arrayUnion(recipeId),
      });
      alert('Recipe published successfully!');
      handleCancel(); // Clear the form after publishing
    } else if (recipeStatus === 'draft') {
      await updateDoc(userRef, {
        draftRecipes: arrayUnion(recipeId),
      });
      alert('Recipe saved as draft successfully!');
    }
  } catch (err: any) {
    console.error("Error adding document: ", err);
    alert("Error submitting form");
  }
};


 const handleAddIngredient = () => {
   if (!ingredient || !quantity) {
     alert('Please fill out both the ingredient and quantity fields.');
     return;
   }  
   const newIngredient = measurement && measurement !== 'Select Measurement'
     ? `${ingredient} (${quantity} ${measurement})`
     : `${ingredient} (${quantity})`;
   
   setIngredientsList([...ingredientsList, newIngredient]);
   setIngredient('');
   setMeasurement('Select Measurement');
   setQuantity('');
 };


 const handleRemoveIngredient = (index: number) => {
   setIngredientsList(ingredientsList.filter((_, i) => i !== index));
 };


 const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
   const file = e.target.files?.[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       setImagePreview(reader.result as string);
     };
     reader.readAsDataURL(file);
   }
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
   setImagePreview(null);
   alert('Form cleared');
 };


 return (
   <form className='flex flex-col space-y-6 p-10 bg-[#e5dece] rounded-lg w-[96%] mx-auto'>
     <div className='flex'>
    
       <div className='flex flex-col items-center mr-8'>
         <label className='text-lg font-semibold mb-2'>Upload an Image:</label>
         <div className='w-[200px] h-[200px] bg-gray-100 border border-gray-300 rounded-lg flex items-center justify-center mb-4'>
           {imagePreview ? (
             <img src={imagePreview} alt="Preview" className='w-full h-full object-cover rounded-lg' />
           ) : (
             <span className='text-gray-400'>No image uploaded</span>
           )}
         </div>
         <input type='file' accept='image/*' onChange={handleImageUpload} className='block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 focus:outline-none' />
       </div>


       <div className='flex flex-col space-y-6 w-full'>


         <div className='flex items-center mt-8'>
           <label className='w-1/3 text-lg font-semibold'>Recipe Title:</label>
           <input
             className='flex-1 p-2 border rounded border-gray-400'
             placeholder="Give your recipe a name"
             value={recipeName}
             onChange={(e) => setRecipeName(e.target.value)}
           />
         </div>




         <div className='flex items-center'>
           <label className='w-1/3 text-lg font-semibold'>Description:</label>
           <textarea
             className='flex-1 p-2 border rounded border-gray-400'
             placeholder="Introduce your recipe"
             value={recipeDescription}
             onChange={(e) => setRecipeDescription(e.target.value)}
           />
         </div>


  
         <div className='flex items-center'>
           <label className='w-1/3 text-lg font-semibold'>Cooking Time:</label>
           <div className='flex-1 flex space-x-1 w-1/2'>
           <input
             className='flex-1 p-2 border rounded border-gray-400 w-1/2'
             placeholder="Hours"
             type="number"
             min="0"
             value={hours}
             onChange={(e) => setHours(e.target.value)}
           />
           <input
             className='flex-1 p-2 border rounded border-gray-400 w-1/2'
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
       <label className='text-lg font-semibold'>Ingredients:</label>
       <div className='flex space-x-2'>
         <input
           className='flex-1 p-2 border rounded border-gray-400'
           placeholder="Ingredient"
           value={ingredient}
           onChange={(e) => setIngredient(e.target.value)}
         />
         <input
           type = 'number'
           className='flex-1 p-2 border rounded border-gray-400'
           placeholder="Quantity"
           value={quantity}
           min="0"
           onChange={(e) => setQuantity(e.target.value)}
         />
     
          <select
           className='flex-1 p-2 border rounded border-gray-400'
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
           className='p-2 bg-gray-800 text-white rounded'>
           Add
         </button>
       </div>
       <div className='mt-4'>
         {ingredientsList.map((ingredient, index) => (
           <div key={index} className='flex items-center space-x-2 mb-2'>
             <span className='bg-gray-100 p-2 rounded'>{ingredient}</span>
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
       <label className='w-1/3 text-lg font-semibold'>Instructions:</label>
       <textarea
        className='flex-1 p-2 border rounded border-gray-400'
        placeholder="Add each step on a new line"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        rows={6}
      />
     </div>

      {/* Tags Checkboxes */}
      <div className='flex flex-col '>
        <label className='text-lg font-semibold'>Tags:</label>
        <div className='grid grid-cols-2 gap-2'>
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
       <label className='w-1/3 text-lg font-semibold'>Portion Size:</label>
       <input
         className='flex-1 p-2 border rounded border-gray-400'
         placeholder="Number of people this recipe can serve"
         type="number"
         value={portionSize}
         onChange={(e) => setPortionSize(e.target.value)}
       />
     </div>


      <div className='flex items-center'>
       <label className='w-1/3 text-lg font-semibold'>Difficulty Level:</label>
       <select
         className='flex-1 p-2 border rounded border-gray-400'
         value={difficulty}
         onChange={(e) => setDifficulty(e.target.value)}
       >
         <option value="Intermediate">Intermediate</option>
         <option value="Moderate">Moderate</option>
         <option value="Difficult">Difficult</option>
       </select>
     </div>


   
     <div className='flex justify-center space-x-4 mt-8'>
       <button type="button"  onClick={() => handleSubmit("published")} className='w-1/4 p-2 bg-gray-800 text-white rounded'>
         Publish
       </button>
       <button type="button"  onClick={() => handleSubmit("draft")}  className='w-1/4 p-2 bg-gray-800 text-white rounded'>
         Draft
       </button>
       <button type="button" onClick={handleCancel} className='w-1/4 p-2 bg-gray-800 text-white rounded'>
         Clear
       </button>
     </div>
   </form>
 );
}

