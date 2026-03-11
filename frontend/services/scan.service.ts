import api from "@/lib/api"
import { ScanIngredient } from "@/types/ScanIngredient"

interface ScanResponse {
  success: boolean
  data: string[]
}

export const scanImage = async (imageBase64: string): Promise<ScanIngredient[]> => {
  const response = await api.post<ScanResponse>("/scan", {
    imageBase64
  })

  const ingredients = response.data.data

  return ingredients.map((item) => ({
    name: item
  }))
}