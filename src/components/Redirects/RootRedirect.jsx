import { useEffect } from "react";
import { Navigate } from "react-router-dom";
const RootRedirect = () => {
  const token = localStorage.getItem("token");
  const hasVisited = localStorage.getItem("hasVisited");

  useEffect(() => {
    if (!hasVisited) {
      localStorage.setItem("hasVisited", "true");
    }
  }, [hasVisited]);

  if (token) return <Navigate to="/home" replace />;
  if (hasVisited) return <Navigate to="/login" replace />;

  return <Navigate to="/register" replace />;
};

export default RootRedirect;
