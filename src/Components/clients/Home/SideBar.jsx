import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { Sidebar } from 'flowbite-react';
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineMinusSm,
  HiOutlinePlusSm,
  HiShoppingBag,
  HiTable,
  HiUser,
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';

export function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example" className='shadow-lg shadow-gray-400 h-screen' > 
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* Use Link component for navigation */}
          <Link to="/">
            <Sidebar.Item icon={HiChartPie}>
              Dashboard
            </Sidebar.Item>
          </Link>
          <Sidebar.Collapse
            icon={HiShoppingBag}
            label="Invoice"
            renderChevronIcon={(theme, open) => {
              const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

              return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
            }}
          >
            <Link to="/create-invoice">
              <Sidebar.Item>Create Invoice</Sidebar.Item>
            </Link>
            <Link to="/manage-invoices">
              <Sidebar.Item>Manage Invoices</Sidebar.Item>
            </Link>
          </Sidebar.Collapse>
          <Link to="/Customers">
            <Sidebar.Item icon={HiUser}>
              Customers
            </Sidebar.Item>
          </Link>
          <Link to="/Products">
            <Sidebar.Item icon={HiShoppingBag}>
              Products
            </Sidebar.Item>
          </Link>
          <Link to="/account">
            <Sidebar.Item icon={HiInbox}>
              Account
            </Sidebar.Item>
          </Link>
          <Link to="/sign-in">
            <Sidebar.Item icon={HiArrowSmRight}>
              Sign In
            </Sidebar.Item>
          </Link>
          <Link to="/sign-up">
            <Sidebar.Item icon={HiTable}>
              Sign Up
            </Sidebar.Item>
          </Link>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
