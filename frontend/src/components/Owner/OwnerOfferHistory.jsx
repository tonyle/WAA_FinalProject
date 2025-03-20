import React, { useState, useEffect } from "react";

const mockOfferHistory = [
  { id: 1, property: "Luxury Apartment", amount: "$500,000", status: "Accepted" },
  { id: 2, property: "Beach House", amount: "$300,000", status: "Rejected" },
  { id: 3, property: "Downtown Condo", amount: "$450,000", status: "Pending" }
];

const OwnerOfferHistory = () => {
  const [offerHistory, setOfferHistory] = useState([]);

  useEffect(() => {
    setOfferHistory(mockOfferHistory);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Offer History</h1>
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-4">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase">Property</th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 bg-gray-200 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {offerHistory.map((offer) => (
                <tr key={offer.id} className="border-b">
                  <td className="px-6 py-4 text-gray-700">{offer.property}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.amount}</td>
                  <td className="px-6 py-4 text-gray-700">{offer.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OwnerOfferHistory;
