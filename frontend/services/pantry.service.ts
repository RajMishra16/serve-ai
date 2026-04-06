import api from "@/lib/api";
import { PantryItem } from "@/types/PantryItem";

// GET pantry items
export const getPantryItems = async (userId: string): Promise<PantryItem[]> => {
  try {
    const res = await api.get("/api/pantry", {
      params: { userId },
    });

    return res.data?.data ?? [];
  } catch (error: any) {
    console.error("========== PANTRY FETCH ERROR ==========");
    console.error("Full Error:", error);
    console.error("Response:", error?.response);
    console.error("Response Data:", error?.response?.data);
    console.error("Request:", error?.request);
    console.error("Config:", error?.config);
    console.error("========================================");

    return [];
  }
};

// ADD pantry item
export const addPantryItem = async (
  userId: string,
  item: Omit<PantryItem, "id">
): Promise<PantryItem> => {
  try {
    const res = await api.post("/api/pantry", {
      name: item.name,
      quantity: item.quantity,
      added_via: "manual",
      confidence: null,
      userId,
    });

    return res.data.data;
  } catch (error: any) {
    console.error("Add Pantry Item Error:", error);
    throw error;
  }
};

// UPDATE pantry item
export const updatePantryItem = async (
  userId: string,
  id: string,
  item: Partial<PantryItem>
): Promise<PantryItem> => {
  try {
    const payload = {
      ...item,
      quantity:
        item.quantity !== undefined ? Number(item.quantity) : undefined,
      userId,
    };

    const res = await api.patch(`/api/pantry/${id}`, payload);

    return res.data.data;
  } catch (error: any) {
    console.error("Update Pantry Item Error:", error);
    throw error;
  }
};

// DELETE pantry item
export const deletePantryItem = async (
  userId: string,
  id: string
): Promise<void> => {
  try {
    await api.delete(`/api/pantry/${id}`, {
      params: { userId },
    });
  } catch (error) {
    console.error("Error deleting pantry item:", error);
    throw error;
  }
};

// CLEAR ALL pantry items
export const clearPantry = async (userId: string): Promise<void> => {
  try {
    await api.delete("/api/pantry", {
      params: { userId },
    });
  } catch (error) {
    console.error("Error clearing pantry:", error);
    throw error;
  }
};