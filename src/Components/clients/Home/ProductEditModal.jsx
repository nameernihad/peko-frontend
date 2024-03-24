import React, { useEffect, useState } from 'react';

const ProductEditModal = ({ closeModal , handleEditProduct,selectedProduct}) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
      });
    
      const [nameError, setNameError] = useState('');
      const [descriptionError, setDescriptionError] = useState('');
      const [categoryError, setCategoryError] = useState('');
      const [priceError, setPriceError] = useState('');
      const [quantityError, setQuantityError] = useState('');
    
      useEffect(() => {
        if (selectedProduct) {
          setFormData({
            name: selectedProduct.name,
            description: selectedProduct.description,
            category: selectedProduct.category,
            price: selectedProduct.price,
            quantity: selectedProduct.quantity,
          });
        }
      }, [selectedProduct]);
    
      const validateName = (value) => {
        if (!value.trim()) {
          setNameError('Product Name is required');
        } else {
          setNameError('');
        }
      };
    
      const validateDescription = (value) => {
        if (!value.trim()) {
          setDescriptionError('Description is required');
        } else {
          setDescriptionError('');
        }
      };
    
      const validateCategory = (value) => {
        if (!value.trim()) {
          setCategoryError('Category is required');
        } else {
          setCategoryError('');
        }
      };
    
      const validatePrice = (value) => {
        if (!value.trim()) {
          setPriceError('Price is required');
        } else if (isNaN(value) || Number(value) <= 0) {
          setPriceError('Price must be a positive number');
        } else {
          setPriceError('');
        }
      };
    
      const validateQuantity = (value) => {
        if (!value.trim()) {
          setQuantityError('Quantity is required');
        } else if (isNaN(value) || Number(value) <= 0) {
          setQuantityError('Quantity must be a positive number');
        } else {
          setQuantityError('');
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
    
        // Validate input based on field name
        switch (name) {
          case 'name':
            validateName(value);
            break;
          case 'description':
            validateDescription(value);
            break;
          case 'category':
            validateCategory(value);
            break;
          case 'price':
            validatePrice(value);
            break;
          case 'quantity':
            validateQuantity(value);
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if all fields are valid
        if (nameError || descriptionError || categoryError || priceError || quantityError) {
          console.log('Form has errors. Please fix them.');
          return;
        }
    
        // Proceed with form submission
        handleEditProduct(formData);
        closeModal();
      };
    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Add Product</h2>
          <i
            className="fas fa-times text-2xl text-slate-300 cursor-pointer"
            onClick={closeModal}
          ></i>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-20 resize-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {descriptionError && <p className="text-red-500 text-sm mt-1">{descriptionError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter product category"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter product price"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Enter product quantity"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {quantityError && <p className="text-red-500 text-sm mt-1">{quantityError}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
