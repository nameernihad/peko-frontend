import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiDocumentText,
  HiUser,
} from 'react-icons/hi';
import { FaFileInvoiceDollar } from "react-icons/fa";
import { twMerge } from 'tailwind-merge';

export function SideBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="relative h-screen">
      {/* Sidebar Toggle Button */}
      <div
        className="lg:hidden absolute top-4 left-4 cursor-pointer"
        onClick={toggleSidebar}
      >
        {showSidebar ? (
          <HiOutlineMinusSm size={24} />
        ) : (
          <HiOutlinePlusSm size={24} />
        )}
      </div>

      {/* Sidebar Content */}
      <Sidebar
        aria-label="Sidebar with multi-level dropdown example"
        className={twMerge('lg:w-72 fixed lg:relative h-full bg-white shadow-lg top-0', {
          'left-full': !showSidebar,
          'left-0': showSidebar,
        })}
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Link to="/">
              <Sidebar.Item icon={HiChartPie}>Dashboard</Sidebar.Item>
            </Link>
            <Link to="/create-invoice">
              <Sidebar.Item icon={FaFileInvoiceDollar}>Create Invoice</Sidebar.Item>
            </Link>
            <Link to="/manage-invoices">
              <Sidebar.Item icon={HiDocumentText}>Manage Invoices</Sidebar.Item>
            </Link>
            <Link to="/Customers">
              <Sidebar.Item icon={HiUser}>Customers</Sidebar.Item>
            </Link>
            <Link to="/Products">
              <Sidebar.Item icon={HiShoppingBag}>Products</Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>

      {/* Overlay for Small Screens */}
      {showSidebar && (
        <div
          className="lg:hidden fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
