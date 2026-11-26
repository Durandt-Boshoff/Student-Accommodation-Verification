import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";

export default function ProtectedRoute({ allowedRoles }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkAuthentication = async () => {
      try {
        const currentUser = await getCurrentUser();

        if (isMounted) {
          setUser(currentUser);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);

        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    checkAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  // Show loading state while checking the session
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">
          Verifying your session...
        </p>
      </div>
    );
  }

  // Redirect unauthenticated users
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect users who do not have the required role
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    const correctDashboard =
      user.role === "admin"
        ? "/admin/dashboard"
        : "/student/dashboard";

    return <Navigate to={correctDashboard} replace />;
  }

  return <Outlet />;
}
