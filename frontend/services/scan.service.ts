import api from "@/lib/api"
import { ScanIngredient } from "@/types/ScanIngredient"

interface ScanResponse {
  success: boolean
  data: string[]
}

export const scanImage = async (
  imageBase64: string,
  token: string
): Promise<ScanIngredient[]> => {

  try {

    // ✅ Scan API
    const response = await api.post<ScanResponse>(
      "/api/scan",
      { imageBase64 },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!response.data.success) {
      throw new Error("Scan failed")
    }

    const ingredients = response.data.data || []

    const formatted: ScanIngredient[] = ingredients.map((item) => ({
      name: item
    }))

    // ✅ Save to pantry (secure)
    for (const ingredient of formatted) {
      try {
        await api.post(
          "/api/pantry",
          {
            name: ingredient.name,
            quantity: 1,
            added_via: "scan",
            confidence: null,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
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