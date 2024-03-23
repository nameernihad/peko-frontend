import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ClientLogout } from '../../../Redux/ClientAuth';
import { googleLogout } from '@react-oauth/google';

function Navbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.Client.Token);

  const logout = () => {
    dispatch(ClientLogout());
    googleLogout();
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link className="text-white" to="/">
              <b>My-Car</b>
            </Link>
          </div>

          <div className="flex items-center">
            <ul className="flex items-center space-x-4">
              <li>
                <Link
                  className="text-white hover:text-gray-300"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {user ? (
                <li>
                  <Link
                    className="text-white hover:text-gray-300"
                    to="/"
                    onClick={logout}
                  >
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-white hover:text-gray-300"
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
