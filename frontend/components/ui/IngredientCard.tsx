"use client";

import { PantryItem } from "@/types/PantryItem";
import { Pencil, Trash2 } from "lucide-react";
import { getIngredientIcon } from "@/lib/ingredientIcons";

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

  const Icon = getIngredientIcon(item.name);

  return (
    <div className="group bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition flex flex-col justify-between">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center">

            {typeof Icon === "string" ? (
              <span className="text-lg">{Icon}</span>
            ) : (
              <Icon className="w-4 h-4 text-emerald-600" />
            )}

          </div>

          <h3 className="text-gray-900 font-semibold capitalize text-lg">
            {item.name}
          </h3>

        </div>

        <span className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">
          Qty {item.quantity}
        </span>

      </div>

      {/* Confidence */}
      {item.confidence && (
        <p className="text-xs text-gray-400 mt-3">
          AI Confidence: {(item.confidence * 100).toFixed(0)}%
        </p>
      )}

      {/* Actions */}
      <div className="flex gap-3 mt-5">

        <button
          onClick={() => onEdit(item)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
        >
          <Pencil className="w-3 h-3" />
          Edit
        </button>

        <button
          onClick={() => onDelete(item.id)}
          className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition"
        >
          <Trash2 className="w-3 h-3" />
          Delete
        </button>

      </div>

    </div>
  );
}