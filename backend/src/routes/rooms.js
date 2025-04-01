import express from 'express';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';
import { Room, RoomType } from '../models/Room.js';

const router = express.Router();

// Get all room types with their rooms
router.get('/', async (req, res) => {
  try {
    const roomTypes = await RoomType.find();
    
    // For each room type, get the corresponding rooms
    const roomTypesWithRooms = await Promise.all(roomTypes.map(async (roomType) => {
      const rooms = await Room.find({ roomTypeId: roomType._id });
      
      return {
        id: roomType._id,
        name: roomType.name,
        description: roomType.description,
        rateSingle: roomType.rateSingle,
        rateDouble: roomType.rateDouble,
        maxAdults: roomType.maxAdults,
        maxChildren: roomType.maxChildren,
        amenities: roomType.amenities,
        imageUrl: roomType.imageUrl,
        rooms: rooms.map(room => ({
          id: room._id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          status: room.status
        }))
      };
    }));
    
    res.status(200).json(roomTypesWithRooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ message: 'Failed to fetch rooms', error: error.message });
  }
});

// Get available rooms for booking
router.get('/available', async (req, res) => {
  try {
    // Get query parameters for filtering
    const { checkIn, checkOut, adults, children } = req.query;
    
    // Get all room types
    const roomTypes = await RoomType.find();
    
    // Get all available rooms (not in MAINTENANCE or OCCUPIED)
    const availableRooms = await Room.find({ status: 'AVAILABLE' });
    
    // Filter room types based on availability and capacity
    const availableRoomTypes = roomTypes.filter(roomType => {
      // Check if there's at least one available room of this type
      const hasAvailableRoom = availableRooms.some(room => 
        room.roomTypeId.toString() === roomType._id.toString()
      );
      
      // Check capacity if adults/children are specified
      let meetsCapacity = true;
      if (adults) {
        meetsCapacity = roomType.maxAdults >= parseInt(adults);
      }
      if (children) {
        meetsCapacity = meetsCapacity && roomType.maxChildren >= parseInt(children);
      }
      
      return hasAvailableRoom && meetsCapacity;
    });
    
    // For each available room type, get corresponding available rooms
    const result = await Promise.all(availableRoomTypes.map(async (roomType) => {
      const rooms = availableRooms.filter(room => 
        room.roomTypeId.toString() === roomType._id.toString()
      );
      
      return {
        id: roomType._id,
        name: roomType.name,
        description: roomType.description,
        rateSingle: roomType.rateSingle,
        rateDouble: roomType.rateDouble,
        maxAdults: roomType.maxAdults,
        maxChildren: roomType.maxChildren,
        amenities: roomType.amenities,
        imageUrl: roomType.imageUrl,
        availableRooms: rooms.length,
        rooms: rooms.map(room => ({
          id: room._id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          status: room.status
        }))
      };
    }));
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching available rooms:', error);
    res.status(500).json({ message: 'Failed to fetch available rooms', error: error.message });
  }
});

// Get room type by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // First, check if the ID is for a room type
    let roomType = await RoomType.findById(id);
    
    if (roomType) {
      // It's a room type, get all rooms of this type
      const rooms = await Room.find({ roomTypeId: id });
      
      const result = {
        id: roomType._id,
        name: roomType.name,
        description: roomType.description,
        rateSingle: roomType.rateSingle,
        rateDouble: roomType.rateDouble,
        maxAdults: roomType.maxAdults,
        maxChildren: roomType.maxChildren,
        amenities: roomType.amenities,
        imageUrl: roomType.imageUrl,
        rooms: rooms.map(room => ({
          id: room._id,
          roomNumber: room.roomNumber,
          floor: room.floor,
          status: room.status
        }))
      };
      
      return res.status(200).json(result);
    }
    
    // If not a room type, check if it's a room
    const room = await Room.findById(id);
    
    if (!room) {
      return res.status(404).json({ message: 'Room or room type not found' });
    }
    
    // Get the room type details for this room
    roomType = await RoomType.findById(room.roomTypeId);
    
    if (!roomType) {
      return res.status(404).json({ message: 'Room type not found for this room' });
    }
    
    const result = {
      id: room._id,
      roomNumber: room.roomNumber,
      floor: room.floor,
      status: room.status,
      roomType: {
        id: roomType._id,
        name: roomType.name,
        description: roomType.description,
        rateSingle: roomType.rateSingle,
        rateDouble: roomType.rateDouble,
        maxAdults: roomType.maxAdults,
        maxChildren: roomType.maxChildren,
        amenities: roomType.amenities,
        imageUrl: roomType.imageUrl
      }
    };
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching room details:', error);
    res.status(500).json({ message: 'Failed to fetch room details', error: error.message });
  }
});

// Create room type (admin only)
router.post('/types', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { name, description, rateSingle, rateDouble, maxAdults, maxChildren, amenities, imageUrl } = req.body;
    
    const roomType = new RoomType({
      name,
      description,
      rateSingle,
      rateDouble,
      maxAdults,
      maxChildren,
      amenities: amenities || [],
      imageUrl
    });
    
    await roomType.save();
    
    res.status(201).json({
      message: 'Room type created successfully',
      roomType
    });
  } catch (error) {
    console.error('Error creating room type:', error);
    res.status(500).json({ message: 'Failed to create room type', error: error.message });
  }
});

// Create room (admin only)
router.post('/', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { roomNumber, floor, status, roomTypeId } = req.body;
    
    // Check if room type exists
    const roomType = await RoomType.findById(roomTypeId);
    
    if (!roomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    
    // Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber });
    
    if (existingRoom) {
      return res.status(409).json({ message: 'Room number already exists' });
    }
    
    const room = new Room({
      roomNumber,
      floor,
      status: status || 'AVAILABLE',
      roomTypeId
    });
    
    await room.save();
    
    res.status(201).json({
      message: 'Room created successfully',
      room
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ message: 'Failed to create room', error: error.message });
  }
});

// Update room type (admin only)
router.patch('/types/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, rateSingle, rateDouble, maxAdults, maxChildren, amenities, imageUrl } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (rateSingle) updateData.rateSingle = rateSingle;
    if (rateDouble !== undefined) updateData.rateDouble = rateDouble;
    if (maxAdults) updateData.maxAdults = maxAdults;
    if (maxChildren !== undefined) updateData.maxChildren = maxChildren;
    if (amenities) updateData.amenities = amenities;
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl;
    
    const updatedRoomType = await RoomType.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedRoomType) {
      return res.status(404).json({ message: 'Room type not found' });
    }
    
    res.status(200).json({
      message: 'Room type updated successfully',
      roomType: updatedRoomType
    });
  } catch (error) {
    console.error('Error updating room type:', error);
    res.status(500).json({ message: 'Failed to update room type', error: error.message });
  }
});

// Update room status (admin only)
router.patch('/:id/status', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true }
    );
    
    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.status(200).json({
      message: 'Room status updated successfully',
      room: updatedRoom
    });
  } catch (error) {
    console.error('Error updating room status:', error);
    res.status(500).json({ message: 'Failed to update room status', error: error.message });
  }
});

// Delete room (admin only)
router.delete('/:id', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedRoom = await Room.findByIdAndDelete(id);
    
    if (!deletedRoom) {
      return res.status(404).json({ message: 'Room not found' });
    }
    
    res.status(200).json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ message: 'Failed to delete room', error: error.message });
  }
});

export default router;
