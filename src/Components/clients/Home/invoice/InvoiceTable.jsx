import React, { useEffect, useState } from "react";
import Table from "../../../Table";
import { getAllData, deleteData, getDataById } from "../../../../services/ApiFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faEye } from "@fortawesome/free-solid-svg-icons";
import ProductListModal from "./ProductListModal";
import InvoiceModal from "./InvoiceModal";

const headingsData = [
  "index",
  "invoiceId",
  "Customer Name",
  "Phone",
  "totalAmount",
  "status",
  "Products",
  "Download Invoice",
  "Action",
];

export const InvoicesTable = () => {
  const [Invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState({});
  const [productModal,setProductModal]= useState(false)
  const [invoiceModal,setInvoiceModal]= useState(false)

  const handleModal = ()=>{
    setProductModal(!productModal)
  }

  const handleInvoiceModal = async(id)=>{
    try {
        const data = await getDataById(`/getInvoiceById/${id}`);
        setSelectedInvoice(data.invoice);
        setInvoiceModal(true)
      } catch (error) {
        console.error('Error fetching Invoices:', error);
        setLoading(false);
      }
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
            Download:<FontAwesomeIcon onClick={()=>handleInvoiceModal(invoice.invoiceId)} className="w-5 h-5" icon={faDownload} />
          }))}
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
      {productModal && <ProductListModal closeModal={handleModal} selectedProducts={selectedProducts} />}
      {invoiceModal && <InvoiceModal setIsOpen={setInvoiceModal} isOpen={invoiceModal} invoiceInfo={selectedInvoice} />}
    </>
  );
};

export default InvoicesTable;
