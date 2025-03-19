import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { login } from "../../store/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { accessToken, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const refForm = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const email = refForm.current.elements.email.value;
    const password = refForm.current.elements.password.value;

    if (!email || !password) {
        alert("Both fields must be required!");
        return;
    }

    dispatch(login({user: {email, password}, accessToken: "#dsfsfbsdbfsljdfblsjfbds"}));
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="flex flex-col gap-8 justify-center p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold">Login</h2>

        <form ref={refForm} onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center">
            <div className="flex flex-col gap-2 items-start w-full">
                <label htmlFor="email" className="font-bold text-base">Email</label>
                <input type="email" name="email" className="border border-gray-300 p-2 rounded w-full" placeholder="Username" />
            </div>
            <div className="flex flex-col gap-2 items-start">
                <label htmlFor="username" className="font-bold text-base">Password</label>
                <input type="password" name="password" className="border border-gray-300 p-2 rounded w-full" placeholder="Password" />
            </div>
            <button type="submit" className="flex m-auto bg-sky-600 text-white font-bold">Login</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>

        <Link to="/auth/signup"><span className="text-sky-600 underline">Sign up?</span></Link>
    </div>
  );
};

export default Login;
