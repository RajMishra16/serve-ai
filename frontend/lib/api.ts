import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // ✅ production-ready
  withCredentials: true,
});

export default api;