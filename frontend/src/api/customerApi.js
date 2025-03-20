import api from "../api";
import { PropertyStatuses } from "../constants/types";

export const getProperties = async (params) => {
    try {
       
        const response = await api.get(`/properties`,{params});
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
export const addFav = async (params) => {
    try {
      const response = await api.post("/favourites", { name: "My Saved Properties" });
      return response;
    } catch (err) {
      throw err;
    }
  };
export const offerProperty = async (body) => {
  try {
    console.log(body)
    const response = await api.post("/offers", body);
    return response;
  } catch (err) {
    throw err;
  }
};
export const cancelOffer = async (id) => {
    try {
      const response = await api.delete("/offers/" + id);
      
      return response;
    } catch (err) {
      throw err;
    }
  };
  
  export const cancelProp = async (id,proid) => {
    try {
        // DELETE /api/v1/favourites/1/properties/2
      const response = await api.delete("/favourites/" + id+"/properties/" + proid);
      return response;
    } catch (err) {
      throw err;
    }
  };
  export const favs = async () => {
    try {
        // DELETE /api/v1/favourites/1/properties/2
      const response = await api.get("/favourites");
      
      return response;
    } catch (err) {
      throw err;
    }
  };
  export const getProfDetail = async (id) => {
    try {
    //   console.log(params)
      const response = await api.get(`/properties/${id}`);
      return response;
    } catch (err) {
      throw err;
    }
  };

  export const addProp = async (id,proid) => {
    try {
        // DELETE /api/v1/favourites/1/properties/2
      const response = await api.put("/favourites/" + id+"/properties/" + proid);
      return response;
    } catch (err) {
      throw err;
    }
  };