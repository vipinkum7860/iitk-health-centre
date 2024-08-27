import React from "react";
import Heading from "./Heading";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthLayout() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  if (isLoggedIn) {
    return <Navigate to={"/hc/dashboard"} />;
  }
  return (
    <div>
      <Heading />
      <Outlet />
    </div>
  );
}

export default AuthLayout;
