import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ocrsystem.site/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export default axiosInstance