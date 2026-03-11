export type Recipe = {
  id: string
  title: string
  ingredients: string[]
  steps: string[]
  cookTime: number
  difficulty: "easy" | "medium" | "hard"
}

export type RecipeResponse = {
  success: boolean
  data: Recipe[]
}

export type IngredientDetection = {
  name: string
  confidence: number
}