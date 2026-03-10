import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getPantryItems = async () => {
  const response = await axios.get(`${API_BASE}/pantry`);
  return response.data;
};

export const addPantryItem = async (item: any) => {
  const response = await axios.post(`${API_BASE}/pantry`, item);
  return response.data;
};

export const deletePantryItem = async (id: string) => {
  const response = await axios.delete(`${API_BASE}/pantry/${id}`);
  return response.data;
};