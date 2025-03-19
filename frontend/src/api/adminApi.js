import api from "../api";

export const getProperties = async (params) => {
    try {
        const response = await api.get("/properties", { params });
        return response;
    } catch (err) {
        throw err;
    }
};
export const getUsers = async (params) => {
  try {
    const response = await api.get("/users", { params });
    return response;
  } catch (err) {
    throw err;
  }
};
export const getOffers = () => {};
export const activeOrDeactiveOwnerAccount = () => {};
export const approveProperty = () => {};
