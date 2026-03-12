"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import HistoryGrid from "@/components/history/HistoryGrid";
import { getRecipeHistory } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";
import SkeletonCard from "@/components/ui/SkeletonCard"

type Generation = {
  generationId: string;
  recipes: Recipe[];
};

export default function HistoryPage() {

  const [generations, setGenerations] = useState<Generation[]>([]);
const [loading, setLoading] = useState(true);

  const handleDelete = (id: string) => {
    setGenerations((prev) =>
      prev
        .map((gen) => ({
          ...gen,
          recipes: gen.recipes.filter((recipe) => recipe.id !== id)
        }))
        .filter((gen) => gen.recipes.length > 0)
    );
  };

  useEffect(() => {

    const fetchHistory = async () => {
  try {

    const data = await getRecipeHistory();

    setGenerations(data);

  } catch (error) {
    console.error("Failed to fetch recipe history:", error);
  } finally {
    setLoading(false);
  }
};

    fetchHistory();

  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Recipe History"
          subtitle="View recipes you generated previously"
        />

        {generations.length === 0 && (
  <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500 shadow-sm">

    <div className="text-4xl mb-3">
      📜
    </div>

    <p className="font-medium text-gray-700">
      No recipe history yet
    </p>

    <p className="text-sm text-gray-500 mt-1">
      Recipes you generate will appear here.
    </p>

  </div>
)}

        {generations.map((generation, index) => (

          <div
            key={generation.generationId}
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6"
          >

            <h2 className="text-lg font-semibold text-gray-800">
              Generation {generations.length - index}
            </h2>

            <HistoryGrid
              recipes={generation.recipes}
              onDelete={handleDelete}
            />

          </div>

        ))}

      </div>

    </div>
  );
}