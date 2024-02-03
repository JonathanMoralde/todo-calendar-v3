// auth.js

import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Replace with your actual API base URL

export const checkSession = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/check-session`);
    return response.data.authenticated;
  } catch (error) {
    console.error("Error checking session:", error);
    return false;
  }
};
