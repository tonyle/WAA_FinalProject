import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOffers, cancelOffer } from '../../api/customerApi';
import { fetchOfferFail, fetchOfferSuccess } from '../../store/customer/customerSlice';

const CurrentOffers = () => {
  const { offers } = useSelector((state) => state.customer);
  const [refresh, setRefresh] = useState(false); 
  const dispatch = useDispatch();
  const params = {
    statuses: 'NEW', // multiple values
  };

  const fetchData = async () => {
    try {
      const res = await getOffers(params);
      dispatch(fetchOfferSuccess({ data: res.data }));
    } catch (err) {
      dispatch(fetchOfferFail({ err }));
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData(params);
  }, [refresh, dispatch]);

  const handleCancelOffer = async (id) => {
    // Simulate canceling the offer (replace with API logic)
    let response = await cancelOffer(id);
    console.log(response);
    if (response) {
      setRefresh(!refresh);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Offers</h1>
        {/* Check if there are any offers */}
        {offers.length === 0 ? (
          <p className="text-gray-500 text-lg">You have no offers available at the moment.</p> // Show this if offers are empty
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map(offer => (
              <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={offer.photos && offer.photos.length > 0 ? offer.photos[0].path : "https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp"}
                  alt={offer.property.name}
                  className="w-full h-48 object-cover"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  <p className="text-sm text-gray-600 mt-2">Name: {offer.property.name}</p>
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
                  {offer.status !== 'CONTINGENCY' && (
                    <button
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                      onClick={() => handleCancelOffer(offer.id)}
                    >
                      Cancel Offer
                    </button>
                  )}
                  {offer.status === 'CONTINGENCY' && (
                    <span className="text-gray-400 text-sm">Offer Not Canceled</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrentOffers;
