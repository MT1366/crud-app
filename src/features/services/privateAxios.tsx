import axios from "axios";
import { Cookies } from "react-cookie";

export const baseURL: string = "http://localhost:4000/";

const privateAxios = axios.create({
  baseURL: baseURL,
});

privateAxios.interceptors.request.use(
  (config) => {
    const cookies = new Cookies();
    const token = cookies.get("access_token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateAxios;
