"use client";

import { useEffect, useState } from "react";
import PantryGrid from "@/components/ui/PantryGrid";
import IngredientForm from "@/components/IngredientForm";
import { PantryItem } from "@/types/PantryItem";
import {
  getPantryItems,
  addPantryItem,
  updatePantryItem,
  deletePantryItem,
} from "@/services/pantry.service";
import PageHeader from "@/components/ui/PageHeader";

export default function PantryPage() {
  const [items, setItems] = useState<PantryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

  const handleAddIngredient = async (data: { name: string; quantity: number }) => {
    try {
      const newItem = await addPantryItem(data);
      setItems((prev) => [...prev, newItem]);
      setShowForm(false);
    } catch (error) {
      console.error("Error adding ingredient:", error);
    }
  };

  const handleDeleteIngredient = async (id: string) => {
    try {
      await deletePantryItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting ingredient:", error);
    }
  };

  const handleEditIngredient = (item: PantryItem) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleUpdateIngredient = async (data: { name: string; quantity: number }) => {
    if (!editingItem) return;

    try {
      const updatedItem = await updatePantryItem(editingItem.id, data);

      setItems((prev) =>
        prev.map((item) => (item.id === editingItem.id ? updatedItem : item))
      );

      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      console.error("Error updating ingredient:", error);
    }
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getPantryItems();
        setItems(data);
      } catch (error) {
        console.error("Error fetching pantry items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading pantry...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        <PageHeader
          title="Pantry"
          subtitle="Manage ingredients available in your kitchen"
        />

        {/* Add Ingredient Button */}
        <div className="flex justify-end">
          <button
            onClick={() => setShowForm(true)}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            + Add Ingredient
          </button>
        </div>

        {/* Ingredient Form */}
        {showForm && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <IngredientForm
              editingItem={editingItem}
              onSubmit={editingItem ? handleUpdateIngredient : handleAddIngredient}
              onCancel={() => {
                setShowForm(false);
                setEditingItem(null);
              }}
            />
          </div>
        )}

        {/* Pantry Grid */}
        <PantryGrid
          items={items}
          onEdit={handleEditIngredient}
          onDelete={handleDeleteIngredient}
        />

      </div>

    </div>
  );
}