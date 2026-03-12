"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import HistoryGrid from "@/components/history/HistoryGrid";
import { getRecipeHistory } from "@/services/receipe.service";
import { Recipe } from "@/types/Recipe";

export default function HistoryPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getRecipeHistory();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipe history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 space-y-8">

      <PageHeader
        title="Recipe History"
        subtitle="View recipes you generated previously"
      />

      <HistoryGrid recipes={recipes} />

    </div>
  );
}