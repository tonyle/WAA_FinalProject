import { useEffect, useState } from "react";
import "../styles/Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesSuccess } from "../store/hompage/homeSlice";
import PropertyCard from "./Common/PropertyCard";
import { PropertyTypes } from "../constants/types";
import Banner from "./Common/Banner";
import { disabledStatuses } from "./RentPage";
import { getPropertiesWithoutAuth } from "../api/commonApi";

const SellPage = () => {
    const { properties } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        try {
            const res = await getPropertiesWithoutAuth({ propertyType: PropertyTypes.SELL });
            dispatch(fetchPropertiesSuccess({ data: res.data.filter((item) => !disabledStatuses.includes(item.status)) }));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full flex flex-col gap-10 mb-10">
            {/* banner */}
            <Banner />

            {/* list properties */}
            <h2 className="text-center text-3xl font-sans font-semibold mt-10">Sell Properties</h2>

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

export default SellPage;