import { useEffect, useState } from "react";
import Section from "../components/UserSection"
import { getAllUsers } from "../api/user.api";
const UsersPage = () => {
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers()
      .then((res) => {
        setAdmins(res.filter((r) => r.role === "admin"));
        setEmployees(res.filter((r) => r.role === "employee"));
      })
      .finally(() => setLoading(false));
  }, []);

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

        {/* ADMINS */}
        <Section title="Admins" users={admins} />

        {/* EMPLOYEES */}
        <Section title="Employees" users={employees} />
      </div>
    </div>
  );
};

export default UsersPage;
