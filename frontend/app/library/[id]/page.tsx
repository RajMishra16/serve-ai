"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
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


return (

  <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">

    <AnimatedBackground />

    <p className="relative text-gray-500 text-lg animate-pulse">
      Loading recipe...
    </p>

  </div>

);


}

return (


<div className="relative bg-gray-50 min-h-screen overflow-hidden">

  <AnimatedBackground />

  {/* HERO */}

  <div className="max-w-6xl mx-auto px-6 pt-10 relative">

    <div className="rounded-2xl overflow-hidden shadow-lg transition hover:shadow-xl hover:-translate-y-1 duration-300">

      <RecipeHero recipe={recipe} />

    </div>

  </div>


  {/* META BAR */}

  <div className="max-w-6xl mx-auto px-6 mt-6 relative">

    <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm transition hover:shadow-lg duration-300">

      <RecipeMeta recipe={recipe} />

    </div>

  </div>


  {/* CONTENT */}

  <div className="max-w-6xl mx-auto px-6 py-10 relative">

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* INGREDIENTS */}

      <div className="lg:col-span-1">

        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm sticky top-24 transition hover:shadow-lg duration-300">

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
            Ingredients
          </h2>

          <RecipeIngredients recipe={recipe} />

        </div>

      </div>


      {/* STEPS */}

      <div className="lg:col-span-2">

        <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm transition hover:shadow-lg duration-300">

          <h2 className="text-lg font-semibold mb-4 text-gray-900">
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
