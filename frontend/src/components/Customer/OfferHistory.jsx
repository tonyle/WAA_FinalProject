import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOfferFail, fetchOfferSuccess } from '../../store/customer/customerSlice'; // Adjust path as needed

const OfferHistory = () => {
  const dispatch = useDispatch();
  const { offers, error } = useSelector((state) => state.customer);
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          'https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1/offers?status=ACCEPTED&status=REJECTED',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        dispatch(fetchOfferSuccess({ data: response.data }));
      } catch (err) {
        dispatch(fetchOfferFail(err.message));
      }
    };

    if (accessToken) {
      fetchOffers();
    }
  }, [accessToken, dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
      <div className="max-w-7xl w-full bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Offer History</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-300">
              {/* Image & Property Info */}
              <div className="flex items-center space-x-4">
                <img
                  src={offer.photos?.[0]?.path || 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'}
                  alt={offer.property?.name}
                  className="w-28 h-28 object-cover rounded-lg"
                />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{offer.property?.name}</h2>
                  <p className="text-sm text-gray-600">{offer.property?.description}</p>
                </div>
              </div>

              {/* Offer Details */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-gray-700">
                <p><span className="font-semibold">Offer Price:</span> ${offer.offerPrice.toLocaleString()}</p>
                <p>
                  <span className="font-semibold">Status:</span>
                  <span className={`ml-1 px-2 py-1 rounded-full text-sm font-medium 
                    ${offer.status === 'Accepted' ? 'bg-green-100 text-green-600' : 
                      offer.status === 'Pending' ? 'bg-yellow-100 text-yellow-600' : 
                      'bg-red-100 text-red-600'}`}>
                    {offer.status}
                  </span>
                </p>
                <p><span className="font-semibold">Address:</span> {offer.address?.street}, {offer.address?.city}, {offer.address?.state}</p>
                <p><span className="font-semibold">Bed/Bath:</span> {offer.bed} Beds, {offer.bath} Baths</p>
                <p><span className="font-semibold">Sqft:</span> {offer.sqft} sqft</p>
                <p><span className="font-semibold">Type:</span> {offer.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferHistory;
