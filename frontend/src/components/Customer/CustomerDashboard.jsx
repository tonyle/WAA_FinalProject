import React,{useEffect,useState} from 'react';
import { Link, } from 'react-router-dom';

const CustomerDashboard = () => {
  const [searchResults, setSearchResults] = useState([
    { 
      id: 1, 
      name: 'Luxury Villa', 
      price: '$1,200,000', 
      location: 'Los Angeles, CA', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
    { 
      id: 2, 
      name: 'Modern Apartment', 
      price: '$850,000', 
      location: 'San Francisco, CA', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
    { 
      id: 3, 
      name: 'Cozy Cottage', 
      price: '$550,000', 
      location: 'Austin, TX', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
    { 
      id: 1, 
      name: 'Luxury Villa', 
      price: '$1,200,000', 
      location: 'Los Angeles, CA', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
    { 
      id: 2, 
      name: 'Modern Apartment', 
      price: '$850,000', 
      location: 'San Francisco, CA', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
    { 
      id: 3, 
      name: 'Cozy Cottage', 
      price: '$550,000', 
      location: 'Austin, TX', 
      imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp', 
    },
  ]);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Search for Properties</h1>
        <div className="mb-6">
          <input 
            type="text" 
            placeholder="Search by location, type, or price" 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{property.location}</p>
                <p className="text-xl font-semibold text-gray-800 mt-2">{property.price}</p>
                <button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
