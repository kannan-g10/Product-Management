import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../constants/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError(null);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_API_URL}auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
      if (res.success) {
        console.log(res.data);
        localStorage.setItem("refreshtoken", res.data.refresh);
        localStorage.setItem("accesstoken", res.data.access);
        localStorage.setItem("firstname", res.data.first_name);
        localStorage.setItem("lastname", res.data.last_name);
        navigate("/");
        handleReset();
        setError(null);
      } else {
        setError(res.detail || "Login failed");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      if (error.message.includes("message channel closed")) {
        console.warn(
          "Extension error: Message channel closed. Try reloading the page."
        );
      }
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData((prev) => ({
      ...prev,
      username: "",
      password: "",
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-rose-400 gap-2 p-4">
      <form className="flex flex-col gap-4 items-center mt-32 border border-gray-400 rounded-md py-4 px-8">
        <h2 className="text-3xl font-bold mb-4 text-white">Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          required
          className="border border-gray-300 p-2 w-64 rounded focus:outline-none"
          value={formData.username}
          onChange={handleInputChange}
          onFocus={() => setError(null)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="border border-gray-300 w-64 p-2 rounded focus:outline-none"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setError(null)}
        />
        <button
          type="submit"
          className="bg-blue-500 w-64 text-white p-2 rounded"
          onClick={handleOnSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        <p className="text-white">
          I don't have an account?
          <Link
            to="/register"
            className="text-violet-800 font-semibold ml-2 cursor-pointer underline hover:text-purple-600"
          >
            Register
          </Link>
        </p>
        {error && <p className="text-red-900">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
