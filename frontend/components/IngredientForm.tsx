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
      className="border rounded-lg p-4 bg-white shadow-sm flex flex-col gap-3 max-w-md"
    >
      <h2 className="text-lg font-semibold">
        {editingItem ? "Edit Ingredient" : "Add Ingredient"}
      </h2>

      <input
        type="text"
        placeholder="Ingredient name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded p-2"
        required
      />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        className="border rounded p-2"
        min={1}
      />

      <div className="flex gap-2 mt-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {editingItem ? "Update" : "Add"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}