
import { useMutation, useQuery } from '@tanstack/react-query';

// API URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Booking types
export interface BookingFormData {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  occupancyType: 'SINGLE' | 'DOUBLE';
  extraBed: boolean;
  totalAmount: number;
  specialRequests?: string;
}

export interface BookingResponse {
  message: string;
  booking: {
    id: string;
    bookingReference: string;
    userId: string;
    roomId: string;
    checkInDate: string;
    checkOutDate: string;
    adults: number;
    children: number;
    occupancyType: string;
    extraBed: boolean;
    totalAmount: number;
    specialRequests?: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    room: any;
    user: any;
  };
}

// Create booking
export const useCreateBooking = () => {
  return useMutation({
    mutationFn: async (bookingData: BookingFormData): Promise<BookingResponse> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create booking');
      }
      
      return response.json();
    }
  });
};

// Get user bookings
export const useGetUserBookings = () => {
  return useQuery({
    queryKey: ['userBookings'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/bookings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }
      
      return response.json();
    },
    enabled: !!localStorage.getItem('token'), // Only run if user is logged in
  });
};

// Get booking by ID
export const useGetBookingById = (bookingId: string) => {
  return useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/bookings/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch booking');
      }
      
      return response.json();
    },
    enabled: !!bookingId && !!localStorage.getItem('token'),
  });
};

// Update booking status
export const useUpdateBookingStatus = () => {
  return useMutation({
    mutationFn: async ({ bookingId, status }: { bookingId: string, status: string }): Promise<any> => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('Authentication required');
      }
      
      const response = await fetch(`${API_URL}/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update booking status');
      }
      
      return response.json();
    }
  });
};
