/**
 * UsersPage
 * ---------
 * This page displays all users in the system,
 * grouped by role (Admins and Employees).
 * It is intended for admin users only.
 */

import { useEffect, useState } from "react";

import Section from "../components/UserSection";
import { getAllUsers } from "../api/user.api";


const UsersPage = () => {
  // State to store admin users
  const [admins, setAdmins] = useState([]);

  // State to store employee users
  const [employees, setEmployees] = useState([]);

  // State to handle loading indicator
  const [loading, setLoading] = useState(true);

  /**
   * Fetch all users on component mount
   * and separate them based on role.
   */
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setAdmins(res.filter((r) => r.role === "admin"));
        setEmployees(res.filter((r) => r.role === "employee"));
      })
      .finally(() => setLoading(false));
  }, []);

  // Show loading state while fetching data
  if (loading) {
    return (
      <div className="p-6 text-gray-500">
        Loading users...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold mb-6 ml-1">
          Users
        </h1>

        {/* ADMIN USERS */}
        <Section title="Admins" users={admins} />

        {/* EMPLOYEE USERS */}
        <Section title="Employees" users={employees} />

      </div>
    </div>
  );
};

export default UsersPage;
