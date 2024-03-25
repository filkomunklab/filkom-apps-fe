import axios from "axios";
import { OBE_BASE_URL_API } from "../../../@jumbo/config/env";

const obeClient = axios.create({
  baseURL: `${OBE_BASE_URL_API}/api`,
});

obeClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { obeClient };
