import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { fetchPropSuccess } from "../../store/customer/customerSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProperties } from "../../api/adminApi";
import { fetchPropertiesFail, fetchPropertiesSuccess } from "../../store/owner/ownerSlice";
import { deleteProperty } from "../../api/ownerApi";

const mockProperties = [
  { id: 1, name: "Luxury Apartment", status: "Available" },
  { id: 2, name: "Beach House", status: "Pending" },
  { id: 3, name: "Downtown Condo", status: "Contingent" }
];



const PropertyManagement = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [refresh, setRefresh] = useState(false); 
  const { properties } = useSelector((state) => state.owner);


  useEffect(() => {
    fetchData({});
  }, [refresh]);

  const fetchData = async (params) => {
    try {
      const response = await getProperties(params);
      dispatch(fetchPropertiesSuccess({ data: response.data }));
    } catch (err) {
      console.log(err);
      dispatch(fetchPropertiesFail("Can not fetch data"));
    }
  }


  //const [properties, setProperties] = useState(mockProperties);

  const handleDelete = async (id, status) => {
    if (status === "PENDING" || status === "Contingent") {
      alert("You cannot delete a property that is pending or contingent.");
      return;
    }
    try{
      const res = await deleteProperty(id);
      console.log(res)
      //dispatch(fetchPropertiesSuccess)
    } catch(err){
      //dispatch()
    }
    
    fetchData({});
    //setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Property Management</h1>
      <div className="bg-white shadow-md p-4 rounded-md flex flex-col gap-4">
        <div><Link to="/owner/create-property"><span className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Property</span></Link></div>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Property Name</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id} className="border">
                <td className="border px-4 py-2">{property.name}</td>
                <td className="border px-4 py-2">{property.status}</td>
                <td className="border px-4 py-2">
                  
                  <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2" onClick={() => navigate(`/owner/property/${property.id}`)}>
  Edit
</button>
                  <button onClick={() => handleDelete(property.id, property.status)} className="bg-red-500 text-white px-3 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyManagement;
