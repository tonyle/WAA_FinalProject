import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOffersSuccess } from '../../store/admin/adminSlice';
import { getOffers } from '../../api/adminApi';
import { OfferStatuses } from '../../constants/types';

const OfferManagement = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const { offers } = useSelector((state) => state.admin);
  const [searchText, setSearchText] = useState("");
  const renderBadgeClass = (status) => {
    return status === OfferStatuses.ACCEPTED ? "badge-active" : "badge-deactive";
  };
  const [params, setParams] = useState({});

  useEffect(() => {
    // fetch data
    fetchData();
  }, [tab]);

  const fetchData = async () => {
    try {
      const res = await getOffers({});
      dispatch(fetchOffersSuccess({ data: res.data }));
    } catch (err) {
      console.log(err);
    }
  }

  const onHandleActiveAndDeactive = (id) => {
    const updatedOwners = offers.map((owner) =>
      owner.id === id ? { ...owner, status: owner.status === "Active" ? "Inactive" : "Active" } : owner
    );

    dispatch(fetchOffersSuccess({ data: updatedOwners }));
  };

  const handleSearchOwners = () => {
    // fetch API
    setSearchText("");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-medium text-left">Customers</h2>

      {/* tabs */}
      <div className='flex flex-row gap-0 items-center justify-start border-b border-gray-200 tabs'>
        <div className={`${tab === 0 ? 'active' : ''} tab-item`} onClick={() => setTab(0)}>All</div>
        <div className={`${tab === 1 ? 'active' : ''} tab-item`} onClick={() => setTab(1)}>Active</div>
      </div>

      {/* Search item */}
      {/* <div className='flex flex-row justify-end w-full items-stretch'>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" className='border border-gray-200 p-2 rounded-l-md outline-0' />
        <button onClick={handleSearchOwners} className='search-button'>Search</button>
      </div> */}

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
              {/* <th>Actions</th> */}
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
                      {/* <td>
                        <button
                          onClick={() => onHandleActiveAndDeactive(item.id)}
                          className={`${item.status === 'Active' ? 'bg-slate-200' : 'text-green-500 bg-green-50'} text-xs px-5 cursor-pointer`}
                        >
                          {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </button>
                      </td> */}
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