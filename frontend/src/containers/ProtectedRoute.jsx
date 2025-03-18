import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../constants/role";
import { useEffect } from "react";
import { login } from "../store/auth/authSlice";

const ProtectedRoute = () => {
    const { isAuthenticated, role, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            dispatch(login(JSON.parse(token).state));
        }
    }, []);

    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

    if (role !== UserRole.ADMIN) return <Navigate to="/" replace />;

    return <Outlet />; // Render child routes
};

export default ProtectedRoute;
