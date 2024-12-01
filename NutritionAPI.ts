import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env.local' });

export default async function NutritionAPI(ingredients: String[]) {
  // Ensure API key is available
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing");
  }

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true, // Consider removing for security in non-browser environments
  });

  const listOfIngredients = ingredients.join(", ");
  const prompt = `Could you please list out the nutritional facts for a dish containing ' + listOfIngredients + '?
  Please write your response so it is an array.
  Please include calories, total fat, saturated fat, cholesterol, sodium, carbohydrates, fiber, sugar, and protein.
  Please do not add any other text, information, or these [], but you must include these {}.
  For example, your response should look something like this:
  {
  "calories": "500",
  "totalFat": "20g",
  "saturatedFat": "5g",
  "cholesterol": "50mg",
  "sodium": "800mg",
  "carbohydrates": "60g",
  "fiber": "10g",
  "sugar": "15g",
  "protein": "25g"
  }`;
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
    console.log(nutritionFactsText);
    return nutritionFactsText;
  } catch (error) {
    console.error('Error fetching nutrition facts:', error);
    return null;
  }
};

