<<<<<<< Updated upstream
export default function NewRecipeForm() {
    return (
      <div className='flex main-container w-[1400px] h-[1100px] justify-center relative mx-auto my-0'>
=======
"use client"
import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";


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
    portionSize: '',
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
        const instructionsArray = instructions.split('\n').filter(step => step.trim() !== "");
  
        const formData = {
          recipeName,
          recipeDescription,
          hours: parseInt(hours), 
          minutes: parseInt(minutes), 
          instructions: instructionsArray, 
          portionSize: parseInt(portionSize), 
          difficulty,
          tags,
          ingredientsList,
          imagePreview
        };
  
        // Save form data to Firestore
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

>>>>>>> Stashed changes
 
 
 <div className='flex w-[352.232px] h-[34.537px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[8px] items-center flex-nowrap bg-[#fff] rounded-full border-solid border border-[#d9d9d9] relative overflow-hidden z-[65] mt-[402.361px] mr-0 mb-0 ml-[300.72px]'>
        <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[66]">
          first ingredient
        </span>
        <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[67]'>
          <div className='w-[9.6px] h-[9.6px] bg-[length:100%_100%] bg-no-repeat relative z-[68] mt-[3.2px] mr-0 mb-0 ml-[3.2px]' />
        </div>
        <input className='w-[352.232px] h-[34.537px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[69]' />
      </div>
     
      <div className='w-[1370px] h-[1000px] bg-[#e5dece] rounded-[50px] absolute top-10 left-3' />
      <div className='w-[200px] h-[202.908px] bg-[rgba(227,227,227,0.2)] bg-contain bg-no-repeat absolute top-[64.758px] left-[52.526px] z-[86]' />
      <div className='flex w-[650px] h-[41.445px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[66.485px] left-[650.908px] overflow-hidden z-[1]'>
        <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[2]">
          Give your recipe a name
        </span>
        <input className='w-[819.814px] h-[41.445px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[3]' />
      </div>
      <div className='flex w-[193.624px] h-[26.767px] flex-col gap-[8px] items-start flex-nowrap absolute top-[74.256px] left-[410.937px] z-30'>
        <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[31]">
          Recipe Title:
        </span>
      </div>
      <div className='flex w-[650px] h-[85.48px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[141.604px] left-[645.758px] overflow-hidden z-[6]'>
        <span className="h-[22px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[7]">
          Introduce your recipe
        </span>
        <div className='w-[7.334px] h-[7.334px] shrink-0 bg-cover bg-no-repeat absolute bottom-[6.146px] right-[4.54px] z-[8]' />
        <input className='w-[821.874px] h-[85.48px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[9]' />
      </div>
      <div className='flex w-[187.445px] h-[31.947px] flex-col gap-[8px] items-start flex-nowrap absolute top-[141.604px] left-[410.937px] z-[26]'>
        <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[27]">
          Description:
        </span>
      </div>
      <div className='flex w-[247.18px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[238.308px] left-[650.908px] overflow-hidden z-[14]'>
        <span className="flex w-[246px] h-[23px] justify-start items-start shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[15]">
          Hours
        </span>
        <input className='w-[247.18px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[16]' />
      </div>
      <div className='flex w-[247.18px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[238.308px] left-[917.656px] overflow-hidden z-[17]'>
        <span className="flex w-[208px] h-[23px] justify-start items-start shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[18]">
          Minutes
        </span>
        <input className='w-[247.18px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[19]' />
      </div>
      <div className='flex w-[239.971px] h-[40.581px] flex-col gap-[8px] items-start flex-nowrap absolute top-[240.899px] left-[410.937px] z-[28]'>
        <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[29]">
          Cooking Time:
        </span>
      </div>
      <button className='flex w-[299.706px] h-[34.537px] flex-col gap-[8px] justify-center items-center flex-nowrap rounded-[100px] border-none absolute top-[291.841px] left-[61.795px] overflow-hidden z-[81] pointer'>
        <div className='flex pt-[10px] pr-[24px] pb-[10px] pl-[16px] gap-[8px] justify-center items-center self-stretch grow shrink-0 basis-0 flex-nowrap bg-[#424242] relative z-[82]'>
          <div className='w-[18px] h-[18px] shrink-0 relative z-[83]'>
            <div className='w-[10.5px] h-[10.5px] bg-[length:100%_100%] bg-no-repeat relative z-[84] mt-[3.75px] mr-0 mb-0 ml-[3.75px]' />
          </div>
          <span className="flex w-[106px] h-[20px] justify-center items-center shrink-0 basis-auto font-['Roboto'] text-[14px] font-medium leading-[20px] text-[#f2f2f2] tracking-[0.1px] relative text-center whitespace-nowrap z-[85]">
            upload an image
          </span>
        </div>
      </button>
      <div className='flex w-[228.642px] h-[39.718px] flex-col gap-[8px] items-start flex-nowrap absolute top-[306.52px] left-[410.937px] z-50'>
        <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[51]">
          Ingredients:
        </span>
      </div>
      <div className='flex w-[190px] h-[39.725px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[313.427px] left-[1100px] rotate-[0.01deg] overflow-hidden z-[60]'>
        <span className="h-[16.018px] grow shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[61]">
          Quantity
        </span>
        <input className='w-[247.185px] h-[38px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[62]' />
      </div>
      <button className='flex w-[45px] h-[40px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[309.11px] left-[1300px] overflow-hidden z-[63] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[64]">
          Add
        </span>
      </button>
      <div className='flex w-[200px] h-[39.725px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[313.427px] left-[870px] rotate-[0.01deg] overflow-hidden z-[57]'>
        <div className="w-[100px] grow shrink-0 basis-0 font-['Inter'] text-[16px] font-normal leading-[16px] relative text-left whitespace-nowrap z-[58]">
          <span className="font-['Inter'] text-[14px] font-normal leading-[16px] text-[#b3b3b3] relative text-left">
            Measurement
          </span>
          <span className="font-['Inter'] text-[16px] font-normal leading-[16px] text-[#1e1e1e] relative text-left">
           
          </span>
        </div>
        <input className='w-[247.185px] h-[39.725px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[59]' />
      </div>
      <div className='flex w-[200px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[313.427px] left-[650.908px] overflow-hidden z-[54]'>
        <span className="h-[16px] grow shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[55]">
          Ingredient
        </span>
        <input className='w-[292.496px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[56]' />
      </div>
      <div className='flex w-[650px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[543.101px] left-[653.998px] overflow-hidden z-20'>
        <span className="flex w-[528px] h-[16px] justify-start items-start shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[21]">
          Add tags, separated by commas
        </span>
        <input className='w-[816.724px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[22]' />
      </div>
      <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[550.872px] left-[407.847px] text-left whitespace-nowrap z-[5]">
        Tags:
      </span>
      <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[628.582px] left-[410.937px] text-left whitespace-nowrap z-[52]">
        Instructions:
      </span>
      <div className='flex w-[650px] h-[85.48px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[632.035px] left-[653.998px] overflow-hidden z-10'>
        <span className="h-[22px] grow shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[22px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[11]">
          Add instructions
        </span>
        <div className='w-[7.334px] h-[7.334px] shrink-0 bg-cover bg-no-repeat absolute bottom-[6.146px] right-[4.39px] z-[12]' />
        <input className='w-[816.724px] h-[85.48px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[13]' />
      </div>
      <div className='flex w-[650px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[751.189px] left-[650.908px] overflow-hidden z-[23]'>
        <span className="flex w-[528px] h-[16px] justify-start items-start shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#b3b3b3] relative text-left whitespace-nowrap z-[24]">
          2 people
        </span>
        <input className='w-[816.724px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[25]' />
      </div>
      <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[751.189px] left-[404.757px] text-left whitespace-nowrap z-[53]">
        Portion Size:
      </span>
      <span className="flex h-[41.445px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[38.4px] text-[#000] absolute top-[818.537px] left-[404.757px] text-left whitespace-nowrap z-[4]">
        Difficulty Level:
      </span>
      <div className='flex w-[165.817px] h-[22.449px] flex-col items-start flex-nowrap absolute top-[828.035px] left-[702.403px] z-[32]'>
        <div className='flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[33]'>
          <div className='flex w-[16px] h-[16px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#2c2c2c] rounded-[4px] relative overflow-hidden z-[34]'>
            <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[35]'>
              <div className='w-[12.267px] h-[8.933px] bg-[length:100%_100%] bg-no-repeat relative z-[36] mt-[3.2px] mr-0 mb-0 ml-[1.867px]' />
            </div>
          </div>
          <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[37]">
            Intermediate
          </span>
        </div>
      </div>
      <div className='flex w-[128.74px] h-[22.449px] flex-col items-start flex-nowrap absolute top-[828.035px] left-[1111.281px] z-[38]'>
        <div className='flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[39]'>
          <div className='flex w-[16px] h-[16px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#2c2c2c] rounded-[4px] relative overflow-hidden z-40'>
            <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[41]'>
              <div className='w-[12.267px] h-[8.933px] bg-[length:100%_100%] bg-no-repeat relative z-[42] mt-[3.2px] mr-0 mb-0 ml-[1.867px]' />
            </div>
          </div>
          <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[43]">
            Difficult
          </span>
        </div>
      </div>
      <div className='flex w-[128.74px] h-[22.449px] flex-col items-start flex-nowrap absolute top-[828.035px] left-[911.477px] z-[44]'>
        <div className='flex gap-[12px] items-center self-stretch shrink-0 flex-nowrap relative z-[45]'>
          <div className='flex w-[16px] h-[16px] gap-[10px] justify-center items-center shrink-0 flex-nowrap bg-[#2c2c2c] rounded-[4px] relative overflow-hidden z-[46]'>
            <div className='w-[16px] h-[16px] shrink-0 relative overflow-hidden z-[47]'>
              <div className='w-[12.267px] h-[8.933px] bg-[length:100%_100%] bg-no-repeat relative z-[48] mt-[3.2px] mr-0 mb-0 ml-[1.867px]' />
            </div>
          </div>
          <span className="h-[24px] grow shrink-0 basis-auto font-['Inter'] text-[20px] font-normal leading-[24px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[49]">
            Moderate
          </span>
        </div>
      </div>
      <button className='flex w-[169.936px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[629.279px] overflow-hidden z-[75] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[76]">
          Publish
        </span>
      </button>
      <button className='flex w-[169.936px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[901.178px] overflow-hidden z-[77] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[78]">
          Draft
        </span>
      </button>
      <button className='flex w-[180px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[1173.076px] overflow-hidden z-[79] pointer'>
        <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[80]">
          Cancel
        </span>
      </button>
    </div>
  );
  }
 