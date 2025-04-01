const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const { Room, RoomType } = require('./models/Room');
const User = require('./models/User');

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
    email: 'admin@royalhotelpalace',
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
    
    // Create rooms for each room type
    const rooms = [];
    
    createdRoomTypes.forEach((roomType, typeIndex) => {
      const floorNumber = typeIndex + 1;
      for (let i = 1; i <= 6; i++) {
        rooms.push({
          roomNumber: `${floorNumber}0${i}`,
          floor: floorNumber,
          status: 'AVAILABLE',
          roomTypeId: roomType._id
        });
      }
    });
    
    const createdRooms = await Room.create(rooms);
    console.log(`${createdRooms.length} rooms created`);
    
    // Create users
    for (const user of users) {
      await User.create(user);
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
