import axios from "axios";
import { BASE_URL } from "./configs/constant";
import { useCookies } from "react-cookie";

const privateAxios = axios.create({
  baseURL: BASE_URL,
});

privateAxios.interceptors.response.use(
  (config) => {
    const [cookies] = useCookies("token");
    console.log(cookies);
    config.headers["Authorization"] = `Bearer ${cookies.token}`;

    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
