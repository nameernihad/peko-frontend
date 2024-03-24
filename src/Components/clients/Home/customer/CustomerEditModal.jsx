import React, { useEffect, useState } from 'react';

const CustomerEditModal = ({ closeModal , handleEditCustomer, selectedCustomer }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        city: '',
      });
    
      const [nameError, setNameError] = useState('');
      const [emailError, setEmailError] = useState('');
      const [phoneError, setPhoneError] = useState('');
      const [cityError, setCityError] = useState('');
    
      useEffect(() => {
        if (selectedCustomer) {
          setFormData({
            name: selectedCustomer.name,
            email: selectedCustomer.email,
            phone: selectedCustomer.phone,
            city: selectedCustomer.city,
          });
        }
      }, [selectedCustomer]);
    
      const validateName = (value) => {
        if (!value.trim()) {
          setNameError('Name is required');
        } else {
          setNameError('');
        }
      };
    
      const validateEmail = (value) => {
        if (!value.trim()) {
          setEmailError('Email is required');
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          setEmailError('Invalid email format');
        } else {
          setEmailError('');
        }
      };
    
      const validatePhone = (value) => {
        if (!value.trim()) {
          setPhoneError('Phone number is required');
        } else if (!/^\d{10}$/.test(value)) {
          setPhoneError('Invalid phone number');
        } else {
          setPhoneError('');
        }
      };
    
      const validateCity = (value) => {
        if (!value.trim()) {
          setCityError('City is required');
        } else {
          setCityError('');
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
          case 'email':
            validateEmail(value);
            break;
          case 'phone':
            validatePhone(value);
            break;
          case 'city':
            validateCity(value);
            break;
          default:
            break;
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        // Check if all fields are valid
        if (nameError || emailError || phoneError || cityError) {
          console.log('Form has errors. Please fix them.');
          return;
        }
    
        // Proceed with form submission
        handleEditCustomer(formData);
        closeModal();
      };
    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-md">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Edit Customer</h2>
          <i className="fas fa-times text-2xl text-slate-300 cursor-pointer" onClick={closeModal}></i>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter customer name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter customer email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter customer phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Enter customer city"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
            />
            {cityError && <p className="text-red-500 text-sm mt-1">{cityError}</p>}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Edit Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerEditModal;
