import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001", // ✅ FIXED
  withCredentials: true,
});

export default api;