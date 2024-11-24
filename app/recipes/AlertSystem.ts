import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env.local' });

interface Ingredients {
  name: string;
  quantity: number;
  measurement: string;
}

export default async function NutritionAPI(
  ingredients: string[],
  ingredientsRecipe: Ingredients[]
): Promise<string[] | null> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const prompt = `
    Compare the following lists of ingredients and find matches:
    Ingredients (list 1): ${JSON.stringify(ingredients)}
    Ingredients Recipe (list 2): ${JSON.stringify(ingredientsRecipe)}.
    Return the result as a JSON array of ingredient names that are present in both lists. For example: ["ingredient1", "ingredient2"].
  `;

  console.log("Generated Prompt:", prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI API");
    }

    console.log("OpenAI Response Content:", content);

    let similarIngredients: string[];
    try {
      if (!content.trim().startsWith("[") || !content.trim().endsWith("]")) {
        throw new Error("Response content is not a valid JSON array");
      }
      similarIngredients = JSON.parse(content);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${content}`);
    }

    console.log("Parsed Similar Ingredients:", similarIngredients);
    return similarIngredients;
  } catch (error) {
    console.error("Error comparing ingredients:", error.message);
    return null;
  }
}
