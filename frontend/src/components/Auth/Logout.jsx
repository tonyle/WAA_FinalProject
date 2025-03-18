import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { logout } from "../../store/auth/authSlice";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    return (<Navigate to={'/'} replace />);
}

export default Logout;