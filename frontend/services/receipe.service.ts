import api from "@/lib/api"
import { Recipe } from "@/types/Recipe"
import { LibraryRecipe } from "@/types/LibraryRecipe"

interface ApiResponse<T> {
  success: boolean
  data: T
}

const USER_ID = "test-user"


// Generate AI recipes
export const generateRecipes = async (): Promise<Recipe[]> => {

  const response = await api.post("/recipes/generate", {
    userId: USER_ID
  })

  const result = response.data?.data ?? []

  // If backend returns generation batch
  if (Array.isArray(result) && result.length && result[0]?.recipes) {
    return result[0].recipes
  }

  return result
}



// Get previously generated recipes (history)
export const getRecipeHistory = async () => {

  const response = await api.get("/recipes/history", {
    params: { userId: USER_ID }
  })

  return response.data?.data ?? []
}


// Get single generated recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe> => {

  const response = await api.get(`/recipes/${id}`, {
    params: { userId: USER_ID }
  })

  const recipe = response.data?.data ?? response.data

  return recipe as Recipe
}


// Get predefined recipe library
export const getRecipeLibrary = async (): Promise<LibraryRecipe[]> => {
  const response = await api.get<ApiResponse<LibraryRecipe[]>>("/library")

  return response.data?.data ?? []
}


// Get library recipe detail
export const getLibraryRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get<ApiResponse<Recipe>>(`/library/${id}`)

  return response.data?.data
}
// Delete recipe from history
export const deleteRecipe = async (id: string) => {
  const response = await api.delete(`/recipes/${id}`, {
    params: { userId: USER_ID }
  })

  return response.data
}