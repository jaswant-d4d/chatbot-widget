import { createBrowserRouter } from "react-router-dom";

import GuestLayout from "@/layouts/GuestLayout";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Error404 from "@/pages/Error404";
import AuthRoute from "./AuthRoute";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import HomeView from "@/components/chatbox/conversation/HomeView";
import ErrorBoundary from "@/components/ErrorBoundary";
import Widget from "@/pages/Widget";

export const router = createBrowserRouter([
  // =========================
  // GUEST ROUTES
  // =========================
  {
    path: "/",
    element: (<ErrorBoundary><GuestLayout /></ErrorBoundary>),
    errorElement: <ErrorBoundary />
  },
  {
    path: "/home",
    element: <ErrorBoundary><HomeView /></ErrorBoundary>,
    errorElement: <ErrorBoundary />
  },
  // =========================
  // AUTH
  // =========================
  {
    path: "login",
    element: (
      <ErrorBoundary >
        <AuthRoute>
          <Login />
        </AuthRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "signup",
    element: (
      <ErrorBoundary>
        <AuthRoute>
          <Signup />
        </AuthRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "verify-email",
    element: (
      <ErrorBoundary>
        <AuthRoute>
          <VerifyEmail />
        </AuthRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "forgot-password",
    element: (
      <ErrorBoundary>
        <AuthRoute>
          <ForgotPassword />
        </AuthRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "reset-password/:token",
    element: (
      <ErrorBoundary>
        <AuthRoute>
          <ResetPassword />
        </AuthRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
  },

  {
    path: "/widget",
    element: (
      <ErrorBoundary>
        <Widget />
      </ErrorBoundary>
    )
  },

  // =========================
  // 404 Not Found
  // =========================
  {
    path: "*",
    Component: Error404
    // element: (
    //   <div className="text-center py-20">
    //     <h1 className="text-2xl font-bold">404 – Page Not Found</h1>
    //   </div>
    // ),
  },
])
