import axios from "axios";
import api from ".";

const url =
  "https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1";

export const getPropertiesWithoutAuth = async (params) => {
  try {
    const response = await axios.get(url + "/properties", { params });
    return response;
  } catch (err) {
    throw err;
  }
};

export const getPropertieDetailsWithoutAuth = async (id) => {
  try {
    const response = await axios.get(url + "/properties/" + id);
    return response;
  } catch (err) {
    throw err;
  }
};

export const makeOffer = async (data) => {
    try {
      const response = await api.post("/offers", data);
      return response;
    } catch (err) {
      throw err;
    }
}