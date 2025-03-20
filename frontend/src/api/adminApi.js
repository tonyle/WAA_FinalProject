import api from "../api";
import { PropertyStatuses } from "../constants/types";

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
export const getOffers = async (params) => {
  try {
    const response = await api.get("/offers", { params });
    return response;
  } catch (err) {
    throw err;
  }
};

export const activeOrDeactiveOwnerAccount = async (id, data) => {
  try {
    const response = await api.put("/users/" + id, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const approveProperty = async (id) => {
  try {
    const response = await api.put("/properties/" + id + "/status", {status: PropertyStatuses.AVAILABLE});
    return response;
  } catch (err) {
    throw err;
  }
};
