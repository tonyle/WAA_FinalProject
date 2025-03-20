import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { fetchOfferFail, fetchOfferSuccess } from '../../store/customer/customerSlice';

const CurrentOffers = () => {
  const { offers } = useSelector((state) => state.customer);
  const { accessToken } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(
      'https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1/offers',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then(response => {
        dispatch(fetchOfferSuccess({ data: response.data }));
      })
      .catch(err => {
        dispatch(fetchOfferFail(err.message)); 
      });
  }, [accessToken, dispatch]);

  const handleCancelOffer = (id) => {
    // Simulate canceling the offer (replace with API logic)
    setOffers(offers.map(offer => offer.id === id ? { ...offer, status: 'Canceled' } : offer));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Offers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp"
                alt={offer.property.name}
                className="w-full h-48 object-cover"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                <p className="text-sm text-gray-600 mt-2">Name:{offer.property.name}</p>
                <p className="text-sm text-gray-600 mt-2">Type: {offer.property.type}</p>
                <p className="text-sm text-gray-600 mt-2">Offer Price: ${offer.offerPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-2">Description: {offer.property.description}</p>
                <p className="text-sm text-gray-600 mt-2">Style: {offer.property.style}</p>
                <p className="text-sm text-gray-600 mt-2">House Type: {offer.property.houseType}</p>
                <p className="text-sm text-gray-600 mt-2">Bed: {offer.property.bed}</p>
                <p className="text-sm text-gray-600 mt-2">Bath: {offer.property.bath}</p>
                <p className="text-sm text-gray-600 mt-2">Sqft: {offer.property.sqft}</p>
                <p className="text-sm text-gray-600 mt-2">Year Built: {offer.property.yearBuilt}</p>
                <p className="text-sm text-gray-600 mt-2">View: {offer.property.view}</p>
                <p className="text-sm text-gray-600 mt-2">Save: {offer.property.save}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Address: {offer.property.address.street}, {offer.property.address.city}, {offer.property.address.state} {offer.property.address.postalCode}
                </p>
                <p className={`text-sm mt-2 ${offer.status === 'AVAILABLE' ? 'text-green-500' : offer.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>
                  Status: {offer.status}
                </p>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                {offer.status !== 'Canceled' && (
                  <button
                    className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    onClick={() => handleCancelOffer(offer.id)}
                  >
                    Cancel Offer
                  </button>
                )}
                {offer.status === 'Canceled' && (
                  <span className="text-gray-400 text-sm">Offer Canceled</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentOffers;
