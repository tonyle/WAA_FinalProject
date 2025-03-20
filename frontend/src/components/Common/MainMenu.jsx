import { NavLink } from "react-router";

const MainMenu = () => {
    return (
        <nav className="flex flex-row gap-4 justify-end items-center">
            <NavLink to="/filter" className={({ isActive }) => isActive ? "active-link" : ""}><span className="p-2 py-3 w-full text-left text-sky-600">Filter</span></NavLink>
            <NavLink to="/rent" className={({ isActive }) => isActive ? "active-link" : ""}><span className="p-2 py-3 w-full text-left text-sky-600">Rent</span></NavLink>
            <NavLink to="/sell" className={({ isActive }) => isActive ? "active-link" : ""}><span className="p-2 py-3 w-full text-left text-sky-600">Sell</span></NavLink>
        </nav>
    )
}


export default MainMenu;