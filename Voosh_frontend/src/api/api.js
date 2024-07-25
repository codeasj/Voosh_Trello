import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
export default api;

export const authApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, //Includes cookie with every request
});

export const authMultiFormApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiMultiForm.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     config.headers["Content-Type"] = "multipart/form-data";
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);

// }
// );
