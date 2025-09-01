import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-primary bg-opacity-90 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <Link to={token ? '/notes' : '/'} className="text-white text-xl sm:text-2xl font-bold text-center sm:text-left">
            Notes App
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 justify-center">
            {token ? (
              <>
                <Link
                  to="/notes"
                  className="text-white text-sm sm:text-base hover:bg-blue-700 hover:bg-opacity-50 px-3 py-1 rounded-md transition-colors duration-200"
                >
                  Notes
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white text-sm sm:text-base hover:bg-blue-700 hover:bg-opacity-50 px-3 py-1 rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white text-sm sm:text-base hover:bg-blue-700 hover:bg-opacity-50 px-3 py-1 rounded-md transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-white text-sm sm:text-base hover:bg-blue-700 hover:bg-opacity-50 px-3 py-1 rounded-md transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;