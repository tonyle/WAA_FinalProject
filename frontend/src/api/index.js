import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../store/auth/authSlice";

const api = axios.create({ baseURL: "http://localhost:8080" });

api.interceptors.request.use((config) => {
  const state = store.getState();
  const accessToken = state.auth.accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
