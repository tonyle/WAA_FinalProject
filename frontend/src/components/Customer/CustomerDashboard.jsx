import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesSuccess, fetchPropertiesFail,fetchFavSuccess,fetchFavFail } from '../../store/customer/customerSlice';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa'; // Importing heart icon from FontAwesome
import { getProperties,favs,addProp,cancelProp } from '../../api/customerApi';
const CustomerDashboard = () => {
  const dispatch = useDispatch();
  const { properties, error,favorities } = useSelector((state) => state.customer);
  const [refresh, setRefresh] = useState(false);
  const [filters, setFilters] = useState({
    priceFrom: '',
    priceTo: '',
    propertyType: '',
    bed: '',
    bath: '',
    location: '',
  });
  const fetchData = async () => {
    try {
      const res = await favs();
      dispatch(fetchFavSuccess({ data: res.data }));
      console.log(favorities)
    } catch (err) {
      dispatch(fetchFavFail({ err }));
      console.log(err);
    }
  };
  const fetchFilteredProperties = async () => {
    const queryParams = {};
    if (filters.propertyType) queryParams.propertyType = filters.propertyType;
    if (filters.bed) queryParams.bed = filters.bed;
    if (filters.bath) queryParams.bath = filters.bath;
    if (filters.location) queryParams.location = filters.location;
    if (filters.priceFrom) queryParams.priceFrom = filters.priceFrom;
    if (filters.priceTo) queryParams.priceTo = filters.priceTo;
    
    // console.log(queryParams)
    try {
      const res = await getProperties(queryParams)
      dispatch(fetchPropertiesSuccess({data:res.data}));
    } catch (error) {
      dispatch(fetchPropertiesFail(error.message));
    }
  };

  useEffect(() => {
    fetchData()
    fetchFilteredProperties();
    
  }, [filters,refresh]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const toggleFavorite = async(id,propertyId) => {
    const isFavorited = favorities[0].properties.some(p => p.id === propertyId);
    if(isFavorited){
      const res = await cancelProp(id,propertyId)
      
     
      
    }else{
      const res = await addProp(id,propertyId)
      
    }
    setRefresh(!refresh)
   
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <h1 className="text-3xl font-semibold mb-8 text-center">Search for Properties</h1>

        {/* Search Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6 bg-white p-6 rounded-lg shadow-md">
          <input
            type="number"
            name="priceFrom"
            placeholder="Price From"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="priceTo"
            placeholder="Price To"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFilterChange}
          />
          <select
            name="propertyType"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            onChange={handleFilterChange}
          >
            <option value="">Property Type</option>
            <option value="SELL">For Sale</option>
            <option value="RENT">For Rent</option>
          </select>
          <input
            type="number"
            name="bed"
            placeholder="Beds"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="bath"
            placeholder="Baths"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFilterChange}
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleFilterChange}
          />
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
                  onClick={() => toggleFavorite(favorities[0].id,property.id )}
                >
                  <FaHeart className={`w-6 h-6 ${favorities.length > 0 && favorities[0].properties.some(p => p.id === property.id) ? 'text-white' : 'text-gray-600'}`} />
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
