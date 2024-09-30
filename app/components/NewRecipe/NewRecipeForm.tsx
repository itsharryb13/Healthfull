"use client"
import React, { useState } from 'react';


export default function NewRecipeForm() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [quantity, setQuantity] = useState('');
  const [measurement, setMeasurement] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState('');
  const [portionSize, setPortionSize] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);


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
   return isValid;
 };


 const handleSubmit = (e: React.FormEvent) => {
   e.preventDefault();


   if (!validateForm()) {
     let alertMessages = [];
     if (errors.recipeName) alertMessages.push(errors.recipeName);
     if (errors.recipeDescription) alertMessages.push(errors.recipeDescription);
     if (errors.cookingTime) alertMessages.push(errors.cookingTime);
     if (errors.instructions) alertMessages.push(errors.instructions);
     if (errors.ingredients) alertMessages.push(errors.ingredients);
     if (errors.portionSize) alertMessages.push(errors.portionSize);


     alert(alertMessages.join("\n"));
   } else {
     console.log({
       recipeName,
       recipeDescription,
       hours,
       minutes,
       ingredient,
       quantity,
       measurement,
       instructions,
       portionSize,
       difficulty,
       tags,
       ingredientsList
     });
     alert('Form submitted successfully!');
   }
 };


 const handleAddIngredient = () => {
   if (!ingredient) {
     alert("Please fill ingredient field before adding.");
     return;
   }


 let newIngredient = '';
 if (!measurement && !quantity) {
   newIngredient = `${ingredient}`; 
 } else if (!measurement) {
   newIngredient = `${ingredient}, ${quantity}`; 
 } else if (!quantity) {
   newIngredient = `${ingredient}, ${measurement}`; 
 } else {
   newIngredient = `${ingredient}, ${measurement}, ${quantity}`; 
 }
   setIngredientsList([...ingredientsList, newIngredient]);
   setIngredient('');
   setMeasurement('');
   setQuantity('');
 };


 const handleCancel = () => {
   setIngredient('');
   setQuantity('');
   setMeasurement('');
   setRecipeName('');
   setRecipeDescription('');
   setHours('');
   setMinutes('');
   setTags('');
   setPortionSize('');
   setInstructions('');
   setDifficulty('Intermediate');
   setIngredientsList([]);
 
 };


 const handleDraft = () => {
   const allFieldsEmpty = !recipeName && !recipeDescription && !hours && !minutes && !instructions && ingredientsList.length === 0;


 if (allFieldsEmpty) {
   alert('Nothing to save, please fill out at least one field.');
   return;
 } else {
   alert('Draft saved successfully!')
 }


 }




   return (
     <form onSubmit = {handleSubmit} className='flex main-container w-[1400px] h-[1100px] justify-center relative mx-auto my-0'>
   
   
     <div className='w-[1370px] h-[1000px] bg-[#e5dece] rounded-[50px] absolute top-10 left-3' />
  
   
     <div className='flex w-[650px] h-[41.445px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[66.485px] left-[648.908px] overflow-hidden z-[1]'>
       <input
       className='w-[819.814px] h-[41.445px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[3]'
       placeholder = "Give your recipe a name"
       value = {recipeName}
       onChange = {(e) => setRecipeName(e.target.value)}      
       />
     </div>
   
     <div className='flex w-[193.624px] h-[26.767px] flex-col gap-[8px] items-start flex-nowrap absolute top-[74.256px] left-[410.937px] z-30'>
       <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[31]">
         Recipe Title:
       </span>
     </div>
   
     <div className='flex w-[650px] h-[85.48px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[141.604px] left-[648.758px] overflow-hidden z-[6]'>
       <input
       className='w-[821.874px] h-[85.48px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[9]'
       placeholder = "Introduce your recipe"
       value = {recipeDescription}
       onChange = {(e) => setRecipeDescription(e.target.value)}     
       />
     </div>
  
     <div className='flex w-[187.445px] h-[31.947px] flex-col gap-[8px] items-start flex-nowrap absolute top-[141.604px] left-[410.937px] z-[26]'>
       <span className="h-[38px] self-stretch shrink-0 basis-auto font-['Inter'] text-[25px] font-normal leading-[38px] text-[#1e1e1e] relative text-left whitespace-nowrap z-[27]">
         Description:
       </span>
     </div>
    
     <div className='flex w-[247.18px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[238.308px] left-[648.908px] overflow-hidden z-[14]'>
      <input
      type = 'number'
      className='w-[247.18px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[16]'
      placeholder = "Hours"
      value = {hours}
      onChange = {(e) => setHours(e.target.value)}
      />
     </div>
   
     <div className='flex w-[247.18px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[238.308px] left-[917.656px] overflow-hidden z-[17]'>
       <input
       type = 'number'
       className='w-[247.18px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[19]'
       placeholder = "Minutes"
       value = {minutes}
       onChange = {(e) => setMinutes(e.target.value)}
       />
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
       <input
       type = 'number'
       className='w-[247.185px] h-[38px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[62]'
       placeholder="Quantity"
       value = {quantity}
       onChange = {(e) => setQuantity(e.target.value)}  
       />
     </div>
   
     <button
       type='button' 
       onClick={handleAddIngredient}
       className='flex w-[45px] h-[40px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[309.11px] left-[1300px] overflow-hidden z-[63] pointer'>
       <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[14px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[64]">
         Add
       </span>
     </button>


      <div className='flex flex-col w-[650px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start bg-[#f5f5f5] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[380px] left-[650.908px] z-[70]'>
       <h3 className='font-["Inter"] text-[20px] font-normal mb-4'>Added Ingredients:</h3>
       <ul>
         {ingredientsList.map((item, index) => (
           <li key={index} className='font-["Inter"] text-[16px] mb-2'>
             {item}
           </li>
         ))}
       </ul>
     </div>
   
     <div className='flex w-[200px] h-[39.725px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[313.427px] left-[870px] rotate-[0.01deg] overflow-hidden z-[57]'>
       <input
       type = "number"
       className='w-[247.185px] h-[39.725px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[59]'
       placeholder = "Measurement"
       value = {measurement}
       onChange = {(e) => setMeasurement(e.target.value)}
       />
     </div>
   
     <div className='flex w-[200px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[313.427px] left-[648.908px] overflow-hidden z-[54]'>
       <input
       className='w-[292.496px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[56]'
       placeholder = "Ingredient"
       value = {ingredient}
       onChange = {(e) => setIngredient(e.target.value)}
       />
     </div>
    
     <div className='flex w-[650px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[543.101px] left-[648.998px] overflow-hidden z-20'>
       <input
       className='w-[816.724px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[22]'
       placeholder = "Add tags, separated by a comma"
       value = {tags}
       onChange = {(e) => setTags(e.target.value)}
       />
     </div>
   
     <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[550.872px] left-[407.847px] text-left whitespace-nowrap z-[5]">
       Tags:
     </span>
   
     <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[628.582px] left-[410.937px] text-left whitespace-nowrap z-[52]">
       Instructions:
     </span>
 
    <div className='flex w-[650px] h-[85.48px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-start flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[632.035px] left-[648.998px] overflow-hidden z-10'>
       <input
       className='w-[816.724px] h-[85.48px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[13]'
       placeholder = "Add instructions"
       value = {instructions}
       onChange = {(e) => setInstructions(e.target.value)}     
       />
     </div>
   
     <div className='flex w-[650px] h-[40.581px] pt-[12px] pr-[16px] pb-[12px] pl-[16px] items-center flex-nowrap bg-[#fff] rounded-[8px] border-solid border border-[#d9d9d9] absolute top-[751.189px] left-[648.908px] overflow-hidden z-[23]'>
       <input
       type = 'number'
       className='w-[816.724px] h-[40.581px] shrink-0 bg-transparent border-none absolute top-0 left-0 z-[25]'
       placeholder= "Number of people this recipe can serve"
       value = {portionSize}
       onChange = {(e) => setPortionSize(e.target.value)}
       />
     </div>
  
     <span className="flex h-[32.811px] justify-start items-start font-['Inter'] text-[25px] font-normal leading-[32.811px] text-[#1e1e1e] absolute top-[751.189px] left-[404.757px] text-left whitespace-nowrap z-[53]">
       Portion Size:
     </span>
  
     <div className='absolute top-[828.035px] left-[405px] flex items-center'>
       <span className='font-["Inter"] text-[25px] font-normal leading-[32px] text-[#1e1e1e] mr-[20px]'>
         Difficulty Level:
       </span>
       <select
         className='p-2 border rounded border-gray-400 w-[650px] h-[41.445px] ml-[44px]'
         value={difficulty}
         onChange={(e) => setDifficulty(e.target.value)}
       >
         <option value="Intermediate">Intermediate</option>
         <option value="Moderate">Moderate</option>
         <option value="Difficult">Difficult</option>
       </select>
     </div>
   
     <button
       type='submit'
       className='flex w-[169.936px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[629.279px] overflow-hidden z-[75] pointer'>
       <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[76]">
         Publish
       </span>
     </button>
   
     <button
       type='button'
       onClick={handleDraft}
       className='flex w-[169.936px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[901.178px] overflow-hidden z-[77] pointer'>
       <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[78]">
         Draft
       </span>
     </button>
    
     <button
       type='button'
       onClick={handleCancel}
       className='flex w-[180px] h-[43.172px] pt-[12px] pr-[12px] pb-[12px] pl-[12px] gap-[8px] justify-center items-center flex-nowrap bg-[#2c2c2c] rounded-[8px] border-solid border border-[#2c2c2c] absolute top-[905.744px] left-[1173.076px] overflow-hidden z-[79] pointer'>
       <span className="h-[16px] shrink-0 basis-auto font-['Inter'] text-[16px] font-normal leading-[16px] text-[#f5f5f5] relative text-left whitespace-nowrap z-[80]">
         Clear
       </span>
     </button>
   </form>
 );
 }
