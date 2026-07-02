import axios from "axios";
import { API_BASE_URL } from "./endpoints";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    Accept: "application/json",
  },
});
