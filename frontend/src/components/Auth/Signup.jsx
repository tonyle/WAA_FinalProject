import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../../store/auth/authSlice";

const Signup = () => {
    const navigate = useNavigate();
    const { success, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const refForm = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const email = refForm.current.elements.email.value;
        const name = refForm.current.elements.name.value;
        const password = refForm.current.elements.password.value;
        const role = refForm.current.elements.role.value;

        if (!email || !password || !name || !role) {
            alert("fields must be required!");
            return;
        }

        dispatch(signupUser({ email, name, password, role: role.toUpperCase() }));
    };

    useEffect(() => {
        if (success) {
            navigate("/auth/login");
        }
    }, [success, navigate]);

    return (
        <div className="flex flex-col gap-8 justify-center p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold">Sign Up</h2>

            <form ref={refForm} onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
                <div className="flex flex-col gap-2 items-start w-full">
                    <label htmlFor="email" className="font-bold text-base">Email</label>
                    <input type="email" name="email" className="border border-gray-300 p-2 rounded w-full" placeholder="Email" />
                </div>
                <div className="flex flex-col gap-2 items-start w-full">
                    <label htmlFor="name" className="font-bold text-base">Name</label>
                    <input type="name" name="name" className="border border-gray-300 p-2 rounded w-full" placeholder="Name" />
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <label htmlFor="password" className="font-bold text-base">Password</label>
                    <input type="password" name="password" className="border border-gray-300 p-2 rounded w-full" placeholder="Password" />
                </div>
                <div className="flex flex-col gap-2 items-start">
                    <label className="font-bold text-base">Role</label>
                    <div className="flex flex-row flex-wrap gap-4 justify-start">
                        <label><input type="radio" name="role" value="admin" /> Admin</label>
                        <label><input type="radio" name="role" value="owner" /> Owner</label>
                        <label><input type="radio" name="role" value="customer" /> Customer</label>
                    </div>
                </div>
                <button type="submit" className="flex m-auto bg-sky-600 text-white font-bold">Sign Up</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
