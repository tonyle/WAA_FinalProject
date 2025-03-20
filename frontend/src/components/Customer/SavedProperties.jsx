import React, { useEffect,useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavSuccess, fetchFavFail } from '../../store/customer/customerSlice';

const SavedProperties = () => {
  const { favorities } = useSelector((state) => state.customer);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(
      
      'https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1/favourites',
    
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(response => {
        dispatch(fetchFavSuccess({ data: response.data }));
      })
      .catch(err => {
        dispatch(fetchFavFail(err.message)); 
      });

  }, [dispatch]); 

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
          {/* {favorities[0]} */}
          {favorities?.length > 0 ? favorities[0]?.name : "No Saved Properties"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorities?.length > 0 ? (
            favorities[0].properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={"https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp"} 
                  alt={property.name} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
                  <p className="text-sm text-gray-600 mt-2">{property.description}</p>
                  <p className="text-lg font-semibold text-blue-600 mt-4">{property.price}</p>
                  <p className="text-sm text-gray-500 mt-1">{property.address.city} {property.address.state} {property.address.street}</p>
                  <p className="text-sm text-gray-500 mt-1">{property.houseType}</p>
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                  <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Contact Agent</button>
                  <button className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No saved properties available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;
