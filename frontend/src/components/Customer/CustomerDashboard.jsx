import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Luxury Villa', price: 1200000, location: 'Los Angeles, CA', type: 'Villa', rooms: 5, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
    { id: 2, name: 'Modern Apartment', price: 850000, location: 'San Francisco, CA', type: 'Apartment', rooms: 3, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
    { id: 3, name: 'Cozy Cottage', price: 550000, location: 'Austin, TX', type: 'Cottage', rooms: 2, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
  ]);

  const [filters, setFilters] = useState({
    price: '',
    type: '',
    rooms: '',
    location: ''
  });

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredResults = searchResults.filter(property => 
    (filters.price === '' || property.price <= parseInt(filters.price)) &&
    (filters.type === '' || property.type.includes(filters.type)) &&
    (filters.rooms === '' || property.rooms === parseInt(filters.rooms)) &&
    (filters.location === '' || property.location.includes(filters.location))
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-semibold mb-8">Search for Properties</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input type="number" name="price" placeholder="Max Price" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <select name="type" className="p-3 border rounded-lg" onChange={handleFilterChange}>
            <option value="">Property Type</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Cottage">Cottage</option>
          </select>
          <input type="number" name="rooms" placeholder="Rooms" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <input type="text" name="location" placeholder="Location" className="p-3 border rounded-lg" onChange={handleFilterChange} />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map(property => (
            <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h2 className="text-xl font-semibold">{property.name}</h2>
                <p className="text-sm mt-2">{property.location}</p>
                <p className="text-sm mt-2">Type: {property.type}</p>
                <p className="text-sm mt-2">Rooms: {property.rooms}</p>
                <p className="text-xl font-semibold mt-2">${property.price.toLocaleString()}</p>
                <Link to={`property/${property.id}`}>
                      <button className="mt-4 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        View Details
                      </button>
                    </Link>
             
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};



export default CustomerDashboard;

