// import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// import { useState } from "react";
import AuthLayout from "../layouts/auth";
import SignInPage from "../pages/auth/SignIn";
import SignUpPage from "../pages/auth/SignUp";
import ForgotPasswordPage from "../pages/auth/ForgotPassword";
import ResetPasswordPage from "../pages/auth/ResetPassword";
import VerifyPasswordPage from "../pages/auth/VerifyPassword";
import DashboardLayout from "../layouts/dashboard";
import DashboardPage from "../pages/app/DashboardPage";
import Profile from "../pages/app/Profile";
import Contacts from "../pages/app/Contacts";
import Chats from "../pages/app/Chats";
import Page404 from "../pages/Page404";
import { useSelector } from "react-redux";
import StudentProfile from "../pages/app/studentProfile";
// import LoadingScreen from "../components/LoadingScreen";

// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

export default function Router() {
  const role = useSelector((state) => state.app.user.role);

  return useRoutes([
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <SignInPage />,
        },
        {
          path: "register",
          element: <SignUpPage />,
        },
        {
          path: "forgot-password",
          element: <ForgotPasswordPage />,
        },
        {
          path: "reset-password",
          element: <ResetPasswordPage />,
        },
        {
          path: "verify",
          element: <VerifyPasswordPage />,
        },
        { path: "blank", element: "" },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/hc/dashboard" replace />, index: true },
        { path: "/hc/dashboard", element: <DashboardPage /> },
        {
          path: "/hc/profile",
          element: role === "student" ? <StudentProfile /> : <Profile />,
        },
        { path: "/hc/contacts", element: <Contacts /> },
        { path: "/hc/chats", element: <Chats /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },

    { path: "404", element: <Page404 /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// const GeneralApp = Loadable(
//   lazy(() => import("../pages/dashboard/GeneralApp"))
// );
// const Page404 = Loadable(lazy(() => import("../pages/Page404")));

// const VerifyPage = Loadable(lazy(() => import("../pages/auth/Verify")));
