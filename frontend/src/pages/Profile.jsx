import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../app/slices/userSlice";
import { setCredentials } from "../app/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  // fill form fields when userInfo is available
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    // form validation & API call here
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await updateUser({
        _id: userInfo._id,
        name,
        email,
        password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated...");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label className="block mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Update
        </button>

        {isLoading && "loading.."}
      </form>
    </div>
  );
};

export default Profile;
