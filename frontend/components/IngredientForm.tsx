"use client";

import { useState, useEffect } from "react";
import { PantryItem } from "@/types/PantryItem";

interface IngredientFormProps {
  onSubmit: (data: { name: string; quantity: number }) => void;
  onCancel: () => void;
  editingItem?: PantryItem | null;
}

export default function IngredientForm({
  onSubmit,
  onCancel,
  editingItem,
}: IngredientFormProps) {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setQuantity(editingItem.quantity);
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {

    e.preventDefault();

    if (!name.trim()) return;

    onSubmit({
      name,
      quantity,
    });

    setName("");
    setQuantity(1);

  };

  return (

    <form
      onSubmit={handleSubmit}
      className="
      group relative
      border border-gray-200
      rounded-2xl
      p-6
      bg-white
      shadow-sm
      hover:shadow-xl
      transition-all
      duration-300
      flex flex-col
      gap-4
      w-full
      max-w-lg
      overflow-hidden
      "
    >

      {/* hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-emerald-400/10 via-green-400/10 to-lime-400/10 pointer-events-none"></div>

      <h2 className="relative text-lg font-semibold text-gray-900">
        {editingItem ? "Edit Ingredient" : "Add Ingredient"}
      </h2>

      {/* Ingredient Name */}
      <input
        type="text"
        placeholder="Ingredient name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="
        relative
        border border-gray-200
        rounded-lg
        px-3 py-2
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500
        transition
        "
        required
      />

      {/* Quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        min={1}
        className="
        relative
        border border-gray-200
        rounded-lg
        px-3 py-2
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-500
        transition
        "
      />

      {/* Buttons */}
      <div className="relative flex gap-3 mt-2">

        <button
          type="submit"
          className="
          px-5 py-2
          bg-emerald-600
          text-white
          rounded-lg
          font-medium
          hover:bg-emerald-700
          hover:scale-[1.03]
          transition
          "
        >
          {editingItem ? "Update" : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="
          px-5 py-2
          bg-gray-200
          text-gray-700
          rounded-lg
          font-medium
          hover:bg-gray-300
          transition
          "
        >
          Cancel
        </button>

      </div>

    </form>

  );
}