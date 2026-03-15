"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/ui/PageHeader";
import RecipeMeta from "@/components/recipes/RecipeMeta";
import RecipeIngredients from "@/components/recipes/RecipeIngredients";
import RecipeSteps from "@/components/recipes/RecipeSteps";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { getRecipeById } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";

export default function RecipeDetailPage() {

  const params = useParams();
  const id = params.id as string;

  const { user, isLoaded } = useUser();

  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {

    if (!isLoaded || !user) return;

    const fetchRecipe = async () => {

      try {

        const data = await getRecipeById(id, user.id);

        if (data) {
          setRecipe(data);
        }

      } catch (error) {
        console.error("Failed to fetch recipe:", error);
      }

    };

    fetchRecipe();

  }, [id, user, isLoaded]);

  /* Loading Screen */

  if (!recipe) {
    return (
      <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">

        <AnimatedBackground />

        <div className="text-center relative">

          <div className="text-4xl mb-3 animate-pulse">
            🍳
          </div>

          <p className="text-gray-500 text-lg">
            Loading recipe...
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="relative bg-gray-50 min-h-screen overflow-hidden">

      <AnimatedBackground />

      <div className="relative max-w-6xl mx-auto px-6 py-10 space-y-10">

        {/* Title */}
        <PageHeader title={recipe.title} />

        {/* Meta */}
        <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden transition hover:shadow-lg duration-300">

          <div className="absolute -top-10 left-10 w-28 h-28 bg-emerald-300/20 blur-3xl rounded-full"></div>

          <div className="relative">
            <RecipeMeta recipe={recipe} />
          </div>

        </div>

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Ingredients */}
          <div className="lg:col-span-1">

            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24 overflow-hidden transition hover:shadow-lg duration-300">

              <div className="absolute -top-10 right-0 w-24 h-24 bg-emerald-200/20 blur-3xl rounded-full"></div>

              <h2 className="text-lg font-semibold mb-4 text-gray-800">
                Ingredients
              </h2>

              <RecipeIngredients recipe={recipe} />

            </div>

          </div>

          {/* Steps */}
          <div className="lg:col-span-2">

            <div className="relative bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-hidden transition hover:shadow-lg duration-300">

              <div className="absolute -top-10 left-0 w-24 h-24 bg-green-200/20 blur-3xl rounded-full"></div>

              <h2 className="text-lg font-semibold mb-4 text-gray-800">
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