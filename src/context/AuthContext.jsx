/**
 * Authentication Context
 * ----------------------
 * This context manages authentication state
 * and provides login/logout functionality
 * across the application.
 */

import { createContext, useContext, useState } from "react";

/**
 * Create authentication context.
 */
const AuthContext = createContext(null);


/**
 * AuthProvider
 * ------------
 * Wraps the application and provides
 * authentication state and actions.
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  /**
   * Logs in the user.
   * Stores JWT token and role in localStorage.
   *
   * @param {string} token - JWT access token
   * @param {string} role - User role (admin / employee)
   */
  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setUser({ role });
  };

  /**
   * Logs out the user.
   * Clears authentication data from localStorage.
   */
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * useAuth
 * -------
 * Custom hook to access authentication context.
 *
 * @returns {Object} Auth state and actions
 */
export const useAuth = () => useContext(AuthContext);
