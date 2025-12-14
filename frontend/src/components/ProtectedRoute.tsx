import React, { useEffect, useState } from "react";
import type { ReactNode } from "react"; // 🔥 type-only import
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute = ({ children, adminOnly = false }: ProtectedRouteProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const u = getUser();
    setUser(u);
    setLoading(false);
  }, []);

  if (loading) return null; // or a spinner

  if (!user) return <Navigate to="/" />;

  if (adminOnly && !user.isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};

export default ProtectedRoute;
