import { UserRole } from '../constants/role';
import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfDetail, offerProperty, favs, addFav, cancelProp, addProp } from './../api/customerApi';
import { fetchPropSuccess, fetchPropFail, fetchFavFail, fetchFavSuccess } from './../store/customer/customerSlice';

const PropertyDetailsPage = () => {
    const { property, favorities } = useSelector(state => state.customer);
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, role } = useSelector(state => state.auth);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [offerPrice, setOfferPrice] = useState('');
    
    const defaultPhotos = [
        'https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp'
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProfDetail(id);
                dispatch(fetchPropSuccess({ data: res.data }));
            } catch (err) {
                dispatch(fetchPropFail({ err }));
                console.error(err);
            }
        };

        const fetchDataFav = async () => {
            try {
                const res = await favs();
                dispatch(fetchFavSuccess({ data: res.data }));
            } catch (err) {
                dispatch(fetchFavFail({ err }));
                console.error(err);
            }
        };

        fetchDataFav();
        fetchData();
    }, [refresh, dispatch, id]);

    const toggleFavorite = async () => {
        if (user && role === UserRole.CUSTOMER) {
            try {
           
                if (favorities.length > 0) {
                    const isFavorited = favorities[0].properties.some(p => p.id == id);
                    if (isFavorited) {
                        await cancelProp(favorities[0].id, id);
                    } else {
                        await addProp(favorities[0].id, id);
                    }
                } else {
                    await addFav();
                    await favs();
                }
                setRefresh(prev => !prev);
            } catch (error) {
                console.error("Error toggling favorite:", error);
            }
        }else{
            navigate("/auth/login");
        }
       
    };

    const openModal = () => {
        if (user && role === UserRole.CUSTOMER) {
            setIsModalOpen(true);
        } else {
            navigate("/auth/login");
        }
    };

    const handleMakeOffer = async () => {
        if (!offerPrice || isNaN(offerPrice) || offerPrice <= 0) {
            alert('Please enter a valid price.');
            return;
        }
        try {
            await offerProperty({ propertyId: id, offerPrice:offerPrice });
            setIsModalOpen(false);
            setOfferPrice('');
        } catch (error) {
            console.error(error);
        }
    };

    if (!property) return <div className="text-center mt-10 text-xl">Property not found</div>;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
            <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-6 space-y-6">
                <h1 className="text-4xl font-semibold mb-6">{property.name}</h1>
                <div className="flex space-x-4 overflow-x-auto pb-6">
                    {(property.photos?.length ? property.photos : defaultPhotos).map((photo, index) => (
                        <img key={index} src={photo.path || photo} className="w-60 h-60 object-cover rounded-lg shadow-md" />
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                    <p>Type: {property.type}</p>
                    <p>Price: ${property.price.toLocaleString()}</p>
                    <p>Description: {property.description}</p>
                    <p>Style: {property.style}</p>
                    <p>House Type: {property.houseType}</p>
                    <p>Status: {property.status}</p>
                    <p>Bed: {property.bed}</p>
                    <p>Bath: {property.bath}</p>
                    <p>Sqft: {property.sqft}</p>
                    <p>Year Built: {property.yearBuilt}</p>
                    <p>View: {property.view}</p>
                </div>
                
                <p className="text-3xl font-semibold mt-4 text-blue-600">${property.price.toLocaleString()}</p>

                <div className="flex justify-between mt-6">
                    <Link to="/">
                        <button className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600">Back to Listings</button>
                    </Link>
                    <button className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={toggleFavorite}>
                        {favorities?.length > 0 && favorities[0]?.properties?.some(p => p.id == id) ? 'Remove from Favorites ❤️' : 'Add to Favorites 🤍'}
                    </button>
                    {!(property.status === "CONTINGENCY" || property.status === "DEACTIVATED") && (
                        <button className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={openModal}>
                            Make Offer
                        </button>
                    )}
                </div>
            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-opacity-90 backdrop-blur-sm flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">Make an Offer</h2>
                        <label className="block mb-2">Offer Price ${property.price.toLocaleString()}</label>
                        <input type="number" value={offerPrice} onChange={(e) => setOfferPrice(e.target.value)} className="w-full p-2 border rounded-lg mb-4" placeholder="Enter your offer" />
                        <div className="flex justify-end space-x-4">
                            <button className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500" onClick={() => setIsModalOpen(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={handleMakeOffer}>Submit Offer</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default PropertyDetailsPage;
