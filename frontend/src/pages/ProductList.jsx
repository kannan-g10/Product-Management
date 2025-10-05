import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import CreateProduct from "../components/CreateProduct";
import { BASE_API_URL } from "../constants/api";
import { refreshAccessToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [btn, setBtn] = useState("Create");

  const fetchData = async () => {
    const response = await fetch(`${BASE_API_URL}products/details/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    });

    if (response.status === 401) {
      console.warn("Access token expired or invalid. Please log in again.");
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        const retryResponse = await fetch(`${BASE_API_URL}products/details/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        });
        const retryData = await retryResponse.json();
        if (retryData.success) {
          setProducts(retryData.products);
        } else {
          setProducts([]);
        }
      } else {
        navigate("/login");
      }
      return;
    }

    const data = await response.json();

    if (data.success) {
      setProducts(data.products);
    } else {
      setProducts([]);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold m-4">
        <span className="italic">Welcome</span>
        <span> {localStorage.getItem("firstname") || "Guest"}!</span>
      </h1>

      <div className="flex flex-col items-center justify-start min-h-screen gap-y-4 p-4">
        <CreateProduct
          formData={formData}
          setFormData={setFormData}
          btn={btn}
          setBtn={setBtn}
          fetchData={fetchData}
        />
        <div className="flex flex-start flex-wrap p-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <Card
                key={product.id}
                product={product}
                formData={formData}
                setFormData={setFormData}
                btn={btn}
                setBtn={setBtn}
                fetchData={fetchData}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
