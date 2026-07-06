import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }) => {
  const user = useSelector((state) => state?.auth?.user);
  const isAuthenticated = useSelector((state) => state?.auth?.isLoggedIn);

  console.log(user);
  console.log(user?.role);
  console.log(isAuthenticated);
  console.log(allowedRoles);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/error/fof" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
