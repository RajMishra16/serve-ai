"use client";

import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { generateRecipe } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGenerateRecipes = async () => {
  try {
    setLoading(true);

    const data = await generateRecipe();

    setRecipes(data);
  } catch (error) {
    console.error("Failed to generate recipes:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="p-6 space-y-8">

      <PageHeader
        title="Recipes"
        subtitle="Generate recipes from your pantry ingredients"
      />

      {/* Generate Button */}
      <button
        onClick={handleGenerateRecipes}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Recipes"}
      </button>

      {/* Recipes Grid */}
      {recipes.length > 0 && (
        <RecipeGrid recipes={recipes} />
      )}

    </div>
  );
}