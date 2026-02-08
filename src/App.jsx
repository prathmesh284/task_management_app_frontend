/**
 * App Component
 * -------------
 * This is the root component of the frontend application.
 * It defines all client-side routes, authentication context,
 * and role-based route protection.
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import UsersPage from "./pages/UsersPage";

import TaskForm from "./components/TaskForm";
import TaskHistory from "./components/TaskHistory";

import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    /**
     * BrowserRouter enables client-side routing.
     * AuthProvider wraps the application to provide
     * authentication state globally.
     */
    <BrowserRouter>
      <AuthProvider>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Employee Routes */}
          <Route
            path="/employee"
            element={
              <ProtectedRoute>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <ProtectedRoute role="admin">
                <UsersPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/add-task"
            element={
              <ProtectedRoute role="admin">
                <TaskForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/all-tasks"
            element={
              <ProtectedRoute role="admin">
                <TaskHistory />
              </ProtectedRoute>
            }
          />
        </Routes>

      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
