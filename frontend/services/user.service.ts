import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE}/user`);
  return response.data;
};