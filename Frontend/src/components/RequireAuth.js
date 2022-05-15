import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";

export const RequireAuth = ({ children }) => {
  const location = useLocation();
  const currentUser = AuthService.getCurrentUser();
  if (!currentUser) {
    return <Navigate to="/login" state={{ path: location.pathname }} />;
  }
  return children;
};
