"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryGrid from "@/components/library/LibraryGrid";
import LibraryFilters from "@/components/library/LibraryFilters";
import { getRecipeLibrary } from "@/services/receipe.service";
import { LibraryRecipe } from "@/types/LibraryRecipe";

export default function LibraryPage() {
  const [recipes, setRecipes] = useState<LibraryRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<LibraryRecipe[]>([]);

  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [diet, setDiet] = useState("");

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await getRecipeLibrary();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error("Failed to fetch library recipes:", error);
      }
    };

    fetchLibrary();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    if (country) {
      filtered = filtered.filter((r) => r.country === country);
    }

    if (type) {
      filtered = filtered.filter((r) => r.type === type);
    }

    if (diet) {
      filtered = filtered.filter((r) => r.diet === diet);
    }

    setFilteredRecipes(filtered);
  }, [country, type, diet, recipes]);

  return (
    <div className="p-6 space-y-8">

      <PageHeader
        title="Recipe Library"
        subtitle="Browse predefined recipes from around the world"
      />

      <LibraryFilters
        country={country}
        type={type}
        diet={diet}
        onCountryChange={setCountry}
        onTypeChange={setType}
        onDietChange={setDiet}
      />

      <LibraryGrid recipes={filteredRecipes} />

    </div>
  );
}