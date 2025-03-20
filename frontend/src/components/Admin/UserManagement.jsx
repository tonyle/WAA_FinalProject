import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersFail, fetchUsersSuccess } from '../../store/admin/adminSlice';
import { UserStatus } from '../../constants/types';
import { activeOrDeactiveOwnerAccount, getUsers } from '../../api/adminApi';

const UserManagement = () => {
  const [tab, setTab] = useState(0);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.admin);
  const [searchText, setSearchText] = useState("");
  const renderBadgeClass = (status) => {
    return status === UserStatus.ACTIVE ? "badge-active" : "badge-deactive";
  };
  const [params, setParams] = useState({});

  useEffect(() => {
    // fetch data
    fetchData();
  }, [params]);

  useEffect(() => {
    // fetch data
    switch (tab) {
      case 1:
        setParams({ status: UserStatus.ACTIVE });
        break;
      case 0:
      default:
        setParams({});
        break;
    }
  }, [tab]);

  const fetchData = async () => {
    try {
      const res = await getUsers(params);
      dispatch(fetchUsersSuccess({ data: res.data }));
    } catch (err) {
      console.log(err);
      dispatch(fetchUsersFail("fetch users failed"));
    }
  };

  const onHandleActiveAndDeactive = async (id) => {

    const curUser = users.find((owner) => owner.id === id);
    try {
      const res = await activeOrDeactiveOwnerAccount(id, { status: curUser.status === UserStatus.ACTIVE ? UserStatus.DEACTIVATED : UserStatus.ACTIVE });
      console.log(res.data);

      const updatedOwners = users.map((owner) =>
        owner.id === id ? { ...owner, status: owner.status === UserStatus.ACTIVE ? UserStatus.DEACTIVATED : UserStatus.ACTIVE } : owner
      );

      dispatch(fetchUsersSuccess({ data: updatedOwners }));
    } catch (err) {
      console.log(err);
    }
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
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users && users.length > 0 ? (
              <>
                {
                  users.map((item, key) => (
                    <tr key={key}>
                      {/* <td><input type='checkbox' name={item.id}/></td> */}
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.roles[0].role}</td>
                      <td><span className={`badge ${renderBadgeClass(item.status)}`}>{item.status.toLowerCase()}</span></td>
                      <td>
                        <button
                          onClick={() => onHandleActiveAndDeactive(item.id)}
                          className={`${item.status === UserStatus.ACTIVE ? 'bg-slate-100' : 'text-sky-600 bg-slate-100'} font-bold text-xs px-5 cursor-pointer`}
                        >
                          {item.status === UserStatus.ACTIVE ? 'Deactivate' : 'Activate'}
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

export default UserManagement;