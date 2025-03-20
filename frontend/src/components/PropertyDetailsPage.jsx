import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPropertieDetailsWithoutAuth, makeOffer } from '../api/commonApi';
import { fetchPropertyDetailsSuccess } from '../store/hompage/homeSlice';
import { UserRole } from '../constants/role';

const PropertyDetailsPage = () => {
    const { propertyDetails } = useSelector((state) => state.home);
    const { user, role } = useSelector(state => state.auth); 
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [offerPrice, setOfferPrice] = useState('');
    const photos = [
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp',
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'
    ];
    useEffect(() => {
        fetchDetails(id);

    }, [id, dispatch]);

    const fetchDetails = async(id) => {
        try {
            const res = await getPropertieDetailsWithoutAuth(id);
            dispatch(fetchPropertyDetailsSuccess({data: res.data}));
        } catch (err) {
            console.log(err);
        }
    }

    if (!propertyDetails) return <div className="text-center mt-10 text-xl">Property not found</div>;

    // Handle offer submission
    const handleMakeOffer = async () => {
        if (!offerPrice || isNaN(offerPrice) || offerPrice <= 0) {
            alert('Please enter a valid price.');
            return;
        }
        try {
            const response = await makeOffer({
                propertyId: id,
                price: offerPrice,
            });
            console.log(response.data)
            // alert("Offer submitted successfully!");
            setIsModalOpen(false);
            setOfferPrice('');
        } catch (error) {
            alert("Failed to submit offer. Please try again.");
            console.error(error);
        }
    };

    const openModel = () => {
        if (user && role == UserRole.CUSTOMER) {
            setIsModalOpen(true);
            return;
        } else if (!user) {
            navigate("/auth/login");
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h1 className="text-4xl font-semibold mb-6">{propertyDetails.name}</h1>
                <div className="flex space-x-4 overflow-x-auto pb-6">
                    {photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            className="w-60 h-60 object-cover rounded-lg shadow-md"
                        />
                    ))}
                </div>
                {/* Property Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <p className="text-sm text-gray-600">Type: {propertyDetails.type}</p>
                    <p className="text-sm text-gray-600">Price: ${propertyDetails.price.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Description: {propertyDetails.description}</p>
                    <p className="text-sm text-gray-600">Style: {propertyDetails.style}</p>
                    <p className="text-sm text-gray-600">House Type: {propertyDetails.houseType}</p>
                    <p className="text-sm text-gray-600">Bed: {propertyDetails.bed}</p>
                    <p className="text-sm text-gray-600">Bath: {propertyDetails.bath}</p>
                    <p className="text-sm text-gray-600">Sqft: {propertyDetails.sqft}</p>
                    <p className="text-sm text-gray-600">Year Built: {propertyDetails.yearBuilt}</p>
                    <p className="text-sm text-gray-600">View: {propertyDetails.view}</p>
                </div>

                {/* Price */}
                <p className="text-3xl font-semibold mt-4 text-blue-600">${propertyDetails.price.toLocaleString()}</p>

                {/* Buttons */}
                {role !== UserRole.OWNER && (
                    <div className="flex justify-between mt-6">
                        <button
                            className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            onClick={openModel}
                        >
                            Make Offer
                        </button>
                    </div>
                )}
            </div>

            {/* Offer Modal */}
            {isModalOpen && (
                <div className="fixed inset-0  bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 backdrop-blur-sm">
                        <h2 className="text-2xl font-semibold mb-4">Make an Offer</h2>
                        <label className="block mb-2 text-sm text-gray-700">Offer Price ($)</label>
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

export default PropertyDetailsPage;
