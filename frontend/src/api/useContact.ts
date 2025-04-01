import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../config/api';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  message: string;
  contactId: string;
}

export const useSubmitContactForm = () => {
  return useMutation({
    mutationFn: async (formData: ContactFormData): Promise<ContactResponse> => {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }
      
      return response.json();
    }
  });
};

// Only for admin use
export const useGetContactMessages = () => {
  return useMutation({
    mutationFn: async (): Promise<any[]> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contact messages');
      }
      
      return response.json();
    }
  });
};

// Only for admin use
export const useUpdateContactStatus = () => {
  return useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'NEW' | 'REPLIED' | 'ARCHIVED' }): Promise<any> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/contact/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update contact status');
      }
      
      return response.json();
    }
  });
};
