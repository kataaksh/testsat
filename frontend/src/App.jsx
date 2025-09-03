import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import AddTest from "./components/AddTest";
import TestViewer from "./components/TestViewer";
import TestList from "./components/TestList";
import AdminTestList from "./components/AdminTestList";
import EditTest from "./components/EditTest";
import AuthForm from "./components/AuthForm";
import AuthSuccess from "./components/AuthSuccess";
import LogoutButton from "./components/LogoutButton";
import AdminDashboard from "./components/AdminDashboard"; // ✅ import

// ✅ Protected home page
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">SATest Platform</h1>

      {/* Instead of separate links, admins should use dashboard */}
      <a
        href="/admin/dashboard"
        className="mb-2 px-4 py-2 bg-purple-600 text-white rounded"
      >
        Admin Dashboard
      </a>

      <a
        href="/test-list"
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        View Tests (Student)
      </a>

      {/* 🔴 Show logout only if logged in */}
      {localStorage.getItem("token") && (
        <div className="mt-4">
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-test" element={<AddTest />} />
        <Route path="/admin/test-list" element={<AdminTestList />} />
        <Route path="/admin/edit-test/:id" element={<EditTest />} />

        {/* Student */}
        <Route path="/test-viewer/:id" element={<TestViewer />} />
        <Route path="/test-list" element={<TestList />} />

        {/* Auth */}
        <Route path="/login" element={<AuthForm mode="login" />} />
        <Route path="/signup" element={<AuthForm mode="signup" />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* Default */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
