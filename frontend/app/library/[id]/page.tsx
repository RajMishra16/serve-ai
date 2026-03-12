"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import RecipeHero from "@/components/recipes/RecipeHero";
import RecipeMeta from "@/components/recipes/RecipeMeta";
import RecipeIngredients from "@/components/recipes/RecipeIngredients";
import RecipeSteps from "@/components/recipes/RecipeSteps";
import { getLibraryRecipeById } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";

export default function LibraryRecipeDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getLibraryRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error("Failed to fetch library recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div className="p-6">Loading recipe...</div>;
  }

  return (
    <div className="p-6 space-y-8">

      {/* Image + Title */}
      <RecipeHero recipe={recipe} />

      {/* Cook time + difficulty */}
      <RecipeMeta recipe={recipe} />

      {/* Ingredients */}
      <RecipeIngredients recipe={recipe} />

      {/* Steps */}
      <RecipeSteps recipe={recipe} />

    </div>
  );
}