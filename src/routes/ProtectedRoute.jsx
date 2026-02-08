/**
 * ProtectedRoute Component
 * ------------------------
 * This component restricts access to routes
 * based on authentication and optional role-based authorization.
 */

import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, role }) => {
  // Retrieve authentication data from localStorage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  /**
   * Redirect to login if user is not authenticated.
   */
  if (!token) return <Navigate to="/login" />;

  /**
   * Redirect to login if user role does not match
   * the required role for the route.
   */
  if (role && role !== userRole) {
    return <Navigate to="/login" />;
  }

  // Render protected content if access is allowed
  return children;
};

export default ProtectedRoute;
