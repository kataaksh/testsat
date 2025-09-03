import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AuthSuccess = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [params, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <span className="text-xl font-semibold">Logging you in...</span>
    </div>
  );
};

export default AuthSuccess;