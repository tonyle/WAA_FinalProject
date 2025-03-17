import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"

const AuthLayout = () => {
    return (
        <>
            <header className="header">
                <nav className="flex flex-row gap-4">
                    <Link to={"/"}><img alt="logo" className="logo react" src={reactLogo} /></Link>
                </nav>
            </header>
            <main id="main">
                <Outlet/>
            </main>
        </>
    )
}

export default AuthLayout;