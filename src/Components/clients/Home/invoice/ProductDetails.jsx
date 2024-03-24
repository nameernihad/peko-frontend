import React, { useEffect, useState } from "react";
import { getAllData } from "../../../../services/ApiFetch";

const ProductDetailsModal = ({ closeModal, setSelectedProducts, selectedProducts }) => {
  const [products, setProducts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllData("/getAllProduct");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleProductSelection = (product) => {
    const isSelected = selectedItems.some((item) => item.id === product.id);

    setSelectedItems((prevSelected) =>
      isSelected
        ? prevSelected.filter((item) => item.id !== product.id)
        : [...prevSelected, product]
    );
  };

  const handleSaveSelection = () => {
    setSelectedProducts(selectedItems);
    closeModal();
  };

  const isSelected = (product) => {
    return selectedItems.some((item) => item.id === product.id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4">
                  Actions
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="w-4 p-4">
                    <button
                      onClick={() => toggleProductSelection(product)}
                      className={`${
                        isSelected(product)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      } px-4 py-2 rounded-lg hover:bg-blue-600`}
                    >
                      {isSelected(product) ? "Selected" : "Select"}
                    </button>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-end mt-3">
          <button
            onClick={handleSaveSelection}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Selected Products
          </button>
          <button
            onClick={closeModal}
            className="ml-3 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
