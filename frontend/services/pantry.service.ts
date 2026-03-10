import api from "@/lib/api";
import { PantryItem } from "@/types/PantryItem";

// GET pantry items
export const getPantryItems = async (): Promise<PantryItem[]> => {
  const res = await api.get("/pantry");
  return res.data.data;
};

// ADD pantry item
export const addPantryItem = async (
  item: Omit<PantryItem, "id">
): Promise<PantryItem> => {
  const res = await api.post("/pantry", {
    name: item.name,
    quantity: item.quantity,
    added_via: "manual",
    confidence: null,
  });

  return res.data.data;
};

// UPDATE pantry item
export const updatePantryItem = async (
  id: string,
  item: Partial<PantryItem>
): Promise<PantryItem> => {
  const payload = {
    ...item,
    quantity:
      item.quantity !== undefined ? Number(item.quantity) : undefined,
  };

  const res = await api.patch(`/pantry/${id}`, payload);

  return res.data.data;
};

// DELETE pantry item
export const deletePantryItem = async (id: string): Promise<void> => {
  await api.delete(`/pantry/${id}`);
};