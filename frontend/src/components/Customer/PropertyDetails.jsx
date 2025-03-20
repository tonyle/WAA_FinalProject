import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfDetail ,offerProperty} from '../../api/customerApi';
import { fetchPropSuccess, fetchPropFail } from '../../store/customer/customerSlice';
const PropertyDetails = () => {
    const { property } = useSelector((state) => state.customer);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offerPrice, setOfferPrice] = useState('');
    const photos =[
      'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      'https://photos.zillowstatic.com/fp/855d877938d29206f82572a37985919e-cc_ft_1536.webp',
      'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
      'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'
  ] ;
  const fetchData = async () => {
    try {
      const res = await getProfDetail(id);
      dispatch(fetchPropSuccess({ data: res.data }));
    } catch (err) {
      dispatch(fetchPropFail({ err }));
      console.log(err);
    }
  };
    useEffect(() => {
      fetchData(id)
    }, []);

    if (!property) return <div className="text-center mt-10 text-xl">Property not found</div>;

    // Handle offer submission
    const handleMakeOffer =async () => {
        if (!offerPrice || isNaN(offerPrice) || offerPrice <= 0) {
            alert('Please enter a valid price.');
            return;
        }
      
        try {
          const response = await offerProperty({
            propertyId: id,
            price: offerPrice,
        })
         
          // await axios.post(
          //     'https://finalprojectbackend-cyhghxg2hvemcfg2.canadacentral-01.azurewebsites.net/api/v1/offers',
          //     {
          //         propertyId: id,
          //         price: offerPrice,
          //     },
          //     {
          //         headers: {
          //             Authorization: `Bearer ${accessToken}`,
          //             'Content-Type': 'application/json',
          //         },
          //     }
          // );
          // console.log(response.data)
          // alert("Offer submitted successfully!");
          setIsModalOpen(false);
          setOfferPrice('');
      } catch (error) {
          // alert("Failed to submit offer. Please try again.");
          console.error(error);
      }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h1 className="text-4xl font-semibold mb-6">{property.name}</h1>
                <div className="flex space-x-4 overflow-x-auto pb-6">
                  {property.photos&&property.photos.length>0 ? property.photos.map((photo, index) => (
                      <img 
                          key={index} 
                          src={photo.path&&photo.path.length>20 ? photo.path:'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'}   
                          className="w-60 h-60 object-cover rounded-lg shadow-md"
                      />
                  )):photos.map((photo, index) => (
                      <img 
                          key={index} 
                          src={photo}   
                          className="w-60 h-60 object-cover rounded-lg shadow-md"
                      />
                  ))
                }
              </div>
                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <p className="text-sm text-gray-600">Type: {property.type}</p>
                    <p className="text-sm text-gray-600">Price: ${property.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Description: {property.description}</p>
                    <p className="text-sm text-gray-600">Style: {property.style}</p>
                    <p className="text-sm text-gray-600">House Type: {property.houseType}</p>
                    <p className="text-sm text-gray-600">Status: {property.status}</p>
                    <p className="text-sm text-gray-600">Bed: {property.bed}</p>
                    <p className="text-sm text-gray-600">Bath: {property.bath}</p>
                    <p className="text-sm text-gray-600">Sqft: {property.sqft}</p>
                    <p className="text-sm text-gray-600">Year Built: {property.yearBuilt}</p>
                    <p className="text-sm text-gray-600">View: {property.view}</p>
                </div>

                {/* Price */}
                <p className="text-3xl font-semibold mt-4 text-blue-600">${property.price.toLocaleString()}</p>

                {/* Buttons */}
                <div className="flex justify-between mt-6">
                    <Link to="/customer">
                        <button className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                            Back to Listings
                        </button>
                    </Link>

                      {!(property.status === "CONTINGENCY" || property.status === "DEACTIVATED") && (
                          <button
                              className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              onClick={() => setIsModalOpen(true)}
                          >
                              Make Offer
                          </button>
                      )}
                </div>
            </div>

            {/* Offer Modal */}
            {isModalOpen && (
            <div className="fixed inset-0  bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
                  <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 backdrop-blur-sm">
                      <h2 className="text-2xl font-semibold mb-4">Make an Offer</h2>
                      <label className="block mb-2 text-sm text-gray-700">Offer Price {property.price.toLocaleString()}($)</label>
                      <input
                          type="number"
                          value={offerPrice}
                          onChange={(e) => setOfferPrice(e.target.value)}
                          className="w-full p-2 border rounded-lg mb-4"
                          placeholder="Enter your offer"
                      />
                      <div className="flex justify-end space-x-4">
                          <button
                              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
                              onClick={() => setIsModalOpen(false)}
                          >
                              Cancel
                          </button>
                          <button
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                              onClick={handleMakeOffer}
                          >
                              Submit Offer
                          </button>
                      </div>
                  </div>
              </div>
          )}
        </div>
    );
};

export default PropertyDetails;
