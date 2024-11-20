import OpenAI from 'openai';
import dotenv from 'dotenv';
require('dotenv').config({ path: '../../.env.local'});

export default async function NutritionAPI(ingredients: String[]) {

  dotenv.config();

  const openai = new OpenAI({
    //apiKey: '(IF process.env.OPENAI_API_KEY NOT WORKING, GRAB FROM .env.local FILE AND PASTE HERE, COMMENT SECOND APIKEY INITIALIZATION AND REMOVE SLAHSES FOR DANGEROUSLYALLOWBROWSER)',
    //dangerouslyAllowBrowser: true,
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
  });

  const listOfIngredients = ingredients.join(", ");
  const prompt = 'Could you please list out the nutritional facts for a dish containing ' + listOfIngredients + '? After that, please format your response so that you have the nutritional component followed by a colon followed by a space then the value followed by a comma then space followed by the next nutritional component that follows the format as I mentioned previously. For example, it would be something like Calories: 78, Total Fat: 5g, Saturated Fat: 2g, etc with the rest of the nutritional components.';
  console.log(prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: 'user', content: prompt}
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    // Parses nutrition facts from the text response
    const nutritionFactsText = response.choices[0].message.content;
    console.log("nutrition facts text: " + nutritionFactsText);
    return nutritionFactsText;
  } catch (error) {
    console.error('Error fetching nutrition facts:', error);
    return null;
  }
};