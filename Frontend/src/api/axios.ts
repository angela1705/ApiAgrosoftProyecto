import axios from "axios";

const token = localStorage.getItem("access_token");

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default api;
