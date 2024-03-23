import { googleLogout } from '@react-oauth/google';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClientLogout } from '../../../Redux/ClientAuth';
import { Link } from 'react-router-dom';



const Navbar = () => {
    const dispatch = useDispatch();

    const logout = () => {
        dispatch(ClientLogout());
        googleLogout();
      };

      const user = useSelector((state) => state.Client.Token);

  return (
    <nav className="bg-blue-100 p-4">
      <div className="container mx-auto flex justify-between">
        <a href="#" className="text-xl font-bold">Navbar</a>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-blue-700">Home</a></li>
          <li><a href="#" className="text-blue-700">Link</a></li>
          <li className="relative">
            <a href="#" className="text-blue-700">Dropdown</a>
            <div className="absolute top-full left-0 w-36 bg-white border rounded shadow-lg hidden">
              <ul className="py-1">
                <li><a href="#" className="block px-4 py-2 text-blue-700">Action</a></li>
                <li><a href="#" className="block px-4 py-2 text-blue-700">Another action</a></li>
                <li><hr className="border-t my-1" /></li>
                <li><a href="#" className="block px-4 py-2 text-blue-700">Something else here</a></li>
              </ul>
            </div>
          </li>
          <li><a href="#" className="text-blue-700">Disabled</a></li>
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
