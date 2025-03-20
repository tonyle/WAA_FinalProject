import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { cancelProp,favs } from '../../api/customerApi';
import { fetchFavSuccess, fetchFavFail } from '../../store/customer/customerSlice';
// import { Link } from 'react-router-dom';
const SavedProperties = () => {
  const { favorities } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false); 
  // State for managing the user modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const isEmpty = !favorities.length || !favorities[0].properties.length;
  const fetchData = async () => {
    try {
      const res = await favs();
      dispatch(fetchFavSuccess({ data: res.data }));
    } catch (err) {
      dispatch(fetchFavFail({ err }));
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData()
  }, [refresh,dispatch]);

  const handleContactAgent = (user) => {
    // Set the selected user and show the modal
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };
  const handleRemove = async(id,proid) => {
    const res = await cancelProp(id,proid)
    if(res){
      setRefresh(!refresh)
    }
  
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-12">
       
          {isEmpty ? "No Saved Properties" : favorities[0]?.name}
        
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorities?.length > 0 ? (
            favorities[0].properties.map((property) => (
              <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src={property.photos&&property.photos.length>0? property.photos[property.photos.length-1].path:"https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp"} 
                  alt={property.name} 
                  className="w-full h-64 object-cover" 
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800">{property.name}</h2>
                  <p className="text-sm text-gray-600 mt-1">{`${property.address.city}, ${property.address.state}`}</p>
                  <p className="text-sm text-gray-700">Type: {property.type}</p>
                  <p className="text-sm text-gray-700">Description: {property.description}</p>
                  <p className="text-sm text-gray-700">Beds: {property.bed}</p>
                  <p className="text-sm text-gray-700">Baths: {property.bath}</p>
                  <p className="text-sm text-gray-700">Sqft: {property.sqft}</p>
                  <p className="text-xl font-semibold text-blue-600 mt-2">${property.price.toLocaleString()}</p>

                </div>
                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                    onClick={() => handleContactAgent(property.user)} // Pass the user details here
                  >
                    Contact Agent
                  </button>
                  {/* <Link to={`property/${property.id}`}>
              
           
                  <button 
                    className="text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
                     // Show property details
                  >
                    Details
                  </button>
                  </Link> */}
                  <button onClick={()=>handleRemove(favorities[0].id,property.id)} className="text-red-500 hover:text-red-700 text-sm font-semibold">Remove</button>
                </div>
              
                
             
                
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-3">No saved properties available.</p>
          )}
        </div>
      </div>

      {/* Modal for showing user details */}
      {showModal && selectedUser && (
        <div className="fixed inset-0  bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Agent Details</h2>
            <p><strong>Name:</strong> {selectedUser.name}</p>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Company:</strong> {selectedUser.company}</p>
            <button 
              onClick={handleCloseModal} 
              className="mt-4 text-red-500 hover:text-red-700 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedProperties;
