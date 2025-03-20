import React from "react";
import { Link } from "react-router-dom";

const OwnerDashboard = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Owner Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/owner/properties" className="bg-blue-500 text-white p-4 rounded-md text-center">Manage Properties</Link>
        <Link to="/owner/current-offers" className="bg-green-500 text-white p-4 rounded-md text-center">Current Offers</Link>
        <Link to="/owner/offer-history" className="bg-yellow-500 text-white p-4 rounded-md text-center">Offer History</Link>
        <Link to="/owner/messages" className="bg-gray-500 text-white p-4 rounded-md text-center">Messages</Link>
      </div>
    </div>
  );
};

export default OwnerDashboard;
