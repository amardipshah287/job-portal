import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";

import {
  Home,
  Login,
  Signup,
  Aboutus,
  Page404,
  Otp,
  CompanyDashboard,
  AdminDashboard,
  UserDashboard,
  Contactus,
  Jobs,
  Admin,
  JobDetail,
} from "../pages/index";

import {
  JobPosting,
  Application,
  AiShortlisting,
  CompanyProfilePage,
  CompanyPayment,
  DashPage,
  AdminAnalytics,
  AdminApplication,
  AdminFeedback,
  AdminJobManagement,
  AdminNotification,
  AdminPayments,
  AdminUserManagement,
  AdminDash,
  UserProfile,
  UserJobApplication,
  UserJobAlert,
  UserSavedJobs,
  UserApplicationHistory,
} from "../components/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <PublicRoute />,
        children: [{ path: "", element: <Home /> }],
      },
      {
        element: <PublicRoute />,
        children: [
          { path: "signup", element: <Signup /> },
          { path: "login", element: <Login /> },
          { path: "otp", element: <Otp /> },
        ],
      },

      { path: "aboutus", element: <Aboutus /> },
      { path: "contactus", element: <Contactus /> },
      { path: "jobs", element: <Jobs /> },
      { path: "job/:company/:job", element: <JobDetail /> },
    ],
  },
  { path: "error/fof", element: <Page404 /> },

  { path: "/adminlogin", element: <Admin /> },

  {
    path: "/dashboard/admin",
    element: <ProtectedRoute allowedRoles={["Admin"]} />,
    children: [
      {
        path: "",
        element: <AdminDashboard />,
        children: [
          { path: "", element: <AdminDash /> },
          { path: "analytics", element: <AdminAnalytics /> },
          { path: "application", element: <AdminApplication /> },
          { path: "feedback", element: <AdminFeedback /> },
          { path: "job-management", element: <AdminJobManagement /> },
          { path: "notification", element: <AdminNotification /> },
          { path: "user-management", element: <AdminUserManagement /> },
          { path: "payments", element: <AdminPayments /> },
        ],
      },
    ],
  },

  {
    path: "/dashboard/seeker",
    element: <ProtectedRoute allowedRoles={["Seeker"]} />,
    children: [
      {
        path: "",
        element: <UserDashboard />,
        children: [
          { path: "", element: <UserProfile /> },
          { path: "job-applications", element: <UserJobApplication /> },
          { path: "job-alerts", element: <UserJobAlert /> },
          { path: "saved-jobs", element: <UserSavedJobs /> },
          { path: "user-job-history", element: <UserApplicationHistory /> },
        ],
      },
    ],
  },

  {
    path: "/dashboard/provider",
    element: <ProtectedRoute allowedRoles={["Company"]} />,
    children: [
      {
        element: <CompanyDashboard />,
        children: [
          { path: "", element: <DashPage /> },
          { path: "job-postings", element: <JobPosting /> },
          { path: "application", element: <Application /> },
          { path: "ai-shortlisting", element: <AiShortlisting /> },
          { path: "company-profile", element: <CompanyProfilePage /> },
          { path: "payments", element: <CompanyPayment /> },
        ],
      },
    ],
  },
]);

export default router;
