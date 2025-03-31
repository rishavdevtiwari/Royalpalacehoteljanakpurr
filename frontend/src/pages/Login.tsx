import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Hotel, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to "/"
  const redirectPath = location.state?.from?.pathname || "/";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      
      // Redirect to dashboard if admin, otherwise to the origin page
      if (email === "admin@royalhotelpalace") {
        navigate("/dashboard");
      } else {
        navigate(redirectPath);
      }
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 animate-fade-in">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center mb-4">
            <Hotel className="h-10 w-10 text-hotel-primary" />
          </Link>
          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="mt-1"
              />
            </div>
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-hotel-primary hover:text-hotel-dark"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="mt-1"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-hotel-primary hover:bg-hotel-dark text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <div className="mt-4 text-center text-sm">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-hotel-primary hover:text-hotel-dark font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo credentials for testing */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500 text-center mb-2">Demo credentials</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="text-sm bg-gray-100 py-2 px-3 rounded hover:bg-gray-200 transition-colors text-gray-800"
                onClick={() => {
                  setEmail("admin@royalhotelpalace");
                  setPassword("qwerty@123456");
                  toast.info("Admin credentials applied. Click 'Sign in' to login.");
                }}
              >
                Admin User
              </button>
              <button
                type="button"
                className="text-sm bg-gray-100 py-2 px-3 rounded hover:bg-gray-200 transition-colors text-gray-800"
                onClick={() => {
                  setEmail("user@example.com");
                  setPassword("user123");
                  toast.info("User credentials applied. Click 'Sign in' to login.");
                }}
              >
                Regular User
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;