import api from "@/lib/api"

export interface Recipe {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
  cookTime: number
  difficulty: string
}

interface GenerateRecipeResponse {
  success: boolean
  data: Recipe[]
}

export const generateRecipes = async (): Promise<Recipe[]> => {
  const response = await api.post<GenerateRecipeResponse>("/recipes/generate", {
    userId: "test-user"
  })

  return response.data.data
}

export const getSavedRecipes = async () => {
  const response = await api.get("/recipes/saved")
  return response.data
}