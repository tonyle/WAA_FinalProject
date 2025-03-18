import React, { useState } from "react";

const mockProperties = [
  { id: 1, name: "Luxury Apartment", status: "Available" },
  { id: 2, name: "Beach House", status: "Pending" },
  { id: 3, name: "Downtown Condo", status: "Contingent" }
];

const PropertyManagement = () => {
  const [properties, setProperties] = useState(mockProperties);

  const handleDelete = (id, status) => {
    if (status === "Pending" || status === "Contingent") {
      alert("You cannot delete a property that is pending or contingent.");
      return;
    }
    setProperties(properties.filter((property) => property.id !== id));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Property Management</h1>
      <div className="bg-white shadow-md p-4 rounded-md">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add New Property</button>
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
                  <button className="bg-gray-500 text-white px-3 py-1 rounded mr-2">Edit</button>
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
