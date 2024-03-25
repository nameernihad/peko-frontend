import { googleLogout } from '@react-oauth/google';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientLogout } from '../../../Redux/ClientAuth';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.Client.Token);

  const logout = () => {
    dispatch(ClientLogout());
    googleLogout();
  };

  return (
    <nav className="bg-blue-100 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Navbar</Link>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-blue-700">Home</Link></li>
          <li><Link to="/" className="text-blue-700">Link</Link></li>
          <li className="relative">
            <button
              className="text-blue-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              Dropdown
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 w-36 bg-white border rounded shadow-lg">
                <ul className="py-1">
                  <li><Link to="/" className="block px-4 py-2 text-blue-700">Action</Link></li>
                  <li><Link to="/" className="block px-4 py-2 text-blue-700">Another action</Link></li>
                  <li><hr className="border-t my-1" /></li>
                  <li><Link to="/" className="block px-4 py-2 text-blue-700">Something else here</Link></li>
                </ul>
              </div>
            )}
          </li>
          <li><Link to="/" className="text-blue-700">Disabled</Link></li>
        </ul>
        {user ? (
          <Link
            className="text-slate-600 font-semibold"
            to="/"
            onClick={logout}
          >
            Logout
          </Link>
        ) : (
          <Link
            className="text-slate-600 font-semibold"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
