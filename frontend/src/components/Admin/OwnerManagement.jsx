import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnersSuccess } from '../../store/admin/adminSlice';

const listOwners = [
  {
    id: 1,
    name: "Sen",
    email: "sen@gmail.com",
    status: "Active",
  },
  {
    id: 2,
    name: "Sen 2",
    email: "sen@gmail.com",
    status: "Active",
  },
  {
    id: 3,
    name: "Sen 3",
    email: "sen@gmail.com",
    status: "Active",
  }
]

const OwnerManagement = () => {
    const [tab, setTab] = useState(0);
    const dispatch = useDispatch();
    const {owners} = useSelector((state) => state.admin);
    const [searchText, setSearchText] = useState("");
    const renderBadgeClass = (status) => {
        return status === 'Active' ? "badge-active" : "badge-deactive";
    };

  useEffect(() => {
    // fetch data
    dispatch(fetchOwnersSuccess({data: listOwners}));
  }, [tab]);

  const onHandleActiveAndDeactive = (id) => {
    const updatedOwners = owners.map((owner) => 
        owner.id === id ? { ...owner, status: owner.status === "Active" ? "Inactive" : "Active" } : owner
    );

    dispatch(fetchOwnersSuccess({ data: updatedOwners }));
};

  const handleSearchOwners = () => {
    // fetch API
    setSearchText("");
  }

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-medium text-left">Propeties</h2>
      
      {/* tabs */}
      <div className='flex flex-row gap-0 items-center justify-start border-b border-gray-200 tabs'>
        <div className={`${tab === 0 ? 'active' : ''} tab-item`} onClick={() => setTab(0)}>All</div>
        <div className={`${tab === 1 ? 'active' : ''} tab-item`} onClick={() => setTab(1)}>Active</div>
      </div>

      {/* Search item */}
      <div className='flex flex-row justify-end w-full items-stretch'>
        <input value={searchText} onChange={(e) => setSearchText(e.target.value)} type="text" className='border border-gray-200 p-2 rounded-l-md outline-0' />
        <button onClick={handleSearchOwners} className='search-button'>Search</button>
      </div>

      {/* table */}
      <div className='flex flex-row gap-2 w-full'>
        <table className="border-collapse table-fixed w-full">
          <thead>
            <tr>
              {/* <th><input type="checkbox" name="check_all" /></th> */}
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

            <tbody>
                {owners && owners.length > 0 ? (
                    <>
                    {
                        owners.map((item, key) => (
                            <tr key={key}>
                                {/* <td><input type='checkbox' name={item.id}/></td> */}
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td><span className={`badge ${renderBadgeClass(item.status)}`}>{item.status}</span></td>
                                <td>
                                    <button 
                                        onClick={() => onHandleActiveAndDeactive(item.id)} 
                                        className={`${item.status === 'Active' ? 'bg-slate-100' : 'text-green-500 bg-green-50'} text-xs px-5 cursor-pointer`}
                                    >
                                        {item.status === 'Active' ? 'Deactivate' : 'Activate'}
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </>
                ) : (
                <tr>
                    <td colSpan="6" className="text-center py-4">No owner found.</td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
}

export default OwnerManagement;