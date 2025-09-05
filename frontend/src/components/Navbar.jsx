import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  if (!token) return null; // Don't show navbar if not logged in

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">SATest</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Common Links */}
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              🏠 Home
            </Link>

            {/* Student Links */}
            {role === "student" && (
              <>
                {/* <Link
                  to="/student/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/student/dashboard") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📊 Dashboard
                </Link>
                <Link
                  to="/test-list"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/test-list") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📚 Tests
                </Link> */}
                <Link
                  to="/submission-history"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/submission-history") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📋 Attempts
                </Link>
              </>
            )}

            {/* Admin Links */}
            {role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/dashboard") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  🎛️ Dashboard
                </Link>
                <Link
                  to="/admin/test-list"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/test-list") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📝 Manage Tests
                </Link>
                <Link
                  to="/admin/add-test"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/add-test") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  ➕ Add Test
                </Link>
              </>
            )}

            {/* User Info & Logout */}
            <div className="flex items-center space-x-4 ml-6 border-l border-blue-500 pl-6">
              <span className="text-sm">
                👤 {role === "admin" ? "Admin" : "Student"}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
              >
                🚪 Logout
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={handleLogout}
              className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-col space-y-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/") ? "bg-blue-700" : "hover:bg-blue-500"
              }`}
            >
              🏠 Home
            </Link>

            {role === "student" && (
              <>
                <Link
                  to="/student/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/student/dashboard") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📊 Dashboard
                </Link>
                <Link
                  to="/test-list"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/test-list") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📚 Tests
                </Link>
                <Link
                  to="/submission-history"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/submission-history") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📋 History
                </Link>
              </>
            )}

            {role === "admin" && (
              <>
                <Link
                  to="/admin/dashboard"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/dashboard") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  🎛️ Dashboard
                </Link>
                <Link
                  to="/admin/test-list"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/test-list") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  📝 Manage Tests
                </Link>
                <Link
                  to="/admin/add-test"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/admin/add-test") ? "bg-blue-700" : "hover:bg-blue-500"
                  }`}
                >
                  ➕ Add Test
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
