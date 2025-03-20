import { useEffect, useState } from "react";
import "../styles/Homepage.css";
import { getProperties } from "../api/adminApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesSuccess } from "../store/hompage/homeSlice";
import PropertyCard from "./Common/PropertyCard";
import { PropertyTypes } from "../constants/types";

const SellPage = () => {
    const { properties } = useSelector((state) => state.home);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    const fetchData = async () => {
        try {
            const res = await getProperties({ propertyType: PropertyTypes.SELL });
            dispatch(fetchPropertiesSuccess({ data: res.data }));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="w-full flex flex-col gap-10">
            {/* banner */}
            <div className="banner h-90">
                <h1 className="font-sans">Group <span className="font-mono">4</span></h1>
                <ul className="members">
                    <li>Xuan Huong Le</li>
                    <li>Quang Nhien Luu</li>
                    <li>Devesh Mittal</li>
                    <li>Gantogtokh Oyundalai</li>
                    <li>Thi Thanh Sen Doan</li>
                </ul>
            </div>

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