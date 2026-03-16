"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import PantryGrid from "@/components/ui/PantryGrid";
import IngredientForm from "@/components/IngredientForm";
import { PantryItem } from "@/types/PantryItem";
import {
getPantryItems,
addPantryItem,
updatePantryItem,
deletePantryItem,
clearPantry
} from "@/services/pantry.service";
import PageHeader from "@/components/ui/PageHeader";
import AnimatedBackground from "@/components/ui/AnimatedBackground";

export default function PantryPage() {

const { user } = useUser();

const [items, setItems] = useState<PantryItem[]>([]);
const [loading, setLoading] = useState(true);
const [showForm, setShowForm] = useState(false);
const [editingItem, setEditingItem] = useState<PantryItem | null>(null);

const handleAddIngredient = async (data: { name: string; quantity: number }) => {

try {

  const newItem = await addPantryItem(user?.id as string, data);
  setItems((prev) => [...prev, newItem]);
  setShowForm(false);

} catch (error) {
  console.error("Error adding ingredient:", error);
}

};

const handleDeleteIngredient = async (id: string) => {

try {

  await deletePantryItem(user?.id as string, id);
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

  const updatedItem = await updatePantryItem(
    user?.id as string,
    editingItem.id,
    data
  );

  setItems((prev) =>
    prev.map((item) =>
      item.id === editingItem.id ? updatedItem : item
    )
  );

  setEditingItem(null);
  setShowForm(false);

} catch (error) {
  console.error("Error updating ingredient:", error);
}

};

/* NEW FUNCTION — CLEAR PANTRY */
const handleClearPantry = async () => {

if (!user?.id) return;

const confirmClear = confirm("Are you sure you want to clear your entire pantry?");

if (!confirmClear) return;

try {

  await clearPantry(user.id);

  setItems([]);

} catch (error) {
  console.error("Error clearing pantry:", error);
}

};

useEffect(() => {

const fetchItems = async () => {

  if (!user?.id) return;

  try {

    const data = await getPantryItems(user.id);
    setItems(data);

  } catch (error) {
    console.error("Error fetching pantry items:", error);
  } finally {
    setLoading(false);
  }

};

fetchItems();

}, [user]);

if (loading) {

return (

  <div className="relative bg-gray-50 min-h-screen flex items-center justify-center overflow-hidden">

    <AnimatedBackground />

    <p className="relative text-gray-500 text-lg animate-pulse">
      Loading pantry...
    </p>

  </div>

);

}

return (

<div className="relative bg-gray-50 min-h-screen overflow-hidden">

  <AnimatedBackground />

  <main className="relative max-w-6xl mx-auto px-6 py-10 space-y-8">

    <PageHeader
      title="Pantry"
      subtitle="Manage ingredients available in your kitchen"
    />

    <div className="flex justify-end gap-4">

      <button
        onClick={() => setShowForm(true)}
        className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-300 hover:bg-emerald-700 hover:-translate-y-1 hover:shadow-lg"
      >
        + Add Ingredient
      </button>

      <button
  onClick={handleClearPantry}
  className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition-all duration-300 hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg"
>
  Clear Pantry
</button>

      <Link
  href="/recipes"
  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:-translate-y-1 hover:shadow-xl"
>
  Generate Recipes →
</Link>

    </div>

    {showForm && (

      <div className="bg-white/90 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm transition hover:shadow-lg duration-300">

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

    <PantryGrid
      items={items}
      onEdit={handleEditIngredient}
      onDelete={handleDeleteIngredient}
    />

  </main>

</div>

);

}