import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

interface AuthMiddlewareProps {
  children: React.ReactNode;
}

const AuthMiddleware: React.FC<AuthMiddlewareProps> = ({ children }) => {
  const { user, loading, checkAuthStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        setIsChecking(true);
        console.log('Checking auth status for path:', location.pathname);
        
        // Verify authentication status first
        const isLoggedIn = await checkAuthStatus();
        
        // For login and register pages, redirect if already logged in
        if (location.pathname === '/login' || location.pathname === '/register') {
          if (isLoggedIn) {
            // Redirect admin to dashboard, regular users to home
            if (user?.role === 'ADMIN') {
              console.log('User is admin, redirecting to dashboard');
              navigate('/dashboard');
            } else {
              console.log('User is logged in, redirecting to home');
              navigate('/');
            }
          }
        }
        
        // For protected routes, redirect to login if not logged in
        const protectedRoutes = ['/dashboard', '/booking', '/bookings', '/profile'];
        if (protectedRoutes.some(route => location.pathname.startsWith(route)) && !isLoggedIn && !loading) {
          console.log('Protected route accessed without auth, redirecting to login');
          toast("Authentication Required: Please log in to access this page", {
            description: "You need to log in first",
            action: {
              label: "Login",
              onClick: () => navigate('/login')
            }
          });
          navigate('/login', { state: { from: location } });
        }
        
        // For admin routes, redirect to home if not admin
        const adminRoutes = ['/dashboard'];
        if (adminRoutes.some(route => location.pathname.startsWith(route)) && isLoggedIn && user?.role !== 'ADMIN' && !loading) {
          console.log('Admin route accessed by non-admin, redirecting to home');
          toast("Access Denied", {
            description: "You don't have permission to access this page",
          });
          navigate('/');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsChecking(false);
      }
    };
    
    verifyAuth();
  }, [location.pathname, user, loading, navigate, checkAuthStatus]);

  // Show minimal loading state if still checking authentication
  if (isChecking && (location.pathname !== '/' && location.pathname !== '/rooms' && 
      location.pathname !== '/about' && location.pathname !== '/gallery' && 
      location.pathname !== '/contact' && location.pathname !== '/amenities')) {
    return <div className="min-h-screen flex items-center justify-center">Checking authentication...</div>;
  }

  return <>{children}</>;
};

export default AuthMiddleware;