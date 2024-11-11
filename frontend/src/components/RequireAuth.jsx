import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";

export const RequireAuth = ({ allowedRoles = [] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const decodedPayload = auth?.accessToken
    ? jwtDecode(auth.accessToken)
    : undefined;

  const role = decodedPayload.role || undefined;

  return role && allowedRoles?.includes(role) ? (
    <Outlet />
  ) : role ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
