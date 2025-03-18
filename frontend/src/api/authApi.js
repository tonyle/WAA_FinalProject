import api from "../api";

export const loginUser = async (credentials) => {
  const response = await api.post("/login", credentials);
  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  const response = await api.post("/refresh", { token: refreshToken });
  return response.data.accessToken;
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  await api.post("/logout", { token: refreshToken });
  localStorage.removeItem("refreshToken");
};
