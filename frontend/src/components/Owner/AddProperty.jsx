import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProperty, getProperty, putProperty } from "../../api/propertyApi";
import { addPropertySuccess } from "../../store/owner/propertySlice";
import { useNavigate, useParams } from "react-router";
import { PropertyTypes } from "../../constants/types";

const AddProperty = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { loading, error } = useSelector((state) => state.property);
    const { user } = useSelector((state) => state.auth);
    const types = [
        PropertyTypes.BOTH, PropertyTypes.SELL, PropertyTypes.RENT
    ];
    const navigate = useNavigate();

    useEffect(() => {
        console.log(id);
        if (id) {
            getPropertyDetail(id);
        }
    }, [id]);

    const getPropertyDetail = async (id) => {
        try {
            const res = await getProperty(id);
            console.log(res);
            const houseData = res.data;
            setFormData({
                name: houseData.name,
                description: houseData.description,
                type: houseData.type,
                price: houseData.price,
                bed: houseData.bed,
                bath: houseData.bath,
                sqft: houseData.sqft,
                yearBuilt: houseData.yearBuilt,
                style: houseData.style,
                city: houseData.address.city,
                postalCode: houseData.address.postalCode,
                state: houseData.address.state,
                street: houseData.address.street,
                ownerId: houseData.user.id
            });
        } catch (err) {
            console.log(err);
        }
    }

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        bed: "",
        bath: "",
        sqft: "",
        yearBuilt: "",
        houseType: "",
        style: "",
        city: "",
        postalCode: "",
        state: "",
        street: "",
        ownerId: user.id
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (id) {
            try {
                const res = await putProperty(id, formData);
                dispatch(addPropertySuccess({ data: res.data }));
                navigate(`property/${res.data.id}/upload-images`);
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const res = await addProperty(formData);
                dispatch(addPropertySuccess({ data: res.data }));
                navigate(`property/${res.data.id}/upload-images`);
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="lg:max-w-2xl max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-34 my-10">
            <h2 className="text-xl font-bold mb-4">Add Property</h2>

            {error && <p className="text-red-500">{error}</p>}
            {loading && <p className="text-blue-500">Adding property...</p>}

            <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="text-left">
                    Property Type
                    <select name="type" value={formData.type} onChange={handleChange} className="p-3 border border-slate-300 rounded bg-slate-50 w-full">
                        <option value="">Select Property Type</option>
                        {types.map((item, key) => (
                            <option key={key} value={item}>{item}</option>
                        ))}
                    </select>
                </label>

                <label className="text-left">
                    Property Name
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <label className="text-left">
                    Description
                    <input type="text" name="description" value={formData.description} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <label className="text-left">
                    House Type
                    <input type="text" name="houseType" value={formData.houseType} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="text-left">
                        Price
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                    <label className="text-left">
                        Beds
                        <input type="number" name="bed" value={formData.bed} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <label className="text-left">
                        Baths
                        <input type="number" name="bath" value={formData.bath} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                    <label className="text-left">
                        Sq Ft
                        <input type="number" name="sqft" value={formData.sqft} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                </div>

                <label className="text-left">
                    Year Built
                    <input type="number" name="yearBuilt" value={formData.yearBuilt} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <label className="text-left">
                    Style
                    <input type="text" name="style" value={formData.style} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <div className="grid grid-cols-2 gap-4">
                    <label className="text-left">
                        City
                        <input type="text" name="city" value={formData.city} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                    <label className="text-left">
                        State
                        <input type="text" name="state" value={formData.state} onChange={handleChange} className="p-2 border rounded w-full" required />
                    </label>
                </div>

                <label className="text-left">
                    Street
                    <input type="text" name="street" value={formData.street} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <label className="text-left">
                    Postal Code
                    <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="p-2 border rounded w-full" required />
                </label>

                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full" disabled={loading}>
                    {loading ? "Adding..." : "Add Property"}
                </button>
            </form>
        </div>
    );
};

export default AddProperty;
