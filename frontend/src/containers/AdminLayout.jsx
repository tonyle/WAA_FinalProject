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
            <main id="main" className="main-admin">
                <div className="col-span-1 border-r border-slate-100">
                    <nav className="admin-nav">
                        <NavLink to="/admin/properties" className={({ isActive }) => isActive ? "active-link" : ""}><span>Properties</span></NavLink>
                        <NavLink to="/admin/owners" className={({ isActive }) => isActive ? "active-link" : ""}><span>Onwers</span></NavLink>
                        <NavLink to="/admin/customers" className={({ isActive }) => isActive ? "active-link" : ""}><span>Customers</span></NavLink>
                        <NavLink to="/admin/offers" className={({ isActive }) => isActive ? "active-link" : ""}><span>Offers</span></NavLink>
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