// SharedLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from './clients/Home/SideBar';
import Navbar from './clients/Home/NavBar';

function SharedLayout() {
  return (
    <div>
      <Navbar/>
      <div className="layout flex">
      <SideBar/>
      <main className="content flex justify-center pt-28 w-full">
        <Outlet /> 
      </main>
    </div>
    </div>
    
  );
}

export default SharedLayout;
