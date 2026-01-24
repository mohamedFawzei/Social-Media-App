import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // console.log("token ", token);

    if (token) {
      config.headers["token"] = token;
    }

    // console.log(`Request: ${config.method.toUpperCase()} ${config.url}`, {
    //   headers: config.headers,
    // });

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
