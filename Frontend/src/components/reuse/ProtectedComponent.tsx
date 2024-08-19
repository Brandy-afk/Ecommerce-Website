import React from "react";
import { Navigate } from "react-router-dom";
import { isAdmin } from "../../helpers/auth";
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedComponent({ children }: ProtectedRouteProps) {
  if (!isAdmin()) {
    // Redirect to home page if admin access is required but user is not an admin
    return <Navigate to="/admin/login" replace />; //TODO commented out for now
  }

  return <>{children}</>;
}
