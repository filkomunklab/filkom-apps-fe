import axios from "axios";
import { BASE_URL_API, OBE_BASE_URL_API } from "../../../@jumbo/config/env";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useJumboAuth from "@jumbo/hooks/useJumboAuth";
import Swal from "sweetalert2";

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

const globalClient = axios.create({
  baseURL: `${BASE_URL_API}`,
});

globalClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();
  const { setAuthToken } = useJumboAuth();

  useEffect(() => {
    const resInterceptor = (res) => res;
    const errInterceptor = (error) => {
      if (error.response.status === 401) {
        localStorage.clear();
        setAuthToken(null);
        navigate("/login");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Session Expired! Please login again.",
        });
      }
      return Promise.reject(error);
    };

    const interceptor = globalClient.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    return () => globalClient.interceptors.response.eject(interceptor);
  }, [navigate]);

  return children;
};

export { obeClient, globalClient, AxiosInterceptor };
