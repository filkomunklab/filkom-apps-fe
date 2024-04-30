import axios from "axios";
import { GLOBAL_BASE_URL_API } from "../constants/config";

const GlobalClientInstance = axios.create({
  baseURL: GLOBAL_BASE_URL_API,
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default GlobalClientInstance;
