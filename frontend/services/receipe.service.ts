import api from "@/lib/api"
import { Recipe } from "@/types/Recipe"
import { LibraryRecipe } from "@/types/LibraryRecipe"

const USER_ID = "test-user"

interface ApiResponse<T> {
  success: boolean
  data: T
}


// Generate AI recipes
export const generateRecipes = async (): Promise<Recipe[]> => {
  try {
    const response = await api.post("/recipes/generate", {
      userId: USER_ID
    })

    const result = response.data?.data ?? []

    // If backend returns generation batch
    if (Array.isArray(result) && result.length && result[0]?.recipes) {
      return result[0].recipes
    }

    return result
  } catch (error) {
    console.error("Failed to generate recipes:", error)
    return []
  }
}


// Get previously generated recipes (history)
export const getRecipeHistory = async () => {
  try {
    const response = await api.get("/recipes/history", {
      params: { userId: USER_ID }
    })

    return response.data?.data ?? []
  } catch (error) {
    console.error("Failed to fetch recipe history:", error)
    return []
  }
}


// Get single generated recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await api.get(`/recipes/${id}`, {
      params: { userId: USER_ID }
    })

    const recipe = response.data?.data ?? response.data

    return recipe as Recipe
  } catch (error) {
    console.error("Failed to fetch recipe:", error)
    throw error
  }
}


// Get predefined recipe library
export const getRecipeLibrary = async (): Promise<LibraryRecipe[]> => {
  try {
    const response = await api.get<ApiResponse<LibraryRecipe[]>>("/library")
    return response.data?.data ?? []
  } catch (error: any) {
    console.error("Library fetch error:", error?.response?.data || error?.message || error)
    return []
  }
}


// Get library recipe detail
export const getLibraryRecipeById = async (id: string): Promise<Recipe> => {
  try {
    const response = await api.get<ApiResponse<Recipe>>(`/library/${id}`)

    return response.data?.data
  } catch (error) {
    console.error("Failed to fetch library recipe:", error)
    throw error
  }
}


// Delete recipe from history
export const deleteRecipe = async (id: string) => {
  try {
    const response = await api.delete(`/recipes/${id}`, {
      params: { userId: USER_ID }
    })

    return response.data
  } catch (error) {
    console.error("Failed to delete recipe:", error)
    throw error
  }
}