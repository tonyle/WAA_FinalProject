import { FaEye, FaHeart, FaRulerCombined } from "react-icons/fa";
import { FaBath, FaBed, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const defaultImg = "https://photos.zillowstatic.com/fp/3fb81689a900415f47ce917ed592a22c-cc_ft_768.webp";
const PropertyCard = (props) => {
    const { id, name, description, price, bath, bed, address, view, save, sqft, toggleFavorite, favorities, status, photos, loading } = props;
    const location = `${address.street} ${address.city} ${address.state} ${address.postalCode}`;

    const imageSrc = photos.length > 0 ? photos[0].path : defaultImg;
    const isFavorited = favorities.length > 0 && favorities.some(p => p.id === id)

    return (
        <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden ${loading ? 'cursor-progress' : ''}`}>
            {/* Heart (Favorite) Button */}
            <button
                className={`absolute top-4 right-4 p-2 rounded-full bg-white shadow-md ${loading ? 'cursor-progress' : ''}`}
                onClick={(e) => {
                    e.preventDefault(); // Prevent navigation on click
                    toggleFavorite(id);
                }}
            >
                <FaHeart className={`w-6 h-6 ${isFavorited ? 'text-red-500' : 'text-gray-400'}`} />
            </button>
            <Link to={`/property/${id}`} className={`${loading ? 'cursor-progress' : ''}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={imageSrc} alt={name} className="w-full h-64 object-cover" />
                    <div className="p-6 flex flex-col gap-3">
                        <ul className="text-xs text-gray-600 flex flex-row flex-wrap gap-4 justify-start -ml-3 -mt-4">
                            <li className="inline-flex items-center"><FaEye /> : {view}</li>
                            <li className="inline-flex items-center">Saved : {save}</li>
                            <li className="inline-flex items-center capitalize">Status : {status.toLowerCase()}</li>
                        </ul>
                        <h2 className="text-xl font-semibold text-sky-600 hover:text-sky-700">{name}</h2>
                        <p className="text-sm text-gray-500">{description}</p>
                        <p className="text-sm text-gray-600 inline-flex gap-2 justify-center items-center"><FaLocationDot className="text-sky-700" />{location}</p>
                        <ul className="text-sm text-gray-600 flex flex-row flex-wrap gap-4 justify-center">
                            <li className="inline-flex items-center"><FaBath /> : {bath}</li>
                            <li className="inline-flex items-center"><FaBed /> : {bed}</li>
                            {/* <li className="inline-flex items-center"><FaHouse /> : {houseType}</li> */}
                            <li className="inline-flex items-center"><FaRulerCombined className="size-3" /> : {sqft}</li>
                        </ul>
                        <p className="text-xl font-semibold text-sky-800 mt-5">${price}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default PropertyCard;