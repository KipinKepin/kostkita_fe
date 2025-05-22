import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (role !== "admin" || !token) {
    return <Navigate to={"/"} replace />;
  }
  return children;
};

export default ProtectedRoutes;
