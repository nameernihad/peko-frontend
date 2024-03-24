import React, { useEffect, useState } from "react";
import Table from "../../Table";
import ProductAddModal from "./ProductAddModal";
import ProductEditModal from "./ProductEditModal";
import { addData, deleteData, editData, getAllData, getDataById } from "../../../services/ApiFetch";

// Updated headingsData to include desired fields
const headingsData = [
  "index",
  "Product name",
  "Description",
  "Category",
  "Price",
  "Quantity",
  "Action",
];

export const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState();
  const [selectedProduct, setSelectedProduct] = useState({});
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
    const fetchProducts = async () => {
      try {
        const data = await getAllData('/getAllProduct');
        console.log(data)
        setProducts(data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async (newProductData) => {
    try {
      const data = await addData('/createProduct', newProductData);
      if (data) {
        console.log('Product added:', data);
        setProducts([...products, data]); // Update products state with the new product
        closeModal(); // Close the modal after adding the product
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (newProductData) => {
    try {
      const data = await editData(`/editProduct/${productId}`, newProductData);
      if (data) {
        console.log('Product edited:', data);
        const updatedProducts = products.map(product =>
          product.id === data.id ? data : product
        );
        setProducts(updatedProducts); // Update products state after editing
        closeEditModal(); // Close the edit modal after editing
      }
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };
  const handleGetProductById = async (productId) => {
    try {
      const data = await getDataById(`/getProductById/${productId}`);
      if (data) {
        setSelectedProduct(data)
      }
    } catch (error) {
      console.error('Error get product:', error);
    }
  };

    

  const handleEdit = (index) => {
    const productId = products[index].id;
    setProductId(productId)
    handleGetProductById(productId)
    openEditModal()
  };

  const handleDelete = async (index) => {
    const productId = products[index].id;
    const data = await deleteData(`/deleteProduct/${productId}`)
    if (data) {
      console.log('Product Deleted:', data);
        const updatedProducts = products.filter(product => product.id !== productId);
        setProducts(updatedProducts);
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
              + Add Product
            </button>
          </div>
        </div>
        <Table
          headings={headingsData}
          data={products.map((product, index) => ({
            index: index + 1,
            name: product.name,
            description: product.description,
            category: product.category,
            price: product.price,
            quantity:product.quantity,
          }))}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          loading={loading} 
        />
      </div>
      {modalOpen && <ProductAddModal closeModal={closeModal} handleAddProduct={handleAddProduct}  />}
      {editModalOpen && <ProductEditModal closeModal={closeEditModal} handleEditProduct={handleEditProduct} selectedProduct={selectedProduct}  />}
      
    </>
  );
};

export default ProductTable;
