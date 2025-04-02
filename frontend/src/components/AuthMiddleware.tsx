
import { useEffect, ReactNode, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

// Define routes that are accessible without authentication
const publicRoutes = ["/", "/login", "/register", "/rooms", "/amenities", "/gallery", "/contact", "/about"];

// Define routes that require admin role
const adminRoutes = ["/dashboard", "/dashboard/users"];

interface AuthMiddlewareProps {
  children: ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { user, isLoading, checkAuthStatus } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    // Attempt to verify auth status when component mounts
    const verifyAuth = async () => {
      try {
        await checkAuthStatus();
      } catch (error) {
        console.error("Auth verification error:", error);
        // Don't show error toast on initial load as it can be annoying
        // Only show errors for actual auth failures after logging in
      } finally {
        setAuthChecked(true);
      }
    };
    
    verifyAuth();
  }, [checkAuthStatus]);

  useEffect(() => {
    if (!isLoading && authChecked) {
      const currentPath = location.pathname;
      
      // Check if the current route requires admin privileges
      const requiresAdmin = adminRoutes.some(route => 
        currentPath === route || (route.endsWith('*') && currentPath.startsWith(route.slice(0, -1)))
      );
      
      // Check if the current route is public
      const isPublicRoute = publicRoutes.some(route => 
        currentPath === route || (route.endsWith('*') && currentPath.startsWith(route.slice(0, -1)))
      );
      
      if (requiresAdmin && (!user || user.role !== "ADMIN")) {
        // Redirect non-admin users away from admin routes
        toast.error("You do not have permission to access that page.");
        navigate("/", { 
          state: { 
            from: location,
            message: "You do not have permission to access that page." 
          } 
        });
      } else if (!isPublicRoute && !user) {
        // Redirect unauthenticated users away from protected routes
        toast.info("Please log in to access this page.");
        navigate("/login", { 
          state: { 
            from: location,
            message: "Please log in to access this page." 
          } 
        });
      }
    }
  }, [user, isLoading, location, navigate, authChecked]);

  // Show a loading state if authentication is still being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hotel-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;
