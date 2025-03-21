import { Link, Outlet } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import UserDropdown from "../components/Common/UserDropdown";
import MainMenu from "../components/Common/MainMenu";

const OwnerLayout = () => {
    return (
        <>
            {/* Header Navigation */}
            <header className="header">
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
            <main id="main">
                <Outlet />
            </main>
        </>
    );
};

export default OwnerLayout;
