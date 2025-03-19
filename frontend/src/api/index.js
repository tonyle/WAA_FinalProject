import axios from "axios";
import { store } from "../store";
import { refreshToken } from "../store/auth/authSlice";
import { refreshAccessToken } from "./authApi";

const api = axios.create({
  baseURL:
    "https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1",
});

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
        const response = await refreshAccessToken();
        store.dispatch(refreshToken(response));
        const { accessToken } = response.data;
        error.config.headers.Authorization = `Bearer ${accessToken}`;
        return api(error.config);
      } catch {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
