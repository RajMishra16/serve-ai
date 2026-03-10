import axios from "axios";
import { PantryItem } from "@/types/PantryItem";

const API_URL = "http://localhost:5000/api/pantry";


// GET all pantry items
export const getPantryItems = async (): Promise<PantryItem[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};


// ADD new pantry item
export const addPantryItem = async (
  item: Omit<PantryItem, "id">
): Promise<PantryItem> => {
  const response = await axios.post(API_URL, item);
  return response.data;
};


// UPDATE pantry item
export const updatePantryItem = async (
  id: string,
  item: Partial<PantryItem>
): Promise<PantryItem> => {
  const response = await axios.patch(`${API_URL}/${id}`, item);
  return response.data;
};


// DELETE pantry item
export const deletePantryItem = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};