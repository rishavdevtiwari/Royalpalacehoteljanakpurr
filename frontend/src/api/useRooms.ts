import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../config/api';

interface Room {
  id: string;
  roomNumber: string;
  floor: number;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
}

export interface RoomType {
  id: string;
  name: string;
  description: string | null;
  rateSingle: number;
  rateDouble: number | null;
  maxAdults: number;
  maxChildren: number;
  amenities: string[];
  imageUrl: string | null;
  rooms: Room[];
}

// Fetch all room types
export const useRooms = () => {
  return useQuery({
    queryKey: ['rooms'],
    queryFn: async (): Promise<RoomType[]> => {
      const response = await fetch(`${API_URL}/rooms`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      
      return response.json();
    }
  });
};

// Fetch available rooms for booking
export const useAvailableRooms = (checkIn?: string, checkOut?: string, adults?: number, children?: number) => {
  return useQuery({
    queryKey: ['availableRooms', checkIn, checkOut, adults, children],
    queryFn: async (): Promise<RoomType[]> => {
      let url = `${API_URL}/rooms/available`;
      
      // Add query parameters if provided
      const params = new URLSearchParams();
      if (checkIn) params.append('checkIn', checkIn);
      if (checkOut) params.append('checkOut', checkOut);
      if (adults) params.append('adults', adults.toString());
      if (children) params.append('children', children.toString());
      
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
      
      const response = await fetch(url, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch available rooms');
      }
      
      return response.json();
    },
    enabled: !!checkIn && !!checkOut, // Only run if dates are provided
  });
};

// Fetch a single room type by ID
export const useRoom = (id: string | undefined) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: async (): Promise<RoomType> => {
      if (!id) throw new Error('Room ID is required');
      
      const response = await fetch(`${API_URL}/rooms/${id}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch room details');
      }
      
      return response.json();
    },
    enabled: !!id, // Only run query if ID is provided
  });
};
