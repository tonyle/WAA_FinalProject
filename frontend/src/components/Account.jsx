import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Account = () => {
    const { user } = useSelector((state) => state.auth);

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-44 pt-10">
            <h2 className="text-3xl font-semibold text-gray-800 pb-2">Account</h2>

            {user && (
                <div className="mt-6 space-y-4 text-gray-700">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold">Name</span>
                        <span>{user.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold">Email</span>
                        <span>{user.email}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-semibold">Role</span>
                        <span className="px-3 py-1 text-sm font-medium text-white bg-blue-500 rounded-lg">
                            {user.role}
                        </span>
                    </div>
                    <div className="text-center mt-4">
                        <Link to="/profile/reset-password" className="text-blue-600 hover:underline">
                            Reset Password?
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Account;
