"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import PageHeader from "@/components/ui/PageHeader";
import HistoryGrid from "@/components/history/HistoryGrid";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { getRecipeHistory, deleteRecipe } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";

type Generation = {
generationId: string;
recipes: Recipe[];
};

export default function HistoryPage() {

const { user, isLoaded } = useUser();

const [generations, setGenerations] = useState<Generation[]>([]);
const [loading, setLoading] = useState(true);

const handleDelete = async (id: string) => {


if (!user) return;

try {

  await deleteRecipe(id, user.id);

  setGenerations((prev) =>
    prev
      .map((gen) => ({
        ...gen,
        recipes: gen.recipes.filter((recipe) => recipe.id !== id)
      }))
      .filter((gen) => gen.recipes.length > 0)
  );

} catch (error) {
  console.error("Failed to delete recipe:", error);
}


};

useEffect(() => {

if (!isLoaded || !user) return;

const fetchHistory = async () => {

  try {

    const data = await getRecipeHistory(user.id);
    setGenerations(data);

  } catch (error) {
    console.error("Failed to fetch recipe history:", error);
  } finally {
    setLoading(false);
  }

};

fetchHistory();


}, [user, isLoaded]);

if (loading) {


return (

  <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">

    <AnimatedBackground />

    <p className="relative text-gray-500 text-lg animate-pulse">
      Loading recipe history...
    </p>

  </div>

);

}

return (


<div className="relative bg-gray-50 min-h-screen overflow-hidden">

  <AnimatedBackground />

  <main className="relative max-w-6xl mx-auto px-6 py-12 space-y-12">

    <PageHeader
      title="Recipe History"
      subtitle="View recipes you generated previously"
    />

    {generations.length === 0 && (

      <div className="relative bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-14 text-center text-gray-500 shadow-sm transition hover:shadow-lg">

        <div className="text-5xl mb-4 animate-bounce">
          📜
        </div>

        <p className="font-semibold text-gray-800 text-lg">
          No recipe history yet
        </p>

        <p className="text-sm text-gray-500 mt-2">
          Recipes you generate will appear here.
        </p>

      </div>

    )}

    {generations.map((generation, index) => (

      <div
        key={generation.generationId}
        className="group relative overflow-hidden bg-white/90 backdrop-blur border border-gray-200 rounded-2xl p-6 shadow-sm space-y-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-emerald-400/10 via-green-400/10 to-lime-400/10 rounded-2xl"></div>

        <h2 className="relative text-lg font-semibold text-gray-800 flex items-center gap-2">

          <span className="px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-700">
            Generation {generations.length - index}
          </span>

        </h2>

        <div className="relative">

          <HistoryGrid
            recipes={generation.recipes}
            onDelete={handleDelete}
          />

        </div>

        {/* hover energy line */}

        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-green-500 opacity-0 group-hover:opacity-100 transition"></div>

      </div>

    ))}

  </main>

</div>


);

}
