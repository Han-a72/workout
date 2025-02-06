import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const token = localStorage.getItem('token'); // Check if token exists (i.e., user is logged in)

  const handleLogout = (e) => {
    e.preventDefault();  // Prevent the default link behavior

    // Ask the user for confirmation before logging out
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    
    if (confirmLogout) {
      // If user confirms, remove the token and navigate to login page
      localStorage.removeItem('token');
      window.location.href = '/login'; // Redirect to login page
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">Fitness App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!token ? (
              // If user is not logged in, show "Login" and "Register"
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              // If user is logged in, show "Dashboard" and "Logout"
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn btn-danger" href="#" onClick={handleLogout}>Logout</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
