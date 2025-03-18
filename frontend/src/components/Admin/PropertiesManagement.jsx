
    import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOwnersSuccess, fetchPropertiesSuccess } from '../../store/admin/adminSlice';

const listProperties = [
  {
    id: 1,
    property: "Example",
    owner: {
      id: 1,
      name: "SEN"
    },
    status: "Pending"
  },
  {
    id: 2,
    property: "Example",
    owner: {
      id: 1,
      name: "Jim"
    },
    status: "Pending"
  },
  {
    id: 3,
    property: "Example",
    owner: {
      id: 1,
      name: "John"
    },
    status: "Pending"
  }
]

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

const PropertiesManagement = () => {
    const [tab, setTab] = useState(0);
    const dispatch = useDispatch();
    const {properties} = useSelector((state) => state.admin);

  useEffect(() => {
    // fetch data
    dispatch(fetchOwnersSuccess({data: listOwners}));
    dispatch(fetchPropertiesSuccess({data: listProperties}));
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-medium text-left">Propeties</h2>
      
      {/* tabs */}
      <div className='flex flex-row gap-0 items-center justify-start border-b border-gray-200 tabs'>
        <div className={`${tab === 0 ? 'active' : ''} tab-item`} onClick={() => setTab(0)}>All</div>
        <div className={`${tab === 1 ? 'active' : ''} tab-item`} onClick={() => setTab(1)}>Rented</div>
        <div className={`${tab === 2 ? 'active' : ''} tab-item`} onClick={() => setTab(2)}>Sold</div>
        <div className={`${tab === 3 ? 'active' : ''} tab-item`} onClick={() => setTab(3)}>New</div>
      </div>

      {/* table */}
      <div className='flex flex-row gap-2 w-full'>
        <table className={`${tab === 0 ? '' : 'hidden'} table`}>
          <thead>
            <tr>
              <th><input type="checkbox" name="check_all" /></th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            
          </tbody>
        </table>

        <table className={`${tab === 1 ? '' : 'hidden'}`}>
          <thead>
            <tr>
              <th><input type="checkbox" name="check_all" /></th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PropertiesManagement;