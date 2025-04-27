import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in on component mount
  useEffect(() => {
    const userLoggedIn = localStorage.getItem("isLoggedIn");
    if (userLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <main className="flex flex-col items-center justify-center h-[80vh] bg-gray-100 text-center p-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to MERN Auth & Redux Learning 🚀
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          This project is a MERN stack learning resource hub where you can
          practice authentication, protected routes, Redux state management and
          CRUD operations while managing your favorite MERN tutorials and
          resources.
        </p>

        {/* If the user is logged in, show a personalized message */}
        {isLoggedIn ? (
          <div>
            <h3 className="text-2xl text-gray-800 mb-4">
              Welcome back, User! 😊
            </h3>
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          // If the user is not logged in, show the login and signup buttons
          <div className="space-x-4">
            <button
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => navigate("/signup")}
            >
              Signup
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;
