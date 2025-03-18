import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"
import UserDropdown from "../components/Common/UserDropdown";

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
            <main id="main">
                <Outlet/>
            </main>
        </>
    )
}

export default AdminLayout;