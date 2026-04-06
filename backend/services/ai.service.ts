import { generateText } from "@/lib/ai"
import { Recipe } from "@/types/recipe"

export async function generateRecipesAI(
  ingredients: string[]
): Promise<Recipe[]> {

  const prompt = `
You are a professional chef and recipe writer.

Using these ingredients:
${ingredients.join(", ")}

Generate 3 HIGH-QUALITY home-style recipes.

STRICT RULES:

- Each recipe MUST contain 6 to 8 steps
- Each step MUST be detailed (at least 12–18 words)
- Include cooking techniques (fry, saute, simmer, bake, whisk)
- Mention heat level, time, and texture when relevant
- Make recipes realistic like a cooking website

Ingredients rules:
- Use given ingredients as primary
- You may add basic kitchen items (salt, oil, spices)

Return ONLY valid JSON.

FORMAT:
[
  {
    "id": "recipe-1",
    "title": "Recipe Name",
    "ingredients": ["ingredient1","ingredient2"],
    "steps": [
      "Step 1 detailed description...",
      "Step 2 detailed description...",
      "Step 3 detailed description...",
      "Step 4 detailed description...",
      "Step 5 detailed description...",
      "Step 6 detailed description..."
    ],
    "cookTime": 20,
    "difficulty": "easy"
  }
]

NO explanation
ONLY JSON
`

  const text = await generateText(prompt)

  try {

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\n/g, " ")
      .trim()

    const jsonStart = cleaned.indexOf("[")
    const jsonEnd = cleaned.lastIndexOf("]") + 1

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON found")
    }

    const jsonString = cleaned.slice(jsonStart, jsonEnd)

    const recipes: Recipe[] = JSON.parse(jsonString)

    return recipes

  } catch (error) {

    console.error("AI RAW RESPONSE:", text)

    // 🔥 STRONG FALLBACK (6 steps guaranteed)
    return [
      {
        id: "fallback-1",
        title: "Quick Home Style Mix",
        ingredients,
        steps: [
          "Wash and chop all ingredients into small uniform pieces for even cooking",
          "Heat oil in a pan over medium flame until it is slightly shimmering",
          "Add chopped ingredients and sauté gently while stirring continuously",
          "Cook for 8 to 10 minutes until ingredients soften and release aroma",
          "Add salt, spices, and mix thoroughly to coat all ingredients evenly",
          "Continue cooking for 2–3 minutes and serve hot while fresh"
        ],
        cookTime: 15,
        difficulty: "easy"
      },
      {
        id: "fallback-2",
        title: "Simple Stir Fry",
        ingredients,
        steps: [
          "Heat oil in a wide pan over medium heat until hot but not smoking",
          "Add all ingredients and stir fry quickly to retain texture and flavor",
          "Cook while stirring continuously to prevent sticking or burning",
          "Add seasoning like salt and spices evenly across the mixture",
          "Continue cooking for 8–10 minutes until everything is well cooked",
          "Turn off heat and serve immediately while hot and fresh"
        ],
        cookTime: 15,
        difficulty: "easy"
      }
    ]
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

  const formattedImage = imageBase64.startsWith("data:image")
    ? imageBase64
    : `data:image/jpeg;base64,${imageBase64}`

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
                  url: formattedImage
                }
              }
            ]
          }
        ]
      })
    }
  )

  const data = await response.json()

  if (!response.ok) {
    console.error("OpenRouter HTTP Error:", data)
    throw new Error("OpenRouter request failed")
  }

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

    const normalized = ingredients.map(i =>
      i.toLowerCase().trim()
    )

    return [...new Set(normalized)]

  } catch (error) {
    console.error("Failed to parse ingredient scan:", text)
    throw new Error("Invalid ingredient scan response")
  }
}