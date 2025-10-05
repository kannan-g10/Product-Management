import { BASE_API_URL } from "../constants/api";

// src/utils/auth.js
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await fetch(`${BASE_API_URL}auth/login/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
    });

    const data = await response.json();
    if (data.access) {
      localStorage.setItem("accessToken", data.access); 
      return data.access;
    } else {
      throw new Error(data.detail || "Failed to refresh token");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return null; 
  }
};