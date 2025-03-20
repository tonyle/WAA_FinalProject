import { Link, Outlet } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import UserDropdown from "../components/Common/UserDropdown";
import MainMenu from "../components/Common/MainMenu";

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
                {/* Header Navigation */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <div className="flex flex-row gap-4 justify-between items-center w-full">
                        <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>

                        <div className="flex flex-row gap-4 justify-end items-center">
                            <nav className="inline-flex gap-4">
                                <MainMenu />
                                {/* Login / Signup / User Info */}
                                <UserDropdown />
                            </nav>
                        </div>
                    </div>
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
