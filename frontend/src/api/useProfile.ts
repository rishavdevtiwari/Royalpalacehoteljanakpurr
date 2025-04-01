import { useMutation, useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/api';

interface ProfileUpdateData {
  name?: string;
  phone?: string;
  address?: string;
}

interface ProfileResponse {
  message: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Get user profile
export const useGetProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async (): Promise<any> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch profile');
      }
      
      return response.json();
    },
    enabled: !!localStorage.getItem('token'), // Only run if user is logged in
  });
};

// Update user profile
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: async (profileData: ProfileUpdateData): Promise<ProfileResponse> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }
      
      return response.json();
    }
  });
};
