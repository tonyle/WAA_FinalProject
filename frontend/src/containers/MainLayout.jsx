import { Link, Outlet } from "react-router";
import reactLogo from "../assets/react.svg"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import UserDropdown from "../components/Common/UserDropdown";
import { login } from "../store/auth/authSlice";

const MainLayout = () => {
    const {user} = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            dispatch(login(JSON.parse(token).state));
        }
    }, []);

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

export default MainLayout;