import api from "../api";
import { PropertyStatuses } from "../constants/types";


export const updateOffer = async (id, data) => {
    try {
      const response = await api.put("/offers/" + id, data);
      return response;
    } catch (err) {
      throw err;
    }
  };

  export const deleteProperty = async (id) => {
    try {
      const response = await api.put("/properties/" + id + "/status", {status: PropertyStatuses.DEACTIVATED});
      return response;
    } catch (err) {
      throw err;
    }
  };

