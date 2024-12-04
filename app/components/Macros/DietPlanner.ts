import OpenAI from 'openai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env.local' });

interface DietRecommendation {
  calories: number;
  protein: number;
  fat: number;
  carbohydrates: number;
  fiber: number;
}

interface UserDetails {
  height: { feet: number | null; inches: number | null };
  weight: { value: number | null; unit: string | null };
  age: number | null;
  healthConditions: string[] | null;
}

export default async function DietPlanner(
  userDetails: UserDetails
): Promise<DietRecommendation | null> {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OpenAI API key is missing");
  }

  const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  const { height, weight, age, healthConditions } = userDetails;

  const heightString =
    height.feet !== null && height.inches !== null
      ? `${height.feet} feet ${height.inches} inches`
      : "Height not provided";
  const weightString =
    weight.value !== null && weight.unit !== null
      ? `${weight.value} ${weight.unit}`
      : "Weight not provided";
  const ageString = age !== null ? `${age} years` : "Age not provided";
  const healthConditionsString =
    healthConditions && healthConditions.length > 0
      ? healthConditions.join(", ")
      : "None";

  const prompt = `
  You are a dietitian. Based on the following user details, recommend daily dietary intake for calories, protein (in grams), fat (in grams), carbohydrates (in grams), and fiber (in grams). Ensure recommendations align with standard dietary guidelines and account for health conditions.

  User Details:
  - Height: ${heightString}
  - Weight: ${weightString}
  - Age: ${ageString}
  - Health Conditions: ${healthConditionsString}

  Provide your recommendations in JSON format:
  {
    "calories": number,
    "protein": number,
    "fat": number,
    "carbohydrates": number,
    "fiber": number
  }
  `;

  console.log("Generated Prompt:", prompt);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No content received from OpenAI API");
    }

    console.log("OpenAI Response Content:", content);

    let recommendations: DietRecommendation;
    try {
      recommendations = JSON.parse(content);
    } catch (parseError) {
      throw new Error(`Failed to parse JSON response: ${content}`);
    }

    console.log("Diet Recommendations:", recommendations);
    return recommendations;
  } catch (error) {
    console.error("Error generating dietary recommendations:", error);
    return null;
  }
}
