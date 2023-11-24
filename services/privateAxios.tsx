import axios from "axios";
import { useCookies } from "react-cookie";

export const baseURL: string = "http://localhost:4000/";

const privateAxios = axios.create({
  baseURL: baseURL,
});

privateAxios.interceptors.response.use(
  (config) => {
    console.log("sda");

    const [cookies] = useCookies(["token"]);
    // config.headers["Authorization"] = `Bearer ${cookies.token}`;

    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateAxios;
