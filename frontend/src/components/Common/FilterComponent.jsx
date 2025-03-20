import { useState } from "react";
import { PropertyTypes } from "../../constants/types";
import { FaRedo, FaSearch } from "react-icons/fa";

const FilterComponent = ({ filters, setFilters }) => {
    const [localFilters, setLocalFilters] = useState(filters);
    const types = [
        PropertyTypes.BOTH, PropertyTypes.SELL, PropertyTypes.RENT
    ]

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
        <div className="p-6 bg-white shadow-md rounded-lg flex flex-col gap-4 bg-gradient-to-b from-sky-400 via-sky-200 to-slate-100">
            <h2 className="text-xl font-normal text-gray-800">Filter Properties</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <select name="propertyType" value={localFilters.propertyType} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50">
                    <option value="">Property Type</option>
                    {types.map((item, key) => (
                        <option key={key} value={item}>{item}</option>
                    ))}
                </select>

                <input type="text" name="location" placeholder="Location" value={localFilters.location} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50" />

                <select name="bed" value={localFilters.bed} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50">
                    <option value="">Beds</option>
                    {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}+</option>)}
                </select>

                <select name="bath" value={localFilters.bath} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50">
                    <option value="">Baths</option>
                    {[1, 2, 3, 4, 5].map(num => <option key={num} value={num}>{num}+</option>)}
                </select>

                <input type="number" name="priceFrom" placeholder="Min Price" value={localFilters.priceFrom} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50" />
                <input type="number" name="priceTo" placeholder="Max Price" value={localFilters.priceTo} onChange={handleChange} className="p-3 border border-slate-100 rounded bg-slate-50" />
            </div>

            <div className="flex gap-4 mt-4 justify-end">
                <button onClick={applyFilters} className="flex items-center justify-center gap-2 p-3 bg-sky-700 text-white rounded hover:bg-sky-700 transition">
                    <FaSearch /> Search
                </button>
                <button onClick={resetFilters} className="flex items-center justify-center gap-2 p-3 bg-gray-400 text-white rounded hover:bg-slate-500 transition">
                    <FaRedo /> Reset
                </button>
            </div>
        </div>
    );
};

export default FilterComponent;
