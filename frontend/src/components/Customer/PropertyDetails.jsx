import React, { useState } from 'react';
import { Link,useParams } from 'react-router-dom';
const PropertyDetails = () => {
    const [searchResults, setSearchResults] = useState([
        { id: 1, name: 'Luxury Villa', price: 1200000, location: 'Los Angeles, CA', type: 'Villa', rooms: 5, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
        { id: 2, name: 'Modern Apartment', price: 850000, location: 'San Francisco, CA', type: 'Apartment', rooms: 3, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
        { id: 3, name: 'Cozy Cottage', price: 550000, location: 'Austin, TX', type: 'Cottage', rooms: 2, imageUrl: 'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp' },
      ]);
    const { id } = useParams();
    const property = searchResults.find(p => p.id === parseInt(id));
  
    if (!property) return <div className="text-center mt-10 text-xl">Property not found</div>;

    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-lg p-6">
          <img src={property.imageUrl} alt={property.name} className="w-full h-64 object-cover rounded-lg" />
          <h1 className="text-3xl font-semibold mt-4">{property.name}</h1>
          <p className="text-lg mt-2">Location: {property.location}</p>
          <p className="text-lg mt-2">Type: {property.type}</p>
          <p className="text-lg mt-2">Rooms: {property.rooms}</p>
          <p className="text-2xl font-semibold mt-4">${property.price.toLocaleString()}</p>
          <Link to="/customer">
            <button className="mt-4 py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Back to Listings
            </button>
          </Link>
        </div>
      </div>
    );
  };
  export default PropertyDetails;