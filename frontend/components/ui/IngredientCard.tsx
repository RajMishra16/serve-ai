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
    <div
      className="
      group relative
      bg-white
      border border-gray-200
      rounded-2xl
      p-6
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      overflow-hidden
    "
    >

      {/* Glow Background */}
      <div
        className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        bg-gradient-to-r from-emerald-50 via-white to-emerald-50
        transition
      "
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* Ingredient Icon */}
            <div
              className="
              w-10 h-10
              rounded-xl
              bg-emerald-50
              flex items-center justify-center
              group-hover:scale-110
              transition
            "
            >
              {typeof Icon === "string" ? (
                <span className="text-lg">{Icon}</span>
              ) : (
                <Icon className="w-5 h-5 text-emerald-600" />
              )}
            </div>

            <h3 className="text-gray-900 font-semibold capitalize text-lg">
              {item.name}
            </h3>

          </div>

          <span
            className="
            text-xs
            bg-gray-100
            px-3 py-1
            rounded-full
            text-gray-600
            font-medium
          "
          >
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
        <div
          className="
          flex gap-3 mt-5
          opacity-80
          group-hover:opacity-100
          transition
        "
        >

          <button
            onClick={() => onEdit(item)}
            className="
            flex items-center gap-1
            text-sm
            px-3 py-1.5
            rounded-lg
            bg-gray-100
            hover:bg-gray-200
            transition
          "
          >
            <Pencil className="w-3 h-3" />
            Edit
          </button>

          <button
            onClick={() => onDelete(item.id)}
            className="
            flex items-center gap-1
            text-sm
            px-3 py-1.5
            rounded-lg
            bg-red-100
            text-red-600
            hover:bg-red-200
            transition
          "
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}