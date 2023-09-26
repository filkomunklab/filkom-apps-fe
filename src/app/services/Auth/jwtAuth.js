import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

const jwtAuthAxios = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
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

export const getAuthToken = () => {
  return sessionStorage.getItem("token");
};

export default jwtAuthAxios;
