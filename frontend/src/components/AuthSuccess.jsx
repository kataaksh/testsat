import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const AuthSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);

      // decode token to extract role
      const decoded = jwtDecode(token);
      localStorage.setItem("role", decoded.role);

      // redirect based on role
      if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/student/dashboard"); // or /test-list
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Loading...</p>;
};

export default AuthSuccess;
