import { useQuery } from '@tanstack/react-query';

// API URL - using direct URL instead of env variable to avoid errors
const API_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.rishavdevtiwari.com.np/api' 
  : 'http://localhost:3001/api';

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
      const response = await fetch(`${API_URL}/rooms`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch rooms');
      }
      
      return response.json();
    }
  });
};

// Fetch a single room type by ID
export const useRoom = (id: string | undefined) => {
  return useQuery({
    queryKey: ['room', id],
    queryFn: async (): Promise<RoomType> => {
      if (!id) throw new Error('Room ID is required');
      
      const response = await fetch(`${API_URL}/rooms/${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch room details');
      }
      
      return response.json();
    },
    enabled: !!id, // Only run query if ID is provided
  });
};
