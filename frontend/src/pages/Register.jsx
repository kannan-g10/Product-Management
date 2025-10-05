import React, { useState } from "react";
import { BASE_API_URL } from "../constants/api";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
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
    setError(null);

    if (formData.password !== formData.confirm_password) {
      setError("Passwords does not match!");
      return;
    }

    if (
      !formData.username ||
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${BASE_API_URL}auth/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Registration successful:", data);
        navigate("/login");
        setError(null);
      } else {
        setError(data.detail || "Registration failed");
      }
    } catch (error) {
      console.error("Error occurred during registration:", error);
      if (error.message.includes("message channel closed")) {
        console.warn(
          "Extension error: Message channel closed. Try reloading the page."
        );
      }
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }

    setFormData((prev) => ({
      ...prev,
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
    }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-500 to-rose-400 gap-2 p-4">
      <form
        className="flex flex-col gap-4 items-center mt-32 border border-gray-400 rounded-md py-4 px-8"
        onSubmit={handleOnSubmit}
      >
        <h2 className="text-3xl font-bold mb-4 text-white">Register</h2>

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
          type="text"
          name="first_name"
          placeholder="First Name"
          required
          className="border border-gray-300 p-2 w-64 rounded focus:outline-none"
          value={formData.first_name}
          onChange={handleInputChange}
          onFocus={() => setError(null)}
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          required
          className="border border-gray-300 p-2 w-64 rounded focus:outline-none"
          value={formData.last_name}
          onChange={handleInputChange}
          onFocus={() => setError(null)}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="border border-gray-300 w-64 p-2 rounded focus:outline-none"
          value={formData.email}
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
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
          className="border border-gray-300 w-64 p-2 rounded focus:outline-none"
          value={formData.confirm_password}
          onChange={handleInputChange}
          onFocus={() => setError(null)}
        />
        <button
          type="submit"
          className="bg-blue-500 w-64 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p>
          Already have an account?
          <Link
            to="/login"
            className="text-violet-500 font-semibold ml-2 cursor-pointer hover:text-purple-700"
          >
            Login
          </Link>
        </p>
        {error && (
          <p className="text-red-800" aria-live="polite">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default Register;
