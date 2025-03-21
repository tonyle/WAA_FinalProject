import { useEffect, useState } from "react";
import "../styles/Homepage.css";
import { getProperties } from "../api/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesSuccess } from "../store/hompage/homeSlice";
import PropertyCard from "./Common/PropertyCard";
import { PropertyStatuses, PropertyTypes } from "../constants/types";
import Banner from "./Common/Banner";
import { getPropertiesWithoutAuth } from "../api/commonApi";

export const disabledStatuses = [PropertyStatuses.NEW, PropertyStatuses.DEACTIVATED];

const RentPage = () => {
    const { properties } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        try {
            const res = await getPropertiesWithoutAuth({ propertyType: PropertyTypes.RENT });
            dispatch(fetchPropertiesSuccess({ data: res.data.filter((item) => !disabledStatuses.includes(item.status)) }));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full flex flex-col gap-10">
            {/* banner */}
            <Banner />

            {/* list properties */}
            <h2 className="text-center text-3xl font-sans font-semibold mt-10">Rent Properties</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {!isLoading && properties.length > 0 && properties.map((item, key) => {
                    return (
                        <PropertyCard {...item} key={key} />
                    )
                })}
            </div>
        </div>
    );
}

export default RentPage;