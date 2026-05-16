import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("d4uToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 498) {
        localStorage.removeItem('d4uToken');
        localStorage.removeItem('userData');
        localStorage.removeItem('userType');
        localStorage.removeItem('roleData');
      window.location.href = "/"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
