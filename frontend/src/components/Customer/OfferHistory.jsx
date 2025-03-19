import React,{useState,useEffect} from 'react';

const OfferHistory = () => {
  const [offerHistory, setOfferHistory] = useState([]);

  useEffect(() => {
    // Replace with actual API call to fetch offer history
    setOfferHistory([
      { 
        id: 1, 
        propertyName: 'Property 1', 
        offerPrice: '$350,000', 
        offerDate: '2025-03-01', 
        status: 'Pending',
        imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      },
      { 
        id: 2, 
        propertyName: 'Property 2', 
        offerPrice: '$450,000', 
        offerDate: '2025-02-20', 
        status: 'Accepted',
        imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      },
      { 
        id: 3, 
        propertyName: 'Property 3', 
        offerPrice: '$500,000', 
        offerDate: '2025-01-10', 
        status: 'Canceled',
        imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      },
    ]);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Offer History</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offerHistory.map(offer => (
            <div key={offer.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={offer.imageUrl} alt={offer.propertyName} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{offer.propertyName}</h2>
                <p className="text-sm text-gray-600 mt-2">Offer Price: {offer.offerPrice}</p>
                <p className="text-sm text-gray-500 mt-1">Offer Date: {offer.offerDate}</p>
                <p className={`text-sm mt-2 ${offer.status === 'Accepted' ? 'text-green-500' : offer.status === 'Pending' ? 'text-yellow-500' : 'text-red-500'}`}>Status: {offer.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfferHistory;
