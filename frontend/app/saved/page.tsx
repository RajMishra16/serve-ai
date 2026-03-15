"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/ui/PageHeader";
import LibraryFilters from "@/components/library/LibraryFilters";
import LibraryCategoryRow from "@/components/library/LibraryCategoryRow";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { getRecipeLibrary } from "@/services/receipe.service";
import { LibraryRecipe } from "@/types/LibraryRecipe";

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

    if (search) {
      filtered = filtered.filter((r) =>
        r.title.toLowerCase().includes(search.toLowerCase())
      );
    }

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

  }, [search, country, type, diet, recipes]);


  return (

    <div className="relative min-h-screen bg-gray-50 overflow-hidden">

      <AnimatedBackground />

      <div className="relative max-w-7xl mx-auto px-6 py-10 space-y-10">

        <PageHeader
          title="Recipe Library"
          subtitle="Browse predefined recipes from around the world"
        />

        {/* Search */}

        <div className="flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full md:w-96
            border border-gray-200
            rounded-xl
            px-4 py-2.5
            bg-white
            shadow-sm
            focus:outline-none
            focus:ring-2
            focus:ring-emerald-500
            "
          />

        </div>


        {/* Filters */}

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">

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

        </div>


        {/* Library Categories */}

        <div className="space-y-10">

          {countries.map((countryName) => {

            const recipesForCountry = filteredRecipes.filter(
              (r) => r.country === countryName
            );

            if (recipesForCountry.length === 0) return null;

            return (
              <LibraryCategoryRow
                key={countryName}
                title={countryName}
                recipes={recipesForCountry}
              />
            );

          })}

        </div>

      </div>

    </div>

  );

}