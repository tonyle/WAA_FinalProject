import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { login } from "../store/auth/authSlice";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!user && localStorage.getItem("token")) {
            const token = localStorage.getItem("token");
            dispatch(login(JSON.parse(token)));
        }
    }, [dispatch, user]);

    if (!isAuthenticated) return <Navigate to="/auth/login" replace />;

    if (!allowedRoles.includes(role)) return <Navigate to="/" replace />;

    return children; // Render child routes
};

export default ProtectedRoute;
