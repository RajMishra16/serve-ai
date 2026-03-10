import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const generateRecipes = async (ingredients: string[]) => {
  const response = await axios.post(`${API_BASE}/recipes/generate`, {
    ingredients,
  });
  return response.data;
};

export const getSavedRecipes = async () => {
  const response = await axios.get(`${API_BASE}/recipes/saved`);
  return response.data;
};