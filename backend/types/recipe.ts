export interface Recipe {
  id: string;
  title: string;
  description: string;
  cuisine: string;
  prepTime: number;
  cookTime: number;
  instructions: string[];
  missingIngredients: string[];
  matchPercentage: number;
}