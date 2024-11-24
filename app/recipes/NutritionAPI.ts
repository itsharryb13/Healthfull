import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env.local' });

interface Ingredients {
  name: string;
  quantity: number;
  measurement: string;
  calories: number;
  fat: number;
  sodium: number;
  fiber: number;
}

export default async function NutritionAPI(ingredients: Ingredients) {
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

  // Construct the prompt
  const prompt = `
    Please calculate the nutritional facts based on the following ingredient details make the decision based on data available in reliable database:
    Name: ${ingredients.name},
    Quantity: ${ingredients.quantity} ${ingredients.measurement},
    Calories: ${ingredients.calories},
    Fat: ${ingredients.fat},
    Sodium: ${ingredients.sodium},
    Fiber: ${ingredients.fiber}.
    Return the result as a JSON map containing "calories", "fat", "sodium", and "fiber" as numbers and do not include any null values.
  `;

  console.log('Generated Prompt:', prompt);

  try {
    // Send request to OpenAI API
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.8,
      max_tokens: 1000,
    });

    // Extract content
    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI API");
    }

    // Parse response content into JSON
    let nutritionFacts;
    try {
      nutritionFacts = JSON.parse(content);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${content}`);
    }

    console.log("Parsed Nutrition Facts:", nutritionFacts);
    return nutritionFacts;
  } catch (error) {
    console.error('Error fetching nutrition facts:', error);
    return null;
  }
}
