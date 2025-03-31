
export interface RoomRate {
  single: number;
  double?: number;
}

export interface RoomType {
  id: string;
  name: string;
  description: string;
  image: string;
  rates: RoomRate;
  amenities: string[];
  maxOccupancy: {
    adults: number;
    children: number;
  };
}

// Room data based on the tariff image
export const ROOM_TYPES: RoomType[] = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and comfortable furnishings.",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    rates: {
      single: 4000,
      double: 6000
    },
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Fridge", "Tea/Coffee Maker"],
    maxOccupancy: {
      adults: 2,
      children: 1
    }
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room",
    description: "Luxury accommodation with enhanced amenities and extra space.",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    rates: {
      single: 5000,
      double: 6000
    },
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Tea/Coffee Maker", "Seating Area"],
    maxOccupancy: {
      adults: 2,
      children: 2
    }
  },
  {
    id: "bb",
    name: "B&B (Bed & Breakfast)",
    description: "Comfortable room with complimentary breakfast included.",
    image: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=800&auto=format&fit=crop",
    rates: {
      single: 5000,
      double: 6000
    },
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Breakfast Included", "Tea/Coffee Maker"],
    maxOccupancy: {
      adults: 2,
      children: 1
    }
  },
  {
    id: "junior-suite",
    name: "Junior Suite",
    description: "Spacious suite with separate living area and premium amenities.",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800&auto=format&fit=crop",
    rates: {
      single: 8000
    },
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Living Area", "Premium Toiletries"],
    maxOccupancy: {
      adults: 2,
      children: 2
    }
  },
  {
    id: "executive-suite",
    name: "Executive Suite",
    description: "Luxurious suite with separate bedroom, living room, and premium amenities.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    rates: {
      single: 10000
    },
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Living Room", "Dining Area", "Premium Toiletries", "Bathrobe & Slippers"],
    maxOccupancy: {
      adults: 2,
      children: 2
    }
  }
];

// Extra bed charge
export const EXTRA_BED_CHARGE = 1500;

// Get a room by ID
export const getRoomById = (id: string): RoomType | undefined => {
  return ROOM_TYPES.find(room => room.id === id);
};
