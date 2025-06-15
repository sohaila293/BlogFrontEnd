import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-pink-600 p-4 flex justify-end items-center text-white">
      {
        user ? (
          <button
            onClick={handleLogout}
            className="hover:underline cursor-pointer font-semibold"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )
      }
      
    </nav>
  );
};

export default Navbar;
