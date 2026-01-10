import axios from "axios";

const api = axios.create({
  baseURL: "https://stellix-2-0.onrender.com",
  withCredentials: true,
});

export default api;

