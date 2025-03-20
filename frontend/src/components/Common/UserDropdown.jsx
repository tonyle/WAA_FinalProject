import { useSelector } from "react-redux";
import { UserRole } from "../../constants/role";
import { Link } from "react-router";
import { useState } from "react";
import { generateUsername } from "../../utils/authUtil";
import { FaAngleDown } from "react-icons/fa";

const UserDropdown = () => {
    const { user, isAuthenticated, role } = useSelector((state) => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const username = isAuthenticated && user ? generateUsername(user, role) : '';

    const specificItems = () => {
        switch (role) {
            case UserRole.ADMIN:
                return (
                    <Link to="/admin"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                        Dashboard</span>
                    </Link>
                );
            case UserRole.OWNER:
                return (
                    <>
                        <Link to="/owner"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                            Dashboard</span></Link>
                        <Link to="/owner/property-management"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">Manage Properties</span></Link>
                        <Link to="/owner/offers"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">View Offers</span></Link>
                        <Link to="/owner/messages"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">Messages</span></Link>
                    </>
                );
            case UserRole.CUSTOMER:
                return (<>
                    <Link to="/customer"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                        Dashboard</span>
                    </Link>

                    <Link to="/customer/current-offers"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                        Current Offers</span>
                    </Link>
                    <Link to="/customer/offer-history"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                        Offer History</span>
                    </Link>
                    <Link to="/customer/saved-properties"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                        Saved Properties</span>
                    </Link>
                </>


                );
            default:
                return null;
        }
    }

    return (
        <>
            {isAuthenticated && user ? (
                <div className="relative">
                    <p onClick={() => setDropdownOpen(!dropdownOpen)} className="text-sky-600 capitalize inline-flex items-center gap-1">{username} <span><FaAngleDown className="size-4" /></span></p>

                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-md">
                            {specificItems()}

                            <Link to="/profile/account"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                                Account</span>
                            </Link>
                            <Link to="/logout"><span className="block px-4 py-2 text-sky-600 hover:bg-gray-100">
                                Logout</span>
                            </Link>
                        </div>
                    )}
                </div>
            )
                : (
                    <div className="flex flex-row justify-between gap-2 items-center">
                        <Link to="/auth/login"><span className="text-sky-600 hover:bg-gray-100">Login</span></Link>|
                        <Link to="/auth/signup"><span className="text-sky-600 hover:bg-gray-100">Signup</span></Link>
                    </div>)}
        </>
    );
};

export default UserDropdown;