import { FaBath, FaBed, FaHouse, FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router";

const PropertyCard = (props) => {
    const { name, description, price, bath, bed, houseType, address } = props;
    const location = `${address.street} ${address.city} ${address.state} ${address.postalCode}`;
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src="https://coffective.com/wp-content/uploads/2018/06/default-featured-image.png.jpg" alt={name} className="w-full object-cover" />
            <div className="p-6 flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-sm text-gray-600">{description}</p>
                <p className="text-sm text-gray-600 inline-flex gap-2 justify-center items-center"><FaLocationDot className="text-sky-700"/>{location}</p>
                <ul className="text-sm text-gray-600 inline-flex gap-4 justify-center">
                    <li className="inline-flex items-center"><FaBath /> : {bath}</li>
                    <li className="inline-flex items-center"><FaBed /> : {bed}</li>
                    <li className="inline-flex items-center"><FaHouse /> : {houseType}</li>
                </ul>
                <p className="text-xl font-semibold text-gray-800">{price}</p>
                <Link to="">
                    <span className="py-2 px-6 bg-sky-500 font-medium text-white text-sm rounded-lg hover:bg-sky-600">
                        View Details
                    </span>
                </Link>
            </div>
        </div>
    )
}

export default PropertyCard;