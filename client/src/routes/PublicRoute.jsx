import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { Home } from "../pages";

const PublicRoute = () => {
  const user = useSelector((state) => state?.auth?.user);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);

  console.log(user);
  console.log(user?.role);
  console.log(isAuthenticated);

  if (isAuthenticated) {
    if (user?.role === "Seeker") {
      return <Home />;
    }
    if (user?.role === "Company") {
      return <Navigate to="/dashboard/provider" replace />;
    }
    if (user?.role === "Admin") {
      return <Navigate to="/dashboard/admin" replace />;
    }
  }
  return <Outlet />;
};

export default PublicRoute;
