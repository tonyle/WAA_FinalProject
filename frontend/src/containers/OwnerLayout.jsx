import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"

const OwnerLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4">
                    <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>
                    <Link to="/owner">Owner Dashboard</Link>
                    <Link to="/owner/property-management">Manage Properties</Link>
                    <Link to="/owner/offers">View Offers</Link>
                    <Link to="/owner/messages">Messages</Link>
                </nav>
            </header>
            <main id="main">
                <Outlet/>
            </main>
        </>
    )
}

export default OwnerLayout;