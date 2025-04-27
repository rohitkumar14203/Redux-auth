import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      <main className="flex flex-col items-center justify-center h-[80vh] bg-gray-100 text-center p-6">
        <h2 className="text-4xl font-bold mb-4 text-gray-800">
          Welcome to MERN Auth & Redux Learning 🚀
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          This project is a MERN stack learning resource hub where you can
          practice authentication, protected routes, Redux state management, and
          CRUD operations while managing your favorite MERN tutorials and
          resources.
        </p>

        {/* Conditionally render content based on userInfo */}
        {userInfo ? (
          // Show different content when the user is logged in
          <div>
            <h3 className="text-2xl font-semibold text-gray-700">
              Welcome back, {userInfo.name}!
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              You're logged in. Now you can explore your dashboard and manage
              your profile and settings.
            </p>

            {/* Additional content when logged in */}
            <div className="mb-6">
              <h4 className="text-xl font-semibold text-gray-700">
                Your Resources
              </h4>
              <p className="text-gray-600">
                Here, you can find tutorials, guides, and helpful resources to
                enhance your MERN stack skills.
              </p>
            </div>

            <button
              className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => navigate("/dashboard")} // Redirect to the dashboard or another page
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          // Show login/signup buttons when no user is logged in
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
