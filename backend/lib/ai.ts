export async function generateText(prompt: string): Promise<string> {

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
        model: "openai/gpt-3.5-turbo",

        messages: [
          {
            role: "user",
            content: prompt
          }
        ],

        temperature: 0.7,

        // 🔥 FIX: limit tokens (VERY IMPORTANT)
        max_tokens: 800
      })
    }
  )

  const text = await response.text()

  let data: any

  try {
    data = JSON.parse(text)
  } catch (err) {
    console.error("INVALID JSON FROM AI:", text)
    throw new Error("AI returned invalid JSON")
  }

  if (!response.ok) {
    console.error("OPENROUTER API ERROR:", data)
    throw new Error(data?.error?.message || "AI request failed")
  }

  if (!data.choices || !data.choices.length) {
    console.error("INVALID AI RESPONSE:", data)
    throw new Error("Invalid AI response")
  }

  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error("AI returned empty response")
  }

  return content
}