import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersSuccess } from '../../store/admin/adminSlice';
import { getOffers } from '../../api/adminApi';
import { OfferStatuses } from '../../constants/types';

const OfferManagement = () => {
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.admin);
  const renderBadgeClass = (status) => {
    return status === OfferStatuses.ACCEPTED ? "badge-active" : "badge-deactive";
  };

  useEffect(() => {
    // fetch data
    fetchData();
  }, [dispatch]);

  const fetchData = async () => {
    try {
      const res = await getOffers({});
      dispatch(fetchOffersSuccess({ data: res.data }));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-medium text-left">Customers</h2>

      {/* table */}
      <div className='flex flex-row gap-2 w-full overflow-x-auto'>
        <table className="border-collapse table-auto w-full">
          <thead>
            <tr>
              {/* <th><input type="checkbox" name="check_all" /></th> */}
              <th>Id</th>
              <th>Property</th>
              <th>User</th>
              <th>Type</th>
              <th>Offer Price</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {offers && offers.length > 0 ? (
              <>
                {
                  offers.map((item, key) => (
                    <tr key={key}>
                      {/* <td><input type='checkbox' name={item.id}/></td> */}
                      <td>{item.id}</td>
                      <td>{item.property.name}</td>
                      <td>{item.user.name}</td>
                      <td>{item.type}</td>
                      <td>{item.offerPrice}</td>
                      <td><span className={`badge ${renderBadgeClass(item.status)}`}>{item.status.toLowerCase()}</span></td>
                    </tr>
                  ))
                }
              </>
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">No offer found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OfferManagement;