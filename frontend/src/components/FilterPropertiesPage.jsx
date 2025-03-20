import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesWithoutAuth } from "../api/commonApi";
import { fetchPropertiesSuccess } from "../store/hompage/homeSlice";
import PropertyCard from "./Common/PropertyCard";
import FilterComponent from "./Common/FilterComponent";
import { disabledStatuses } from "./RentPage";

const FilterPropertiesPage = () => {
    const { properties } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        propertyType: "",
        bed: "",
        bath: "",
        location: "",
        priceFrom: "",
        priceTo: ""
    });

    useEffect(() => {
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );
        fetchData(filteredParams);
    }, [dispatch, filters]);

    const fetchData = async (filterParams) => {
        try {
            const res = await getPropertiesWithoutAuth(filterParams);
            dispatch(fetchPropertiesSuccess({ data: res.data.filter((item) => !disabledStatuses.includes(item.status)) }));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full flex flex-col gap-10 mt-34">
            <FilterComponent filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {!isLoading && properties.length > 0 && properties.map((item, key) => (
                    <PropertyCard {...item} key={key} />
                ))}
            </div>
        </div>
    );
}

export default FilterPropertiesPage;
