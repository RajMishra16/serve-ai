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
        model: "deepseek/deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    }
  )

  if (!response.ok) {

    const text = await response.text()

    console.error("OPENROUTER API ERROR:")
    console.error(text)

    throw new Error("AI request failed")
  }

  const data = await response.json()

  if (!data.choices || !data.choices.length) {

    console.error("INVALID AI RESPONSE:")
    console.error(data)

    throw new Error("Invalid AI response")
  }

  const content = data.choices[0]?.message?.content

  if (!content) {
    throw new Error("AI returned empty response")
  }

  return content
}