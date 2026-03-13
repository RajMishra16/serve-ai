import api from "@/lib/api"
import { ScanIngredient } from "@/types/ScanIngredient"

interface ScanResponse {
  success: boolean
  data: string[]
}

export const scanImage = async (
  imageBase64: string,
  userId: string
): Promise<ScanIngredient[]> => {

  // 1️⃣ Scan image with AI
  const response = await api.post<ScanResponse>("/scan", {
    imageBase64
  })

  const ingredients = response.data.data

  const formatted: ScanIngredient[] = ingredients.map((item) => ({
    name: item
  }))

  // 2️⃣ Save scanned ingredients to pantry
  for (const ingredient of formatted) {

    try {

      await api.post("/pantry", {
        name: ingredient.name,
        quantity: 1,
        added_via: "scan",
        confidence: null,
        userId
      })

    } catch (error) {

      console.error("Failed to add scanned ingredient:", ingredient.name)

    }

  }

  return formatted
}