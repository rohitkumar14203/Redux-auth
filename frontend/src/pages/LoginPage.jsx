import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useLoginMutation } from "../app/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "../app/slices/authSlice";
const LoginPage = () => {
  const navigate = useNavigate();

  // separate state for each field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successful ");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Login to your Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <div>
          <label className="block text-gray-600 mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>

      {isLoading && "loading..."}
      <p className="mt-4 text-gray-600">
        Don&apos;t have an account?
        <span
          className="text-blue-600 cursor-pointer ml-1 hover:underline"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
