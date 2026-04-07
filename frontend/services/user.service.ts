import axios from "axios";

const API_BASE = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const getUserProfile = async () => {
  const response = await axios.get(`${API_BASE}/user`);
  return response.data;
};