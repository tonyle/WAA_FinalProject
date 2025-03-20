import api from "../api";

export const addProperty = async (data) => {
  try {
    const res = await api.post("/properties", data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const getProperty = async (id) => {
  try {
    const res = await api.get("/properties/" + id);
    return res;
  } catch (err) {
    throw err;
  }
};

export const putProperty = async (id, data) => {
  try {
    const res = await api.put("/properties/" + id, data);
    return res;
  } catch (err) {
    throw err;
  }
};

export const uploadPhotos = async (id, data) => {
  try {
    const res = await api.post(`/properties/${id}/upload-photos`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (err) {
    throw err;
  }
};
