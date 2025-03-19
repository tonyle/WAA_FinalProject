import React, { useState, useEffect } from 'react';

const SavedProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Fetch properties (replace with actual API call)
    setProperties([
      { 
        id: 1, 
        name: 'Property 1', 
        price: '$350,000', 
        description: 'Beautiful home in a prime location', 
        imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        address: '1234 Main St, Springfield, IL',
        type: 'House',
      },
      { 
        id: 2, 
        name: 'Property 2', 
        price: '$450,000', 
        description: 'Luxury apartment with city views', 
        imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        address: '5678 Oak Ave, Chicago, IL',
        type: 'Apartment',
      },
    ]);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={property.imageUrl} alt={property.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{property.description}</p>
                <p className="text-lg font-semibold text-blue-600 mt-4">{property.price}</p>
                <p className="text-sm text-gray-500 mt-1">{property.address}</p>
                <p className="text-sm text-gray-500 mt-1">{property.type}</p>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold">Contact Agent</button>
                <button className="text-red-500 hover:text-red-700 text-sm font-semibold">Save</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedProperties;
