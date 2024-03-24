import React, { useEffect, useState } from "react";
import Table from "../../../Table";
import { getAllData, deleteData, getDataById } from "../../../../services/ApiFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import ProductAddModal from "../ProductAddModal";
import ProductListModal from "./ProductListModal";

const headingsData = [
  "index",
  "invoiceId",
  "Customer Name",
  "Phone",
  "totalAmount",
  "status",
  "Products",
  "Action",
];

export const InvoicesTable = () => {
  const [Invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [productModal,setProductModal]= useState(false)

  const handleModal = ()=>{
    setProductModal(!productModal)
  }

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getAllData('/getAllInvoices');
        setInvoices(data.invoices);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Invoices:', error);
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const handleDelete = async (index) => {
    const InvoicesId = Invoices[index].invoiceId;
    const data = await deleteData(`/deleteInvoice/${InvoicesId}`);
    if (data) {
      console.log('Invoice Deleted:', data);
      const updatedInvoices = Invoices.filter((invoice) => invoice.invoiceId !== InvoicesId);
      setInvoices(updatedInvoices);
    }
  };

  const handleProductModal = async (invoiceId)=>{
    console.log(invoiceId)
    const data = await getDataById(`/getInvoiceById/${invoiceId}`);
    if (data) {
        console.log(data)
      setSelectedProducts(data.invoice.Products)
      handleModal()
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2"
            >
              + Add Invoices
            </button>
          </div>
        </div>
        <Table
          headings={headingsData}
          data={Invoices.map((invoice, index) => ({
            index: index + 1,
            invoiceId: invoice.invoiceId.substring(0, 10),
            customerName: invoice?.Customer?.name,
            customerPhone: invoice?.Customer?.phone,
            totalAmount: invoice.totalAmount,
            status: (
              <span style={{ color: invoice.status === 'paid' ? 'green' : 'red' }}>
                {invoice.status}
              </span>
            ),
            Products: <FontAwesomeIcon onClick={()=>handleProductModal(invoice.invoiceId)} icon={faEye} />,
          }))}
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
      {productModal && <ProductListModal closeModal={handleModal} selectedProducts={selectedProducts} />}
    </>
  );
};

export default InvoicesTable;
