import { generateText } from "@/lib/ai"
import { Recipe } from "@/types/recipe"

export async function generateRecipesAI(
  ingredients: string[]
): Promise<Recipe[]> {

  const prompt = `
You are a professional chef and recipe developer.

Using the following pantry ingredients as the MAIN ingredients:

${ingredients.join(", ")}

Generate 3 realistic home-style recipes that people would actually cook.

Important rules:

- Use the pantry ingredients as primary ingredients
- You may add common kitchen staples if needed (salt, pepper, oil, butter, garlic, flour, sugar, spices)
- Avoid strange or unrealistic combinations
- Recipes should feel like real cookbook recipes

Each recipe must include:

- id (unique string)
- title
- ingredients (array of ingredients used)
- cookTime (minutes)
- difficulty (easy | medium | hard)
- steps (detailed cooking instructions)

Cooking step rules:

- Each recipe must contain 5–8 steps
- Steps should be clear and realistic
- Mention cooking techniques (saute, boil, fry, bake, simmer, whisk)
- Mention approximate times when relevant
- Steps should feel like a real recipe from a cooking website

Return ONLY valid JSON in this exact format:

[
  {
    "id": "recipe-1",
    "title": "Recipe Name",
    "ingredients": ["ingredient1","ingredient2"],
    "steps": [
      "Step 1 description",
      "Step 2 description"
    ],
    "cookTime": 20,
    "difficulty": "easy"
  }
]
`

  const text = await generateText(prompt)

  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const jsonStart = cleaned.indexOf("[")
    const jsonEnd = cleaned.lastIndexOf("]") + 1

    const jsonString = cleaned.slice(jsonStart, jsonEnd)

    const recipes: Recipe[] = JSON.parse(jsonString)

    return recipes

  } catch (error) {
    console.error("Failed to parse AI recipe response:", text)
    throw new Error("Invalid AI recipe response")
  }
}

export async function detectIngredientsAI(
  imageBase64: string
): Promise<string[]> {

  const prompt = `
Analyze this image of food ingredients.

Return ONLY a JSON array of ingredient names.

Example:
["tomato","onion","egg","milk"]

Rules:
- Only ingredient names
- Lowercase
- No explanations
- No extra text
`

  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY missing")
  }

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: prompt },
              {
                type: "image_url",
                image_url: {
                  url: imageBase64
                }
              }
            ]
          }
        ]
      })
    }
  )

  const data = await response.json()

  if (!data.choices || !data.choices.length) {
    console.error("OpenRouter error:", data)
    throw new Error("AI scan failed")
  }

  const text = data.choices[0].message.content

  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    const jsonStart = cleaned.indexOf("[")
    const jsonEnd = cleaned.lastIndexOf("]") + 1

    const jsonString = cleaned.slice(jsonStart, jsonEnd)

    const ingredients: string[] = JSON.parse(jsonString)

    // normalize ingredient names
    const normalized = ingredients.map(i =>
      i.toLowerCase().trim()
    )

    // remove duplicates
    const unique = [...new Set(normalized)]

    return unique

  } catch (error) {
    console.error("Failed to parse ingredient scan:", text)
    throw new Error("Invalid ingredient scan response")
  }
}