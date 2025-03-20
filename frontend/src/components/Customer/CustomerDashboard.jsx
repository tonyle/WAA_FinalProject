import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesSuccess, fetchPropertiesFail } from '../../store/customer/customerSlice';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa'; // Importing heart icon from FontAwesome

const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { properties, error } = useSelector((state) => state.customer);
  const { favorities } = useSelector((state) => state.customer);
  const [favorites, setFavorites] = useState([]);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    propertyType: '',
    bed: '',
    bath: '',
    location: '',
  });
  
  const fetchFilteredProperties = async () => {
    const queryParams = new URLSearchParams();
    if (filters.propertyType) queryParams.append('propertyType', filters.propertyType);
    if (filters.bed) queryParams.append('bed', filters.bed);
    if (filters.bath) queryParams.append('bath', filters.bath);
    if (filters.location) queryParams.append('location', filters.location);
    if (filters.priceFrom) queryParams.append('priceFrom', filters.priceFrom);
    if (filters.priceTo) queryParams.append('priceTo', filters.priceTo);

    try {
      const response = await axios.get(`https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1/properties?${queryParams.toString()}`);
      dispatch(fetchPropertiesSuccess(response.data));
    } catch (error) {
      dispatch(fetchPropertiesFail(error.message));
    }
  };

  useEffect(() => {
    fetchFilteredProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleFavorite = (propertyId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(propertyId)
        ? prevFavorites.filter((id) => id !== propertyId)
        : [...prevFavorites, propertyId]
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-semibold mb-8 text-center">Search for Properties</h1>

        {/* Search Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <input type="number" name="priceFrom" placeholder="Price From" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <input type="number" name="priceTo" placeholder="Price To" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <select name="propertyType" className="p-3 border rounded-lg" onChange={handleFilterChange}>
            <option value="">Property Type</option>
            <option value="SELL">For Sale</option>
            <option value="RENT">For Rent</option>
          </select>
          <input type="number" name="bed" placeholder="Beds" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <input type="number" name="bath" placeholder="Baths" className="p-3 border rounded-lg" onChange={handleFilterChange} />
          <input type="text" name="location" placeholder="Location" className="p-3 border rounded-lg" onChange={handleFilterChange} />
        </div>

        {/* Error State */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Displaying Properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties && properties.length > 0 ? (
            properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden relative">
                {/* Heart Button */}
                <button
                  className={`absolute top-4 right-4 p-2 rounded-full 
                    
                   `}
                  onClick={() => toggleFavorite(property.id)}
                >
                  <FaHeart className={`w-6 h-6 ${favorites.includes(property.id) ? 'text-white' : 'text-gray-600'}`} />
                </button>

                {/* Property Image */}
                <img
                  src={property.imageUrl || 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'}
                  alt={property.name}
                  className="w-full h-56 object-cover"
                />

                {/* Property Details */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{property.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{`${property.address.city}, ${property.address.state}`}</p>
                  <p className="text-sm text-gray-700">Type: {property.type}</p>
                  <p className="text-sm text-gray-700">Beds: {property.bed}</p>
                  <p className="text-sm text-gray-700">Baths: {property.bath}</p>
                  <p className="text-sm text-gray-700">Sqft: {property.sqft}</p>
                  <p className="text-xl font-semibold text-blue-600 mt-2">${property.price.toLocaleString()}</p>

                  {/* View Details Button */}
                  <Link to={`property/${property.id}`}>
                    <button className="mt-4 w-full py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center">No properties found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
