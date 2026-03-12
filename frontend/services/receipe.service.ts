import api from "@/lib/api"
import { Recipe } from "@/types/Recipe"
import { LibraryRecipe } from "@/types/LibraryRecipe"


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



// Get single generated recipe by ID
export const getRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/api/recipes/${id}`)
  return response.data
}


// Get previously generated recipes (history)
export const getRecipeHistory = async (): Promise<Recipe[]> => {
  const response = await api.get("/api/recipes/history")
  return response.data
}


// Get predefined recipe library
export const getRecipeLibrary = async (): Promise<LibraryRecipe[]> => {
  const response = await api.get("/api/library")
  return response.data
}


// Get library recipe detail
export const getLibraryRecipeById = async (id: string): Promise<Recipe> => {
  const response = await api.get(`/api/library/${id}`)
  return response.data
}

export const generateRecipe = async () => {
  const response = await api.post("/api/recipes/generate")

  return response.data
}