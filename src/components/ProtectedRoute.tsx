import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../redux/store";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated && !localStorage.getItem("token")) {
    return <Navigate to="/" />;
  }

  // Otherwise, render the protected content
  return children;
};

export default ProtectedRoute;
