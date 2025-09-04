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
import AdminDashboard from "./components/AdminDashboard";
import StudentDashboard from "./components/StudentDashboard";
import Navbar from "./components/Navbar";
import TestSubmission from "./components/TestSubmission";
import TestResults from "./components/TestResults";
import SubmissionHistory from "./components/SubmissionHistory";

// ✅ Protected home page
const HomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role"); // read role

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // redirect if not logged in
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">SATest Platform</h1>

      {/* ✅ Show Admin Dashboard link only if user is admin */}
      {role === "admin" && (
        <a
          href="/admin/dashboard"
          className="mb-2 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Admin Dashboard
        </a>
      )}

      {/* ✅ Show Student Dashboard link only if user is student */}
      {role === "student" && (
        <a
          href="/student/dashboard"
          className="mb-2 px-4 py-2 bg-green-600 text-white rounded"
        >
          Student Dashboard
        </a>
      )}

      {/* Logout for both */}
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
      <Navbar />
      <Routes>

        <Route path="/student/dashboard" element={<StudentDashboard />} />
        {/* Admin */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-test" element={<AddTest />} />
        <Route path="/admin/test-list" element={<AdminTestList />} />
        <Route path="/admin/edit-test/:id" element={<EditTest />} />

        {/* Student */}
        <Route path="/test-viewer/:id" element={<TestViewer />} />
        <Route path="/test-list" element={<TestList />} />
        <Route path="/test-submission/:id" element={<TestSubmission />} />
        <Route path="/test-results/:submissionId" element={<TestResults />} />
        <Route path="/submission-history" element={<SubmissionHistory />} />

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
