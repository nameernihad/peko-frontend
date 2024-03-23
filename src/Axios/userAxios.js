import axios from "axios";
import { userAPI } from "../Constants/API";

const userInstance = axios.create({
    baseURL: userAPI,
});

userInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token'); 
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  
export default userInstance;
