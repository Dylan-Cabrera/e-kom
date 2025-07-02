import axios from "axios";

const ekomApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000",
  // Puedes agregar más config si necesitas.
});

export default ekomApi;