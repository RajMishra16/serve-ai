"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryGrid from "@/components/library/LibraryGrid";
import LibraryFilters from "@/components/library/LibraryFilters";
import { getRecipeLibrary } from "@/services/receipe.service";
import { LibraryRecipe } from "@/types/LibraryRecipe";
import LibraryCategoryRow from "@/components/library/LibraryCategoryRow";

export default function LibraryPage() {
  const [recipes, setRecipes] = useState<LibraryRecipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<LibraryRecipe[]>([]);

  const [country, setCountry] = useState("");
  const [type, setType] = useState("");
  const [diet, setDiet] = useState("");
  const [search, setSearch] = useState("");

  const [countries, setCountries] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [diets, setDiets] = useState<string[]>([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const data = await getRecipeLibrary();

        setRecipes(data);
        setFilteredRecipes(data);

        const uniqueCountries = Array.from(new Set(data.map((r) => r.country)));
        const uniqueTypes = Array.from(new Set(data.map((r) => r.type)));
        const uniqueDiets = Array.from(new Set(data.map((r) => r.diet)));

        setCountries(uniqueCountries);
        setTypes(uniqueTypes);
        setDiets(uniqueDiets);
      } catch (error) {
        console.error("Failed to fetch library recipes:", error);
      }
    };

    fetchLibrary();
  }, []);

  useEffect(() => {
    let filtered = recipes;

    // Search filter
    if (search) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Country filter
    if (country) {
      filtered = filtered.filter((r) => r.country === country);
    }

    // Type filter
    if (type) {
      filtered = filtered.filter((r) => r.type === type);
    }

    // Diet filter
    if (diet) {
      filtered = filtered.filter((r) => r.diet === diet);
    }

    setFilteredRecipes(filtered);
  }, [search, country, type, diet, recipes]);

  return (
    <div className="p-6 space-y-6">

      <PageHeader
        title="Recipe Library"
        subtitle="Browse predefined recipes from around the world"
      />

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 border rounded-lg px-4 py-2"
      />

      {/* Filters */}
      <LibraryFilters
        country={country}
        type={type}
        diet={diet}
        countries={countries}
        types={types}
        diets={diets}
        onCountryChange={setCountry}
        onTypeChange={setType}
        onDietChange={setDiet}
      />

      {/* Recipe Grid */}
      {countries.map((countryName) => {
  const recipesForCountry = filteredRecipes.filter(
    (r) => r.country === countryName
  );

  return (
    <LibraryCategoryRow
      key={countryName}
      title={countryName}
      recipes={recipesForCountry}
    />
  );
})}

    </div>
  );
}