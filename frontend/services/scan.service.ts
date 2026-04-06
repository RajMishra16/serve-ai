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

  try {

    // ✅ FIX: add /api
    const response = await api.post<ScanResponse>("/api/scan", {
      imageBase64,
      userId
    })

    if (!response.data.success) {
      throw new Error("Scan failed")
    }

    const ingredients = response.data.data || []

    const formatted: ScanIngredient[] = ingredients.map((item) => ({
      name: item
    }))

    // optional: keep or remove (backend already saves)
    for (const ingredient of formatted) {
      try {
        await api.post("/api/pantry", {
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

  } catch (error: any) {

    console.error(
      "SCAN SERVICE ERROR:",
      error?.response?.data || error.message
    )

    throw error
  }
}