import React, { useState, useEffect } from "react";
import CustomerDetailsModal from "./CustomerDetails";
import ProductDetailsModal from "./ProductDetails";
import { addData, getDataById } from "../../../../services/ApiFetch";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InvoiceCreateForm = () => {
  const [formData, setFormData] = useState({
    totalAmount: 0,
    discountPrice: null,
    discountPercentage: null,
    productIds: [],
    status: null,
  });

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const openCustomerModal = () => setShowCustomerModal(true);
  const openProductModal = () => setShowProductModal(true);
  const closeCustomerModal = () => setShowCustomerModal(false);
  const closeProductModal = () => setShowProductModal(false);

  const fetchCustomer = async () => {
    try {
      const data = await getDataById(`/getCustomerById/${selectedCustomerId}`);
      setSelectedCustomer(data.customer);
    } catch (error) {
      console.error("Error fetching Customers:", error);
    }
  };

  useEffect(() => {
    console.log(selectedProducts);
    const calculateTotalAmount = () => {
      const total = selectedProducts.reduce((acc, product) => {
        return acc + parseFloat(product.price);
      }, 0);
      const discount = parseFloat(formData.discountPrice || 0);
      const discountedTotal = total - discount;
      setFormData((prevData) => ({
        ...prevData,
        totalAmount: discountedTotal.toFixed(2),
      }));
    };
    calculateTotalAmount();
  }, [selectedProducts, formData.discountPrice]);

  useEffect(() => {
    if (selectedCustomerId != null) {
      fetchCustomer();
    }
  }, [selectedCustomerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productIdsArray = selectedProducts.map((product) => product.id);
      const updatedFormData = {
        ...formData,
        customerId: selectedCustomerId,
        productIds: productIdsArray,
      };
      const response = await addData("/createInvoice", updatedFormData);
      if (response) {
        toast.success(response.message);
        setFormData({
          totalAmount: 0,
          discountPrice: 0,
          discountPercentage: null,
          productIds: [],
          status: null,
        });
        setSelectedCustomer(null)
        setSelectedProducts([])
      }
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };
  

  return (
    <div className="w-1/3">
      <h2 className="text-lg font-bold mb-4">Create Invoice</h2>
      <div className="flex justify-between">
        <button
          onClick={openCustomerModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Show Customers
        </button>
        <button
          onClick={openProductModal}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Show Products
        </button>
      </div>

      {showCustomerModal && (
        <CustomerDetailsModal
          setSelectedCustomerId={setSelectedCustomerId}
          closeModal={closeCustomerModal}
        />
      )}

      {showProductModal && (
        <ProductDetailsModal
          closeModal={closeProductModal}
          setSelectedProducts={setSelectedProducts}
          selectedProducts={selectedProducts}
        />
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        {selectedCustomer && (
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Customer Details</h2>
            <p>Name: {selectedCustomer.name}</p>
            <p>Email: {selectedCustomer.email}</p>
            <p>Phone: {selectedCustomer.phone}</p>
            <p>City: {selectedCustomer.city}</p>
          </div>
        )}

        {selectedProducts.length > 0 &&
          selectedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mb-4"
            >
              <h2 className="text-xl font-bold mb-4">Product Details</h2>
              <p>Name: {product.name}</p>
              <p>Description: {product.description}</p>
              <p>Price: ${product.price}</p>
              <p>Category: {product.category}</p>
            </div>
          ))}

        <div>
          <label htmlFor="discountPrice" className="block mb-1">
            Discount Price
          </label>
          <input
            type="number"
            id="discountPrice"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="totalAmount" className="block mb-1">
            Total Amount
          </label>
          <input
            type="number"
            id="totalAmount"
            name="totalAmount"
            value={formData.totalAmount}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
            required
          >
            <option value="">Select Status</option>
            <option value="paid">Paid</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Invoice
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default InvoiceCreateForm;
