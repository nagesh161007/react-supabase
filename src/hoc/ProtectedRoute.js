import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import supabase from "../utils/supabase"; // Adjust the import path
import Loader from "../components/Loader/Loader";
function ProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setIsAuthenticated(true);
      } else {
        navigate("/login"); // Redirect to login if not authenticated
      }
    };

    checkUser();
  }, [navigate]);

  if (!isAuthenticated) {
    return <Loader></Loader>; // Or any loading state representation
  }

  return <Outlet />;
}

export default ProtectedRoute;
