import { Navigate } from "react-router-dom";
import React from "react";

export default function AdminRoute({ children }: { children: React.ReactNode }) {
  const userJson = localStorage.getItem("user");

  // Chưa đăng nhập → đá ra trang đăng nhập
  if (!userJson) return <Navigate to="/auth" replace />;

  const user = JSON.parse(userJson);
  const roles: string[] = user.roles || [];

  // Không phải admin → đá về trang chủ
  if (!roles.includes("ROLE_ADMIN")) {
    return <Navigate to="/" replace />;
  }

  return children;
}
