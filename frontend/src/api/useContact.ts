import { useMutation } from '@tanstack/react-query';
import { API_URL } from '../config/api';

// Contact form data interface
export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

// Send contact form
export const useSendContactForm = () => {
  return useMutation({
    mutationFn: async (contactData: ContactFormData): Promise<{ message: string; contactId: string }> => {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send contact form');
      }
      
      return response.json();
    }
  });
};

// Get all contact messages (admin only)
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
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch contact messages');
      }
      
      return response.json();
    }
  });
};
