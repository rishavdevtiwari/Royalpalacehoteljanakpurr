import React from "react"
import { useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Define routes that are accessible without authentication
const publicRoutes = ["/", "/login", "/register", "/rooms", "/amenities", "/gallery", "/contact", "/about"];

// Define routes that require admin role
const adminRoutes = ["/dashboard", "/dashboard/users"];

interface AuthMiddlewareProps {
  children: ReactNode;
}

const AuthMiddleware = ({ children }: AuthMiddlewareProps) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
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
        navigate("/", { 
          state: { 
            from: location,
            message: "You do not have permission to access that page." 
          } 
        });
      } else if (!isPublicRoute && !user) {
        // Redirect unauthenticated users away from protected routes
        navigate("/login", { 
          state: { 
            from: location,
            message: "Please log in to access this page." 
          } 
        });
      }
    }
  }, [user, isLoading, location, navigate]);

  // Show a loading state if authentication is still being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthMiddleware;
