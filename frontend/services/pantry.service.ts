import api from "@/lib/api";
import { PantryItem } from "@/types/PantryItem";

// GET pantry items
export const getPantryItems = async (userId: string): Promise<PantryItem[]> => {
  try {
    const res = await api.get("/pantry", {
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
    const res = await api.post("/pantry", {
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

    const res = await api.patch(`/pantry/${id}`, payload);

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
    await api.delete(`/pantry/${id}`, {
      params: { userId },
    });
  } catch (error: any) {
    console.error("Delete Pantry Item Error:", error);
    throw error;
  }
};