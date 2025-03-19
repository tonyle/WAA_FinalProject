import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"
import UserDropdown from "../components/Common/UserDropdown";

const CustomerLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4 justify-between items-center w-full">
                    <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>

                    <div className="flex flex-row gap-4 justify-end items-center">
                        <nav>
                            {/* <Link to="/customer">Customer Dashboard</Link>
                            <Link to="/customer/current-offers">Current Offers</Link>
                            <Link to="/customer/offer-history">Offer History</Link>
                            <Link to="/customer/saved-properties">Saved Properties</Link> */}

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

export default CustomerLayout;