import axios from "axios";
import { CookiesProvider, useCookies, Cookies, setCookies } from "react-cookie";

export const baseURL: string = "http://localhost:4000/";

const privateAxios = axios.create({
  baseURL: baseURL,
});

privateAxios.interceptors.response.use(
  (config) => {
    const [cookies] = useCookies(["token"]);
    console.log(cookies);
    // config.headers["Authorization"] = `Bearer ${cookies.token}`;

    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default privateAxios;
