"use client";

import { PantryItem } from "@/types/PantryItem";

interface IngredientCardProps {
  item: PantryItem;
  onEdit: (item: PantryItem) => void;
  onDelete: (id: string) => void;
}

export default function IngredientCard({
  item,
  onEdit,
  onDelete,
}: IngredientCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white flex flex-col gap-2">
      
      {/* Ingredient Name */}
      <h3 className="text-lg font-semibold">{item.name}</h3>

      {/* Quantity */}
      <p className="text-sm text-gray-600">
        Quantity: <span className="font-medium">{item.quantity}</span>
      </p>

      {/* Confidence Score (optional) */}
      {item.confidence && (
        <p className="text-xs text-gray-500">
          AI Confidence: {(item.confidence * 100).toFixed(0)}%
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-2 mt-3">
        <button
          onClick={() => onEdit(item)}
          className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>

    </div>
  );
}