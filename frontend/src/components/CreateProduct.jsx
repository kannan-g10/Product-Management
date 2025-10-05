import React, { useState } from "react";
import { BASE_API_URL } from "../constants/api";

const CreateProduct = ({ formData, setFormData, btn, fetchData }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.price ||
      !formData.category ||
      !formData.description
    ) {
      setError("All fields are required!");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      let response = null;
      if (btn === "Edit") {
        response = await fetch(
          `${BASE_API_URL}products/details/${formData.id}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
      } else {
        response = await fetch(`${BASE_API_URL}products/details/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          body: JSON.stringify(formData),
        });
      }

      const data = await response.json();
      if (data.success) {
        setError(null);
        fetchData();
      } else {
        setError(data.detail || "Product creation failed");
      }
    } catch (error) {
      console.error("Error occurred during product creation:", error);
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
      name: "",
      price: "",
      category: "",
      description: "",
    }));
  };
  return (
    <form className="flex flex-col items-center gap-y-4 border-2 rounded-md p-4 bg-gray-200 lg:w-2/5">
      <h2 className="text-3xl font-bold mb-4">Create Product</h2>
      <input
        type="text"
        name="name"
        placeholder="name"
        required
        className="border border-gray-300 p-2 w-full rounded"
        value={formData.name}
        onChange={handleInputChange}
        onFocus={() => setError(null)}
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        required
        className="border border-gray-300 p-2 w-full rounded"
        value={formData.price}
        onChange={handleInputChange}
        onFocus={() => setError(null)}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        required
        className="border border-gray-300 w-full p-2 rounded"
        value={formData.category}
        onChange={handleInputChange}
        onFocus={() => setError(null)}
      />
      <textarea
        name="description"
        placeholder="Description"
        required
        className="border border-gray-300 w-full p-2 rounded"
        value={formData.description}
        onChange={handleInputChange}
        onFocus={() => setError(null)}
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 w-full text-white p-2 rounded"
        onClick={handleOnSubmit}
      >
        {btn}
      </button>
      {error ? (
        <p className="text-red-500 font-semibold text-sm">{error}</p>
      ) : (
        <p className="font-semibold text-sm text-gray-200">Enter details</p>
      )}
    </form>
  );
};

export default CreateProduct;
