import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../config/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

interface UserResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  address?: string;
}

interface AuthResponse {
  message: string;
  user: UserResponse;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginCredentials): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }
      
      return response.json();
    }
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }
      
      return response.json();
    }
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: async (): Promise<{message: string}> => {
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
      
      localStorage.removeItem('token');
      return response.json();
    }
  });
};

export const useCheckAuthStatus = () => {
  return useMutation({
    mutationFn: async (): Promise<{isLoggedIn: boolean; user?: UserResponse}> => {
      const response = await fetch(`${API_URL}/auth/status`, {
        credentials: 'include'
      });
      
      return response.json();
    }
  });
};
