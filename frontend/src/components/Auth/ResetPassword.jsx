import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../api/authApi";
import { logout } from "../../store/auth/authSlice";
import { useNavigate } from "react-router";

const ResetPassword = () => {
    const oldPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const {user} = useSelector(state => state.auth);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const oldPassword = oldPasswordRef.current?.value;
        const newPassword = newPasswordRef.current?.value;

        if (!oldPassword || !newPassword) {
            setError("Both fields are required!");
            return;
        }

        setError("");
        // Submit password reset logic here
        try {
            const res = await resetPassword({ email: user.email, oldPassword , newPassword});
            dispatch(logout());
            navigate("/auth/login");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-44">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Reset Password</h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <p>Email: {user.email}</p>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">Old Password</label>
                    <input
                        type="password"
                        ref={oldPasswordRef}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">New Password</label>
                    <input
                        type="password"
                        ref={newPasswordRef}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirm new password"
                        required
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    className=" bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
