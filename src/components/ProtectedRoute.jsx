import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ allowedRoles }) => {
  const { auth } = useSelector((store) => store);

  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Still loading current user
  if (auth.loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-indigo-600" />
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Token exists but user information is unavailable
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }

  // Role authorization
  if (allowedRoles && !allowedRoles.includes(auth.user.role))
    return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
