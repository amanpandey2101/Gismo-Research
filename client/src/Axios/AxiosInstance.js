import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:4000/";
// const BASE_URL = "https://skillsail.sudhindevan.com";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default AxiosInstance;
