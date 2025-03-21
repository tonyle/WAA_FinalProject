import { useEffect, useState } from "react";
import "../styles/Homepage.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPropertiesSuccess } from "../store/hompage/homeSlice";
import PropertyCard from "./Common/PropertyCard";
import { getPropertiesWithoutAuth } from "../api/commonApi";
import { disabledStatuses } from "./RentPage";
import FilterComponent from "./Common/FilterComponent";
import { useNavigate } from "react-router";
import { addFav, addProp, cancelProp, favs } from "../api/customerApi";
import { fetchFavSuccess, fetchFavFail } from "../store/customer/customerSlice";
import { store } from "../store";

const Homepage = () => {
    const { properties } = useSelector((state) => state.home);
    const [favorities, setFav] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [favoriteId, setFavoriteId] = useState(null);
    const [filters, setFilters] = useState({
        propertyType: "",
        bed: "",
        bath: "",
        location: "",
        priceFrom: "",
        priceTo: ""
    });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const filteredParams = Object.fromEntries(
            Object.entries(filters).filter(([_, value]) => value !== "")
        );
        fetchData(filteredParams);

        if (user) {
            fetchDataFav();
        }
    }, [dispatch, filters]);

    const fetchDataFav = async () => {
        try {
            const res = await favs();

            if (res.data.length > 0) {
                setFav(res.data[0].properties || []);
                setFavoriteId(res.data[0].id);
                setLoading(false);
                dispatch(fetchFavSuccess({ data: res.data }));
            } else {
                await addFav();
            }

        } catch (err) {
            dispatch(fetchFavFail({ err }));
            console.log(err);
        }
    };

    const fetchData = async (filterParams) => {
        try {
            const res = await getPropertiesWithoutAuth(filterParams);
            dispatch(fetchPropertiesSuccess({ data: res.data.filter((item) => !disabledStatuses.includes(item.status)) }));
            setIsLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const toggleFavorite = async (propertyId) => {
        if (!user) {
            navigate("/auth/login");
            return;
        }
        if (!favoriteId) {
            alert("Wrong")
            return;
        }
        if (loading) return;

        setLoading(true);
        let isFavorited = false;
        if (favorities.length > 0) {
            isFavorited = favorities.some(p => p.id === propertyId);
        }
        if (isFavorited) {
            const res = await cancelProp(favoriteId, propertyId)
        } else {
            const res = await addProp(favoriteId, propertyId)
        }

        await fetchDataFav();
        // const updatedFavorities = store.getState().customer.favorities; // Get the latest Redux state
        // if (updatedFavorities.length > 0) {
        //     await addProp(updatedFavorities[0].id, propertyId);
        // }
    };

    return (
        <div className={`w-full flex flex-col gap-10 mt-34 ${loading ? 'cursor-progress' : ''}`}>
            <FilterComponent filters={filters} setFilters={setFilters} />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {!isLoading && properties.length > 0 && properties.map((item, key) => (
                    <PropertyCard {...item} key={key} toggleFavorite={toggleFavorite} favorities={favorities} loading={loading} />
                ))}
            </div>
        </div>
    );
}

export default Homepage;