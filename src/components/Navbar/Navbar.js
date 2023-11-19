import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"; // Update the path to where the useAuth hook is located
import "./Navbar.css";
import supabase from "../../utils/supabase";

function Navbar() {
  const { isLoggedIn, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigate("/login"); // Navigate to login page after logout
    } else {
      console.error("Logout Error:", error);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <div className="title">Thrift Exchange</div>
      </Link>
      {!loading && (
        <div className="links">
          {isLoggedIn ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/listing">Listing</Link>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
