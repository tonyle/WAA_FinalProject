import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPropertiesSuccess, fetchPropertiesFail } from '../../store/admin/adminSlice';
import { approveProperty, getProperties } from '../../api/adminApi';
import { PropertyStatuses, PropertyTypes } from '../../constants/types';

const PropertiesManagement = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const { properties } = useSelector((state) => state.admin);
  const [searchText, setSearchText] = useState("");
  const renderBadgeClass = (status) => {
    return !["NEW", "DEACTIVATED"].includes(status) ? "badge-active" : "badge-deactive";
  };
  const types = [PropertyTypes.RENT, PropertyTypes.SELL, PropertyTypes.BOTH];
  const [params, setParams] = useState({});

  useEffect(() => {
    // fetch data
    fetchData();
  }, [dispatch, params]);

  useEffect(() => {
    switch (tab) {
      case 1:
        setParams({ propertyType: PropertyTypes.RENT });
        break;
      case 2:
        setParams({ propertyType: PropertyTypes.SELL });
        break;
      case 3:
        setParams({ propertyType: PropertyTypes.BOTH });
        break;
      case 0:
      default:
        setParams({});
        break;
    }
  }, [tab]);

  const fetchData = async () => {
    try {
      const response = await getProperties(params);
      dispatch(fetchPropertiesSuccess({ data: response.data }));
    } catch (err) {
      console.log(err);
      dispatch(fetchPropertiesFail("Can not fetch data"));
    }
  }

  const onHandleActiveAndDeactive = async (id) => {
    try {
      const res = await approveProperty(id);

      const updatedOwners = properties.map((item) =>
        item.id === id ? res.data : item
      );

      dispatch(fetchPropertiesSuccess({ data: updatedOwners }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchProperty = () => {
    // fetch API
    setSearchText("");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-medium text-left">Propeties</h2>

      {/* tabs */}
      <div className='flex flex-row gap-0 items-center justify-start border-b border-gray-200 tabs'>
        <div className={`${tab === 0 ? 'active' : ''} tab-item`} onClick={() => setTab(0)}>All</div>
        {types.map((item, key) => {
          return (
            <div key={key} className={`${tab === key + 1 ? 'active' : ''} tab-item capitalize`} onClick={() => setTab(key + 1)}>{item.toLowerCase()}</div>
          )
        })}
      </div>

      {/* Search item */}
      {/* <div className='flex flex-row justify-end w-full items-stretch'>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" className='border border-gray-200 p-2 rounded-l-md outline-0' />
        <button onClick={handleSearchProperty} className='search-button'>Search</button>
      </div> */}

      {/* table */}
      <div className='flex flex-row gap-2 w-full overflow-x-auto'>
        <table className="border-collapse table-auto w-full">
          <thead>
            <tr>
              {/* <th><input type="checkbox" name="check_all" /></th> */}
              <th>Id</th>
              <th>Property</th>
              <th>Description</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {properties && properties.length > 0 ? (
              <>
                {
                  properties.map((item, key) => (
                    <tr key={key}>
                      {/* <td><input type='checkbox' name={item.id}/></td> */}
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td><span className={`badge ${renderBadgeClass(item.status.toLowerCase())}`}>{item.status.toLowerCase()}</span></td>
                      <td>
                        <button
                          onClick={() => onHandleActiveAndDeactive(item.id)}
                          className={`${item.status == PropertyStatuses.NEW ? '' : 'hidden'} text-sky-600 bg-slate-100 font-bold text-sm px-2 cursor-pointer`}
                        >
                          Approve
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </>
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">No property found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertiesManagement;