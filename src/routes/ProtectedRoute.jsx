// ProtectedRoute.jsx

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children, user }) => {
  const [toastDisplayed, setToastDisplayed] = useState(false);

  useEffect(() => {
    if (!user && !toastDisplayed) {
      // Display toast.error when accessing ProtectedRoute without authorization
      toast.error("You are not authorized");
      setToastDisplayed(true);
    }
  }, [user, toastDisplayed]);

  if (!user) {
    // Navigate to "/" when not authorized
    return <Navigate to="/" />;
  }

  // If the user is authorized, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
