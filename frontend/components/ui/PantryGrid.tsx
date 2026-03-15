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
      <div className="relative bg-white border border-gray-200 rounded-2xl p-12 text-center text-gray-500 shadow-sm overflow-hidden">

        {/* floating glow blobs */}
        <div className="absolute -top-16 left-16 w-40 h-40 bg-emerald-300/20 blur-3xl rounded-full animate-pulse"></div>
        <div className="absolute -bottom-16 right-16 w-40 h-40 bg-green-300/20 blur-3xl rounded-full animate-pulse"></div>

        <div className="relative flex flex-col items-center">

          <PackageOpen className="w-12 h-12 text-emerald-500 mb-4" />

          <p className="font-semibold text-gray-700 text-lg">
            Your pantry is empty
          </p>

          <p className="text-sm text-gray-500 mt-1 max-w-sm">
            Add ingredients or scan items to start generating delicious AI recipes.
          </p>

        </div>

      </div>
    );
  }

  return (

    <div className="relative">

      {/* AI glow background */}
      <div
        className="
        absolute inset-0 -z-10 opacity-40 pointer-events-none
        bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_60%)]
        "
      />

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        gap-6
      "
      >

        {items
          .filter((item) => item && item.id)
          .map((item, index) => (
            <div
              key={item.id}
              style={{
                animationDelay: `${index * 60}ms`,
              }}
              className="
              opacity-0
              animate-[fadeInUp_0.4s_ease_forwards]
              hover:-translate-y-1
              hover:scale-[1.02]
              transition
              "
            >
              <IngredientCard
                item={item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </div>
          ))}

      </div>

    </div>
  );
}