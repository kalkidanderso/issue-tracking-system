import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
let token = localStorage.getItem("token");
console.log(currentUser, "currentUser");

const refreshAccessToken = async () => {
  try {
    const response = await axios.get("token/", {
      headers: {
        "user-id": currentUser?.id
      },
    });

    return response.data.accessToken;
  } catch (error) {
    notifyError();
    handleLogout();
    return null;
  }
};

const notifyError = () =>
  toast.error("You are not allowed to access this resourse. ===token expired", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.request.use(
  (request) => {
    // Avoid overriding custom Authorization headers (like for passenger portal)
    if (!request.headers["Authorization"] && !request.headers.authorization) {
      token = localStorage.getItem("token");
      if (token) {
        request.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return request;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log("Error status:", error.response?.status);

    if (error.response && error.response.status === 403 && !originalRequest._retry) {
      if (window.location.pathname.startsWith("/passenger")) {
        // Passenger portal manages its own tokens; clear them and redirect to passenger login
        localStorage.removeItem("passengerToken");
        localStorage.removeItem("passengerData");
        window.location.href = "/passenger/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      try {
        const access_token = await refreshAccessToken();

        if (access_token) {
          localStorage.setItem("token", access_token);
          token = access_token;
          axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
          originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        handleLogout();
      }
    }
    return Promise.reject(error);
  }
);


axios.defaults.withCredentials = true;


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
