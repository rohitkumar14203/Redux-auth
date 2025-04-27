import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../app/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../app/slices/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // separate state for each input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  // form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await register({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Register Successful ");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100vh] bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Create a New Account
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md space-y-6"
      >
        <div>
          <label className="block text-gray-600 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

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

        <div>
          <label className="block text-gray-600 mb-1">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm your password"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Signup
        </button>
      </form>
      {isLoading && "loading..."}
      <p className="mt-4 text-gray-600">
        Already have an account?
        <span
          className="text-blue-600 cursor-pointer ml-1 hover:underline"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
