import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export const getAuthToken = () => {
  return localStorage.getItem("token");
};

const jwtAuthAxios = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

jwtAuthAxios.interceptors.request.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.data.type === "token-invalid") {
      // todo : handle token invalid
    }
    return Promise.reject(err);
  }
);

export default jwtAuthAxios;
