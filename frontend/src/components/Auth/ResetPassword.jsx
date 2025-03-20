import { useRef, useState } from "react";

const ResetPassword = () => {
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const password = passwordRef.current?.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        if (!password || !confirmPassword) {
            setError("Both fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError("");
        // Submit password reset logic here
        console.log("Password Reset Successfully!");
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-44">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">Reset Password</h2>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">New Password</label>
                    <input
                        type="password"
                        ref={passwordRef}
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter new password"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 text-left">Confirm Password</label>
                    <input
                        type="password"
                        ref={confirmPasswordRef}
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
