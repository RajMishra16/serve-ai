"use client";

import { PantryItem } from "@/types/PantryItem";
import IngredientCard from "@/components/ui/IngredientCard";
import { PackageOpen } from "lucide-react";

interface PantryGridProps {
  items: PantryItem[];
  onEdit: (item: PantryItem) => void;
  onDelete: (id: string) => void;
}

export default function PantryGrid({ items, onEdit, onDelete }: PantryGridProps) {

  if (items.length === 0) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-10 text-center text-gray-500 shadow-sm">

      <div className="text-4xl mb-3">
        🥫
      </div>

      <p className="font-medium text-gray-700">
        Your pantry is empty
      </p>

      <p className="text-sm text-gray-500 mt-1">
        Add ingredients to start generating recipes.
      </p>

    </div>
  );
}

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {items.map((item) => (
        <IngredientCard
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

    </div>
  );
}