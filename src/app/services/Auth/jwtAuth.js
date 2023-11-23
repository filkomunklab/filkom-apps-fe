import { BASE_URL_API } from "@jumbo/config/env";
import axios from "axios";

export const getAuthToken = () => {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("token");
    if (token) {
      resolve(token);
    }
    // } else {
    //   reject("Token not found");
    // }
  });
};

const jwtAuthAxios = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`,
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
