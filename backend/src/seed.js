
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Room, RoomType } from './models/Room.js';
import User from './models/User.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb+srv://wakalakasakalaka:jK7ytTAUcct1tG72@cluster0.livvrfz.mongodb.net/hotel?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Define room types
const roomTypes = [
  {
    name: "Deluxe Room",
    description: "Spacious room with premium amenities and comfortable furnishings.",
    rateSingle: 4000,
    rateDouble: 5000,
    mapRateSingle: 5500,
    mapRateDouble: 8000,
    apRateSingle: 6500,
    apRateDouble: 10000,
    maxAdults: 2,
    maxChildren: 1,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Fridge", "Tea/Coffee Maker"],
    imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Super Deluxe Room",
    description: "Luxury accommodation with enhanced amenities and extra space.",
    rateSingle: 5000,
    rateDouble: 6000,
    mapRateSingle: 6500,
    mapRateDouble: 9000,
    apRateSingle: 7500,
    apRateDouble: 11000,
    maxAdults: 2,
    maxChildren: 2,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Tea/Coffee Maker", "Seating Area"],
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "B&B (Bed & Breakfast)",
    description: "Comfortable room with complimentary breakfast included.",
    rateSingle: 5000,
    rateDouble: 6000,
    mapRateSingle: 6500,
    mapRateDouble: 9000,
    apRateSingle: 7500,
    apRateDouble: 11000,
    maxAdults: 2,
    maxChildren: 1,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Breakfast Included", "Tea/Coffee Maker"],
    imageUrl: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Junior Suite",
    description: "Spacious suite with separate living area and premium amenities.",
    rateSingle: 10000,
    rateDouble: 11000,
    maxAdults: 2,
    maxChildren: 2,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Living Area", "Premium Toiletries"],
    imageUrl: "https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Executive Suite",
    description: "Luxurious suite with separate bedroom, living room, and premium amenities.",
    rateSingle: 15000,
    rateDouble: 16000,
    maxAdults: 2,
    maxChildren: 2,
    amenities: ["Free Wi-Fi", "Air Conditioning", "Flat-screen TV", "Mini Bar", "Living Room", "Dining Area", "Premium Toiletries", "Bathrobe & Slippers"],
    imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
  }
];

// Define sample users
const users = [
  {
    name: 'John Doe',
    email: 'user@example.com',
    password: 'user123',
    role: 'USER',
    phone: '9123456789',
    address: 'Kathmandu, Nepal'
  },
  {
    name: 'Admin User',
    email: 'admin@royalpalacehotel',
    password: 'qwerty@123456',
    role: 'ADMIN',
    phone: '9876543210',
    address: 'Kathmandu, Nepal'
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    await RoomType.deleteMany({});
    await Room.deleteMany({});
    await User.deleteMany({});
    
    console.log('Database cleared');

    // Create room types
    const createdRoomTypes = await RoomType.create(roomTypes);
    console.log(`${createdRoomTypes.length} room types created`);
    
    // Create 60 rooms: 12 of each type
    const rooms = [];
    
    createdRoomTypes.forEach((roomType, typeIndex) => {
      const floorStart = typeIndex * 2 + 1; // Starting floor for each room type (1, 3, 5, 7, 9)
      
      for (let floor = floorStart; floor <= floorStart + 1; floor++) {
        for (let roomNum = 1; roomNum <= 6; roomNum++) {
          rooms.push({
            roomNumber: `${floor}${roomNum < 10 ? '0' : ''}${roomNum}`,
            floor: floor,
            status: 'AVAILABLE',
            roomTypeId: roomType._id
          });
        }
      }
    });
    
    const createdRooms = await Room.create(rooms);
    console.log(`${createdRooms.length} rooms created`);
    
    // Create users
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create({
        ...user,
        password: hashedPassword
      });
    }
    console.log(`${users.length} users created`);

    console.log('Database seeded successfully');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Run the seed function
seedDatabase();
