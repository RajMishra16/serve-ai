"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/ui/PageHeader";
import RecipeMeta from "@/components/recipes/RecipeMeta";
import RecipeIngredients from "@/components/recipes/RecipeIngredients";
import RecipeSteps from "@/components/recipes/RecipeSteps";
import { getRecipeById } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";


export default function RecipeDetailPage() {

  const params = useParams();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {

    const fetchRecipe = async () => {

      try {

        const data = await getRecipeById(id);
        setRecipe(data);

      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }

    };

    fetchRecipe();

  }, [id]);

  if (!recipe) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading recipe...</p>
      </div>
    );
  }

  return (

    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Title */}
        <PageHeader title={recipe.title} />

        {/* Meta */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <RecipeMeta recipe={recipe} />
        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Ingredients */}
          <div className="lg:col-span-1">

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24">

              <h2 className="text-lg font-semibold mb-4">
                Ingredients
              </h2>

              <RecipeIngredients recipe={recipe} />

            </div>

          </div>

          {/* Steps */}
          <div className="lg:col-span-2">

            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">

              <h2 className="text-lg font-semibold mb-4">
                Cooking Steps
              </h2>

              <RecipeSteps recipe={recipe} />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}