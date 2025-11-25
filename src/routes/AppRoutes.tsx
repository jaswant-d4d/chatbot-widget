import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import GuestLayout from "@/layouts/GuestLayout";
import UserLayout from "@/layouts/UserLayout";

import SuperAdminDashboard from "@/pages/superadmin/Dashboard";

import UserDashboard from "@/pages/user/Dashboard";
import Profile from "@/pages/user/settings/Profile";
import EditProfile from "@/pages/user/settings/EditProfile";
import ChangePassword from "@/pages/user/settings/ChangePassword";
import SiteSettings from "@/pages/SiteSettings";
import SettingsPage from "@/pages/user/settings/Settings";
import Conversations from "@/pages/user/Conversations";
import ChatbotSettings from "@/pages/user/ChatbotSettings";
import KnowledgeBasePage from "@/pages/user/KnowledgeBase";

import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Error404 from "@/pages/Error404";
import AuthRoute from "./AuthRoute";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import ForgotPassword from "@/pages/ForgotPassword";
import HomeView from "@/components/chatbox/conversation/HomeView";
import Companies from "@/pages/superadmin/companies/Companies";
import ErrorBoundary from "@/components/ErrorBoundary";
import Users from "@/pages/superadmin/users/Users";
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
  // SUPER ADMIN (Protected)
  // =========================
  {
    path: "/admin",
    element: (
      <ErrorBoundary >
        <PrivateRoute allowedRoles={["admin"]}>
          <SuperAdminLayout />
        </PrivateRoute>
      </ErrorBoundary >
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,  // /admin
        Component: SuperAdminDashboard
      },
      {
        path: "dashboard",  // /admin/dashboard
        Component: SuperAdminDashboard
      },
      {
        path: "users",  // /admin/dashboard
        Component: Users
      },
      {
        path: "companies",  // /admin/dashboard
        Component: Companies
      },
      {
        path: "site-settings",  // /admin/site-settings
        Component: SiteSettings
      },
      {
        path: "settings",  // /admin/settings
        Component: SettingsPage
      },

    ]
  },

  // =========================
  // USER (Protected)
  // =========================
  {
    path: "/user",
    element: (
      <ErrorBoundary>
        <PrivateRoute allowedRoles={["user"]}>
          <UserLayout />
        </PrivateRoute>
      </ErrorBoundary>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,  // /user
        Component: UserDashboard
      },
      {
        path: "dashboard",  // /user/dashboard
        Component: UserDashboard
      },
      {
        path: "site-settings",  // /user/site-settings
        Component: SiteSettings
      },
      {
        path: "settings",  // /user/settings
        Component: SettingsPage,
        children: [
          {
            path: "profile",  // /user/settings/profile
            Component: Profile
          },
          {
            path: "edit-profile",  // /user/settings/edit-profile
            Component: EditProfile
          },
          {
            path: "change-password",  // /user/settings/change-password
            Component: ChangePassword
          },
        ]
      },
      {
        path: "conversations",  // /user/conversations
        Component: Conversations
      },
      {
        path: "chatbot-settings",  // /user/chatbot-settings
        Component: ChatbotSettings
      },
      {
        path: "faq",  // /user/faq
        Component: KnowledgeBasePage
      },
    ]
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
    element: <Widget />
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
