import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/owner" style={{ color: 'white' }} className="bg-blue-500 p-4 rounded-md text-center">Dashboard</Link>
        <Link to="/owner/property-management" style={{ color: 'white' }} className="bg-green-500 p-4 rounded-md text-center">Manage Properties</Link>
        <Link to="/owner/offers" style={{ color: 'white' }} className="bg-yellow-500 p-4 rounded-md text-center">View Offers</Link>
        <Link to="/owner/messages" style={{ color: 'white' }} className="bg-gray-500 p-4 rounded-md text-center">Messages</Link>
      </div>
    </div>
  );
};

export default OwnerDashboard;
