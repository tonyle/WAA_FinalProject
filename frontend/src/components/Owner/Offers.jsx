import React, { useState, useEffect } from "react";
import { useSelector, useDispatch} from "react-redux";
import { fetchOffersSuccess } from "../../store/owner/ownerSlice";
import { getOffers } from "../../api/adminApi";

const mockOffers = [
  { id: 1, property: "Luxury Apartment", amount: "$500,000", status: "Pending" },
  { id: 2, property: "Beach House", amount: "$300,000", status: "Negotiation" }
];

const Offers = () => {
// const [offers, setOffers] = useState([]);
const {offers} = useSelector((state) => state.owner);
const dispatch = useDispatch();

useEffect(() => {fetchData();}, [])

const fetchData = async () => {
    try {
      const res = await getOffers({});
      console.log(res);
      dispatch(fetchOffersSuccess({ data: res.data }));
    } catch (err) {
      console.log(err);
    }
  }

  const handleAccept = (id) => {
    setOffers(offers.map((offer) => (offer.id === id ? { ...offer, status: "Accepted" } : offer)));
  };

  const handleReject = (id) => {
    setOffers(offers.map((offer) => (offer.id === id ? { ...offer, status: "Rejected" } : offer)));
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <h1 className="text-3xl font-semibold mb-6">Offers on Your Properties</h1>
      <div className="bg-white shadow-md p-4 rounded-md">
        {offers.length === 0 ? (
          <p>No offers yet.</p>
        ) : (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Property</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id} className="border">
                  <td className="border px-4 py-2">{offer.property}</td>
                  <td className="border px-4 py-2">{offer.amount}</td>
                  <td className="border px-4 py-2">{offer.status}</td>
                  <td className="border px-4 py-2">
                    {offer.status === "Pending" && (
                      <>
                        <button onClick={() => handleAccept(offer.id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Accept</button>
                        <button onClick={() => handleReject(offer.id)} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Offers;
