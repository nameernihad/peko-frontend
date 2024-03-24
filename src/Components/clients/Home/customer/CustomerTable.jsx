import React, { useEffect, useState } from "react";
import Table from "../../../Table";
import CustomerAddModal from "./CustomerAddModal";
import CustomerEditModal from "./CustomerEditModal";
import { addData, deleteData, editData, getAllData, getDataById } from "../../../../services/ApiFetch";

const headingsData = [
  "index",
  "Name",
  "Email",
  "Phone",
  "City",
  "Action"
];

export const CustomerTable = () => {
  const [Customers, setCustomers] = useState([]);
  const [CustomerId, setCustomerId] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [loading, setLoading] = useState(true); 
  const [modalOpen,setModalOpen]=useState(false)
  const [editModalOpen,setEditModalOpen]=useState(false)

  const openModal = ()=>{
    setModalOpen(true)
  }
  const closeModal = ()=>{
    setModalOpen(false)
  }
  const openEditModal = ()=>{
    setEditModalOpen(true)
  }
  const closeEditModal = ()=>{
    setEditModalOpen(false)
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await getAllData('/getAllCustomers');
        console.log(data)
        setCustomers(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching Customers:', error);
        setLoading(false); 
      }
    };

    fetchCustomers();
  }, []);

  const handleAddCustomer = async (newCustomerData) => {
    try {
      const data = await addData('/createCustomer', newCustomerData);
      if (data) {
        console.log('Customer added:', data);
        setCustomers([...Customers, data.customer]); // Update Customers state with the new Customer
        closeModal(); // Close the modal after adding the Customer
      }
    } catch (error) {
      console.error('Error adding Customer:', error);
    }
  };

  const handleEditCustomer = async (newCustomerData) => {
    try {
      const data = await editData(`/editCustomer/${CustomerId}`, newCustomerData);
      if (data) {
        console.log('Customer edited:', data);
        const updatedCustomers = Customers.map(Customer =>
          Customer.id === data.customer.id ? data.customer : Customer
        );
        setCustomers(updatedCustomers); // Update Customers state after editing
        closeEditModal(); // Close the edit modal after editing
      }
    } catch (error) {
      console.error('Error editing Customer:', error);
    }
  };
  const handleGetCustomerById = async (CustomerId) => {
    try {
      console.log(CustomerId)
      const data = await getDataById(`/getCustomerById/${CustomerId}`);
      if (data) {
        setSelectedCustomer(data.customer)
      }
    } catch (error) {
      console.error('Error get Customer:', error);
    }
  };

    

  const handleEdit = (index) => {
    const CustomerId = Customers[index].id;
    setCustomerId(CustomerId)
    handleGetCustomerById(CustomerId)
    openEditModal()
  };

  const handleDelete = async (index) => {
    const CustomerId = Customers[index].id;
    const data = await deleteData(`/deleteCustomer/${CustomerId}`)
    if (data) {
      console.log('Customer Deleted:', data);
        const updatedCustomers = Customers.filter(Customer => Customer.id !== CustomerId);
        setCustomers(updatedCustomers);
    }
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
              onClick={openModal}
            >
              + Add Customer
            </button>
          </div>
        </div>
        <Table
          headings={headingsData}
          data={Customers.map((Customer, index) => ({
            index: index + 1,
            name: Customer.name,
            email: Customer.email,
            phone: Customer.phone,
            city: Customer.city,
          }))}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={loading} 
        />
      </div>
      {modalOpen && <CustomerAddModal closeModal={closeModal} handleAddCustomer={handleAddCustomer}  />}
      {editModalOpen && <CustomerEditModal closeModal={closeEditModal} handleEditCustomer={handleEditCustomer} selectedCustomer={selectedCustomer}  />}
      
    </>
  );
};

export default CustomerTable;
