"use client"
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "/workspaces/Healthfull/firebaseConfig";


export default function NewRecipeForm() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [quantity, setQuantity] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState('');
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

  const validateForm = () => {
    const newErrors: any = {};
    let isValid = true;

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

    setErrors(newErrors);
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      let alertMessages = [];
      if (newErrors.recipeName) alertMessages.push(newErrors.recipeName);
      if (newErrors.recipeDescription) alertMessages.push(newErrors.recipeDescription);
      if (newErrors.cookingTime) alertMessages.push(newErrors.cookingTime);
      if (newErrors.instructions) alertMessages.push(newErrors.instructions);
      if (newErrors.ingredients) alertMessages.push(newErrors.ingredients);
      if (newErrors.portionSize) alertMessages.push(newErrors.portionSize);
      alert(alertMessages.join("\n"));
    } else {
      try {
        const formData = {
          recipeName,
          recipeDescription,
          hours,
          minutes,
          instructions,
          portionSize,
          difficulty,
          tags,
          ingredientsList,
          imagePreview
        };

        // Save data to Firestore
        await addDoc(collection(db, "recipes"), formData);

        alert('Form submitted successfully!');
      } catch (err) {
        console.error("Error adding document: ", err);
        alert("Error submitting form");
      }
    }
  };

  const handleAddIngredient = () => {
    if (!ingredient || !measurement || !quantity) {
      alert('Please fill out all ingredient fields.');
      return;
    }
    const newIngredient = `${ingredient} (${quantity} ${measurement})`;
    setIngredientsList([...ingredientsList, newIngredient]);
    setIngredient('');
    setMeasurement('');
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

  // clear all fields
  const handleCancel = () => {
    setRecipeName('');
    setRecipeDescription('');
    setHours('');
    setMinutes('');
    setIngredient('');
    setMeasurement('');
    setQuantity('');
    setInstructions('');
    setTags('');
    setPortionSize('');
    setDifficulty('Intermediate');
    setIngredientsList([]);
    setImagePreview(null); 
    alert('Form cleared');
  };

  // draft saving
  const handleDraft = () => {
    const isEmpty =
      !recipeName &&
      !recipeDescription &&
      !hours &&
      !minutes &&
      !instructions &&
      ingredientsList.length === 0 &&
      !portionSize &&
      !tags &&
      !imagePreview;

    if (isEmpty) {
      alert('At least one field must be filled to save as a draft.');
    } else {
      const draft = {
        recipeName,
        recipeDescription,
        hours,
        minutes,
        ingredient,
        measurement,
        quantity,
        instructions,
        portionSize,
        difficulty,
        tags,
        ingredientsList,
        imagePreview
      };
      console.log('Draft saved:', draft);
      alert('Draft saved successfully!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col space-y-4 p-8 bg-[#e5dece] rounded-lg max-w-4xl mx-auto'>
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
            <input
              className='p-2 border rounded border-gray-400 mr-2'
              placeholder="Hours"
              type="number"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
            <input
              className='p-2 border rounded border-gray-400'
              placeholder="Minutes"
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            />
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
            className='flex-1 p-2 border rounded border-gray-400'
            placeholder="Measurement"
            value={measurement}
            onChange={(e) => setMeasurement(e.target.value)}
          />
          <input
            className='flex-1 p-2 border rounded border-gray-400'
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
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

 
      <div className='flex items-center'>
        <label className='w-1/3 text-lg font-semibold'>Tags:</label>
        <input
          className='flex-1 p-2 border rounded border-gray-400'
          placeholder="Add tags, separated by commas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>


      <div className='flex items-center'>
        <label className='w-1/3 text-lg font-semibold'>Instructions:</label>
        <textarea
          className='flex-1 p-2 border rounded border-gray-400'
          placeholder="Add instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
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
        <button type="submit" className='w-1/4 p-2 bg-gray-800 text-white rounded'>
          Publish
        </button>
        <button type="button" onClick={handleDraft} className='w-1/4 p-2 bg-gray-800 text-white rounded'>
          Draft
        </button>
        <button type="button" onClick={handleCancel} className='w-1/4 p-2 bg-gray-800 text-white rounded'>
          Clear
        </button>
      </div>
    </form>
  );
}