import axios from "axios";

const API_BASE = "http://localhost:5001/api";

export const api = axios.create({
  baseURL: API_BASE
});

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("skillup_token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("skillup_token");
  }
};

// Load token on startup
const token = localStorage.getItem("skillup_token");
if (token) setAuthToken(token);
