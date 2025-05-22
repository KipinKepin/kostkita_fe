import axios from "axios";

const api = axios.create({
  baseURL: "https://t04pzf6r-3000.asse.devtunnels.ms/api/admin",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role === "admin") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

export const api2 = axios.create({
  baseURL: "https://t04pzf6r-3000.asse.devtunnels.ms/api",
});

api2.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token && role === "admin") {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
