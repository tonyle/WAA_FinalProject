import { useState } from "react";
import { FaRedo, FaSearch } from "react-icons/fa";

const FilterComponent = ({ filters, setFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);

    const handleChange = (e) => {
        setLocalFilters({
            ...localFilters,
            [e.target.name]: e.target.value
        });
    };

    const applyFilters = () => {
        setFilters(localFilters);
    };

    const resetFilters = () => {
        const resetValues = {
            propertyType: "",
            bed: "",
            bath: "",
            location: "",
            priceFrom: "",
            priceTo: ""
        };
        setLocalFilters(resetValues);
        setFilters(resetValues);
    };

    return (
        <div className="p-10 bg-white shadow-md rounded-lg flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <input type="number" name="priceFrom" placeholder="Price From" value={localFilters.priceFrom} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="number" name="priceTo" placeholder="Price To" value={localFilters.priceTo} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <select name="propertyType" value={localFilters.propertyType} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                    <option value="">Property Type</option>
                    <option value="SELL">For Sale</option>
                    <option value="RENT">For Rent</option>
                </select>
                <input type="number" name="bed" placeholder="Beds" value={localFilters.bed} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="number" name="bath" placeholder="Baths" value={localFilters.bath} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
                <input type="text" name="location" placeholder="Location" value={localFilters.location} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div className="flex gap-4 mt-4 justify-end">
                <button onClick={applyFilters} className="flex items-center justify-center gap-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    <FaSearch /> Search
                </button>
                <button onClick={resetFilters} className="flex items-center justify-center gap-2 p-3 bg-gray-400 text-white rounded-lg hover:bg-slate-500 transition">
                    <FaRedo /> Reset
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
