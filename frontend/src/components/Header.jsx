import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/slices/authSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { useLogoutMutation } from "../app/slices/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap(); // api destroy jwt from browser
      dispatch(logout()); // local logout remove data from localstorage
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="flex items-center justify-between p-4 bg-gray-900 text-white shadow">
      <Link to="/" className="text-sm font-bold">
        Mern Auth & Redux-Toolkit Learning
      </Link>

      <div className="relative space-x-4">
        {userInfo ? (
          <div className="relative inline-block text-left">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700 transition"
            >
              {userInfo.name}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-10">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
