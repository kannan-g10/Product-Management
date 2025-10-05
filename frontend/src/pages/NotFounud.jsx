import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-rose-400 p-4">
      <h1 className="text-4xl font-bold text-white mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-white mb-4">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        to="/login"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
