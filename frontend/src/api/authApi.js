import api from "../api";

export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth", credentials);
    return response;
  } catch (err) {
    throw err;
  }
};

export const signup = async (data) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response;
  } catch (err) {
    throw err;
  }
}

export const refreshAccessToken = async () => {
  try {
    const { refreshToken, accessToken } = JSON.parse(localStorage.getItem("token"));
    const response = await api.post("/auth/refreshToken", { refreshToken, accessToken });
    return response;
  } catch (err) {
    throw err;
  }
};

export const logoutUser = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  await api.post("/logout", { token: refreshToken });
  localStorage.removeItem("refreshToken");
};
