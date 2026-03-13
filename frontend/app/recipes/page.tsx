"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/ui/PageHeader";
import RecipeGrid from "@/components/recipes/RecipeGrid";
import { generateRecipes, getRecipeHistory } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";
import { Sparkles } from "lucide-react";
import SkeletonCard from "@/components/ui/SkeletonCard"

export default function RecipesPage() {

  const { user, isLoaded } = useUser();

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  // Load recipe history when page loads
  useEffect(() => {

    if (!isLoaded || !user) return;

    const loadHistory = async () => {

      try {

        const history = await getRecipeHistory(user.id)

        if (Array.isArray(history) && history.length > 0) {

          const latestGeneration = history[0]

          if (latestGeneration.recipes) {
            setRecipes(latestGeneration.recipes)
          }

        }

      } catch (error) {
        console.error("Failed to load recipe history:", error);
      }

    };

    loadHistory();

  }, [user, isLoaded]);


  const handleGenerateRecipes = async () => {

    if (!user) return;

    try {

      setLoading(true)

      const data = await generateRecipes(user.id)

      setRecipes(data)

    } catch (error) {

      console.error("Failed to generate recipes:", error)

    } finally {

      setLoading(false)

    }

  }

  return (

    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Recipes"
          subtitle="Generate recipes from your pantry ingredients"
        />

        {/* Generate Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col items-center gap-4">

          <Sparkles className="w-6 h-6 text-emerald-600" />

          <p className="text-gray-600 text-sm text-center">
            Use your pantry ingredients to generate AI-powered recipes.
          </p>

          <button
            onClick={handleGenerateRecipes}
            className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            {loading ? "Generating Recipes..." : "Generate Recipes"}
          </button>

        </div>

        {/* Recipes Grid */}
        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>

        ) : recipes.length > 0 ? (

          <RecipeGrid recipes={recipes} />

        ) : (

          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">

            <div className="text-4xl mb-3">
              🍳
            </div>

            <p className="font-medium text-gray-700">
              No recipes yet
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Generate recipes using ingredients from your pantry.
            </p>

          </div>

        )}

      </div>

    </div>

  );
}