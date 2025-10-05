import { BASE_API_URL } from "../constants/api";

const Card = ({ product, formData, setFormData, btn, setBtn, fetchData }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${BASE_API_URL}products/details/${product.id}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      );

      const data = await response.json();

      if (!data.success) {
        console.error(
          `Failed to delete product with id ${product.id}: ${data.detail}`
        );
      }
      fetchData();
    } catch (error) {
      console.error("Error occurred while deleting product:", error);
    }
  };

  const handleEdit = async () => {
    console.log("Edit product with id:", product);

    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      category: product.category,
      description: product.description,
    });

    setBtn("Edit");
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchData();
  };

  return (
    <div className="flex flex-col items-center gap-y-2 border border-gray-300 p-2 m-4 shadow w-64 rounded-lg hover:shadow-lg transition-shadow cursor-pointer">
      <h3 className="text-lg font-semibold w-full text-center">
        {product.name}
      </h3>
      <h3 className="text-lg font-semibold w-full text-center">
        {product.price}
      </h3>
      <h3 className="text-lg font-semibold w-full text-center">
        {product.category}
      </h3>
      <p className="text-gray-600 w-full text-center">{product.description}</p>
      <div className="flex lg:gap-3 gap-x-2 mt-4 w-full p-2">
        <button
          className="bg-blue-500 text-white p-2 rounded w-full lg:w-20"
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white p-2 rounded w-full lg:w-20"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
