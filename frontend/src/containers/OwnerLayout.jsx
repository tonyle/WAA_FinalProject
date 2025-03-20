import { Link, Outlet } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import UserDropdown from "../components/Common/UserDropdown";

const OwnerLayout = () => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6">
                <div className="mb-8">
                    <Link to={"/"}>
                        <img alt="logo" className="w-24 mx-auto" src={reactLogo} />
                    </Link>
                </div>
                <nav className="flex flex-col space-y-4">
                    <Link to="/owner/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
                    <Link to="/owner/properties" className="hover:bg-gray-700 p-2 rounded">Manage Properties</Link>
                    <Link to="/owner/current-offers" className="hover:bg-gray-700 p-2 rounded">Current Offers</Link>
                    <Link to="/owner/offer-history" className="hover:bg-gray-700 p-2 rounded">Offer History</Link>
                    <Link to="/owner/messages" className="hover:bg-gray-700 p-2 rounded">Messages</Link>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold text-gray-800">Owner Portal</h1>
                    <UserDropdown />
                </header>

                {/* Page Content */}
                <main id="main" className="flex-1 p-6 bg-gray-50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default OwnerLayout;
