import api from "@/lib/api"
import { Recipe } from "@/types/Recipe"
import { LibraryRecipe } from "@/types/LibraryRecipe"

export type Generation = {
  generationId: string
  recipes: Recipe[]
}

interface ApiResponse<T> {
  success: boolean
  data: T
}


// Generate AI recipes
export const generateRecipes = async (userId?: string): Promise<Recipe[]> => {

  if (!userId) {
    console.warn("generateRecipes called without userId")
    return []
  }

  try {

    const response = await api.post("/api/recipes/generate", {
      userId
    })

    const result = response.data?.data ?? []

    if (Array.isArray(result) && result.length && result[0]?.recipes) {
      return result[0].recipes
    }

    return result

  } catch (error: any) {

    console.error(
      "Failed to generate recipes:",
      error?.response?.data || error.message
    )

    return []

  }

}


// Get previously generated recipes (history)
export const getRecipeHistory = async (
  userId?: string
): Promise<Generation[]> => {

  if (!userId) {
    console.warn("getRecipeHistory called without userId")
    return []
  }

  try {

    const response = await api.get<ApiResponse<Generation[]>>(
      "/api/recipes/history",
      {
        params: { userId }
      }
    )

    return response.data?.data ?? []

  } catch (error) {

    console.error("Failed to fetch recipe history:", error)
    return []

  }

}


// Get single generated recipe by ID
export const getRecipeById = async (
  id: string,
  userId?: string
): Promise<Recipe | null> => {

  if (!userId) {
    console.warn("getRecipeById called without userId")
    return null
  }

  try {

    const response = await api.get(`/api/recipes/${id}`, {
      params: { userId }
    })

    const recipe = response.data?.data ?? response.data

    return recipe as Recipe

  } catch (error) {

    console.error("Failed to fetch recipe:", error)
    return null

  }

}


// Get predefined recipe library
export const getRecipeLibrary = async (): Promise<LibraryRecipe[]> => {

  try {

    const response = await api.get<ApiResponse<LibraryRecipe[]>>("/api/library")

    return response.data?.data ?? []

  } catch (error: any) {

    console.error(
      "Library fetch error:",
      error?.response?.data || error?.message || error
    )

    return []

  }

}


// Get library recipe detail
export const getLibraryRecipeById = async (id: string): Promise<Recipe | null> => {

  try {

    const response = await api.get<ApiResponse<Recipe>>(`/api/library/${id}`)

    return response.data?.data ?? null

  } catch (error) {

    console.error("Failed to fetch library recipe:", error)
    return null

  }

}


// Delete recipe from history
export const deleteRecipe = async (
  id: string,
  userId?: string
) => {

  if (!userId) {
    console.warn("deleteRecipe called without userId")
    return
  }

  try {

    const response = await api.delete(`/api/recipes/${id}`, {
      params: { userId }
    })

    return response.data

  } catch (error) {

    console.error("Failed to delete recipe:", error)
    throw error

  }

}