import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { Booking, Payment } from '../models/Booking.js';
import { Room } from '../models/Room.js';
import User from '../models/User.js';
import emailService from '../services/email.js';

const router = express.Router();

// Get all bookings (admin) or user's bookings (regular user)
router.get('/', isAuthenticated, async (req, res) => {
  try {
    const { id, role } = req.user;
    
    // Define query based on user role
    const query = role === 'ADMIN'
      ? {} // Admin can see all bookings
      : { userId: id }; // Regular users can only see their bookings
    
    const bookings = await Booking.find(query)
      .populate({
        path: 'roomId',
        populate: {
          path: 'roomTypeId'
        }
      })
      .populate({
        path: 'userId',
        select: 'id name email'
      })
      .sort({ createdAt: -1 });
    
    // Fetch payments for each booking
    const formattedBookings = await Promise.all(bookings.map(async (booking) => {
        const payments = await Payment.find({ bookingId: booking._id });
        
        return {
          id: booking._id,
          userId: booking.userId._id,
          roomId: booking.roomId._id,
          bookingReference: booking.bookingReference,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          adults: booking.adults,
          children: booking.children,
          occupancyType: booking.occupancyType,
          extraBed: booking.extraBed,
          totalAmount: booking.totalAmount,
          specialRequests: booking.specialRequests,
          status: booking.status,
          createdAt: booking.createdAt,
          updatedAt: booking.updatedAt,
          room: {
            id: booking.roomId._id,
            roomNumber: booking.roomId.roomNumber,
            floor: booking.roomId.floor,
            status: booking.roomId.status,
            roomType: {
              id: booking.roomId.roomTypeId._id,
              name: booking.roomId.roomTypeId.name,
              description: booking.roomId.roomTypeId.description,
              rateSingle: booking.roomId.roomTypeId.rateSingle,
              rateDouble: booking.roomId.roomTypeId.rateDouble,
              amenities: booking.roomId.roomTypeId.amenities
            }
          },
          user: {
            id: booking.userId._id,
            name: booking.userId.name,
            email: booking.userId.email
          },
          payments: payments
        };
    }));
    
    res.status(200).json(formattedBookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Failed to fetch bookings', error: error.message });
  }
});

// Other routes remain unchanged...

export default router;
