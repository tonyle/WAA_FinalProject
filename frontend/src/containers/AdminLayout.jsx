import { Link, NavLink, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"
import UserDropdown from "../components/Common/UserDropdown";
import "../styles/Admin.css";

const AdminLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4 justify-between items-center w-full">
                    <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>

                    <div className="flex flex-row gap-4 justify-end items-center">
                        <nav>
                            {/* Login / Signup / User Info */}
                            <UserDropdown />
                        </nav>
                    </div>
                </nav>
            </header>
            <main id="main" className="grid grid-cols-5 gap-10 justify-between items-center px-10">
                <div className="col-span-1">
                    <nav className="admin-nav">
                        <NavLink to="/admin/properties" className={({ isActive }) => isActive ? "active-link" : ""}><span>Properties</span></NavLink>
                        <NavLink to="/admin/owners" className={({ isActive }) => isActive ? "active-link" : ""}><span>Onwers</span></NavLink>
                        <NavLink to="/admin/owners" className={({ isActive }) => isActive ? "active-link" : ""}><span>Customers</span></NavLink>
                    </nav>
                </div>
                <div className="col-span-4 w-full">
                    <Outlet/>
                </div>
            </main>
        </>
    )
}

export default AdminLayout;