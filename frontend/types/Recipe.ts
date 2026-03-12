export interface Recipe {
  id: string
  title: string
  image: string

  ingredients: string[]

  missingIngredients: string[]

  steps: string[]

  cookTime: number

  difficulty: "Easy" | "Medium" | "Hard"
}