import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "../Pages/Clients/Home";
import UserLogin from "../Pages/Clients/Login";
import Register from "../Pages/Clients/Register";
import VerifyEmail from "../Components/clients/Login/VerifyEmail";
import { Dashboard } from "../Components/clients/Home/Dashboard";
import ProductTable from "../Components/clients/Home/ProductTable";
import { CustomerTable } from "../Components/clients/Home/customer/CustomerTable";
import SharedLayout from "../Components/SharedLayout";
import InvoicesTable from "../Components/clients/Home/invoice/InvoiceTable";
import InvoiceCreateForm from "../Components/clients/Home/invoice/CreateInvoice";


function UserRoute() {
    const IsAuth = useSelector((state) => state.Client);

  return (
    <div>
      <Routes>
        <Route path="/" element={IsAuth.Token ? <Dashboard /> : <UserLogin />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={IsAuth.Token ? <Home /> : <UserLogin />} />
        <Route path="/verify/:token" element={<VerifyEmail />} />

        <Route element={<SharedLayout  />}>
          <Route index element={<Dashboard />} />
          <Route path="/Products" element={<ProductTable />} />
          <Route path="/Customers" element={<CustomerTable />} />
          <Route path="/manage-invoices" element={<InvoicesTable />} />
          <Route path="/create-invoice" element={<InvoiceCreateForm />} />
        </Route>
      </Routes>
    </div>
  );
}


export default UserRoute;
