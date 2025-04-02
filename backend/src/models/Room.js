
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true
  },
  floor: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['AVAILABLE', 'OCCUPIED', 'MAINTENANCE'],
    default: 'AVAILABLE'
  },
  roomTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RoomType',
    required: true
  }
});

const roomTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  // EP Rate (European Plan - Room only)
  rateSingle: {
    type: Number,
    required: true
  },
  rateDouble: {
    type: Number
  },
  // MAP Rate (Modified American Plan - Half Board)
  mapRateSingle: {
    type: Number
  },
  mapRateDouble: {
    type: Number
  },
  // AP Rate (American Plan - Full Board)
  apRateSingle: {
    type: Number
  },
  apRateDouble: {
    type: Number
  },
  maxAdults: {
    type: Number,
    required: true
  },
  maxChildren: {
    type: Number,
    default: 0
  },
  amenities: [String],
  imageUrl: String
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);
const RoomType = mongoose.models.RoomType || mongoose.model('RoomType', roomTypeSchema);

export { Room, RoomType };
