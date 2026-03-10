"use client";

import { PantryItem } from "@/types/PantryItem";
import IngredientCard from "@/components/ui/IngredientCard";
interface PantryGridProps {
  items: PantryItem[];
  onEdit: (item: PantryItem) => void;
  onDelete: (id: string) => void;
}

export default function PantryGrid({ items, onEdit, onDelete }: PantryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Your pantry is empty. Add ingredients to get recipe suggestions.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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