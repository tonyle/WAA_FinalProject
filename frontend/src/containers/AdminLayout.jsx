import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"

const AdminLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4">
                    {/* <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link> */}
                    <Link to="/"><img alt="logo" className="logo react" src={reactLogo} /></Link>
                    <Link to="/admin">Admin Dashboard</Link>
                    <Link to="/admin/approve-owners">Approve Owners</Link>
                    <Link to="/admin/manage-owners">Manage Owners</Link>
                </nav>
            </header>
            <main id="main">
                <Outlet/>
            </main>
        </>
    )
}

export default AdminLayout;