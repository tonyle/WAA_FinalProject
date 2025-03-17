import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"

const CustomerLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4">
                    <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>
                    <Link to="/customer">Customer Dashboard</Link>
                    <Link to="/customer/current-offers">Current Offers</Link>
                    <Link to="/customer/offer-history">Offer History</Link>
                    <Link to="/customer/saved-properties">Saved Properties</Link>
                </nav>
            </header>
            <main id="main">
                <Outlet/>
            </main>
        </>
    )
}

export default CustomerLayout;