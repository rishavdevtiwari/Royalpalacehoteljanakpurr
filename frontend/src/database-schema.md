
# Hotel Management System - Database Schema

For this hotel management system, we're using PostgreSQL with Prisma ORM for the Node.js backend. The database schema is defined in the Prisma schema file.

## Database Setup with Prisma

The complete schema is defined in `aroyalpalace/backend/prisma/schema.prisma`. Here's an overview of the main models:

### Models

1. **User**
   - Stores user information including both hotel guests and administrators
   - Fields: id, email, password, name, phone, address, role, createdAt, updatedAt
   - Relationships: Has many Bookings

2. **RoomType**
   - Defines types of rooms available in the hotel
   - Fields: id, name, description, rateSingle, rateDouble, maxAdults, maxChildren, amenities, imageUrl
   - Relationships: Has many Rooms, has many RoomAmenities

3. **Room**
   - Individual rooms in the hotel
   - Fields: id, roomNumber, roomTypeId, status, floor, createdAt, updatedAt
   - Relationships: Belongs to RoomType, has many Bookings

4. **Booking**
   - Stores information about room bookings
   - Fields: id, userId, roomId, bookingReference, checkInDate, checkOutDate, adults, children, status, occupancyType, extraBed, totalAmount, specialRequests
   - Relationships: Belongs to User, belongs to Room, has many Payments

5. **Payment**
   - Records payment information for bookings
   - Fields: id, bookingId, amount, paymentMethod, paymentStatus, transactionId, paymentDate
   - Relationships: Belongs to Booking

6. **Amenity**
   - List of amenities that can be associated with room types
   - Fields: id, name, description, icon
   - Relationships: Has many RoomAmenities

7. **RoomAmenity**
   - Junction table for the many-to-many relationship between room types and amenities
   - Fields: roomTypeId, amenityId
   - Relationships: Belongs to RoomType, belongs to Amenity

8. **ContactMessage**
   - Stores messages from the contact form
   - Fields: id, name, email, phone, subject, message, createdAt

### Enums

The schema also defines several enum types for fields that have a fixed set of possible values:

- **Role**: USER, ADMIN
- **RoomStatus**: AVAILABLE, OCCUPIED, MAINTENANCE
- **BookingStatus**: CONFIRMED, PENDING, CANCELLED, COMPLETED
- **OccupancyType**: SINGLE, DOUBLE
- **PaymentMethod**: CREDIT_CARD, BANK_TRANSFER, CASH
- **PaymentStatus**: PENDING, COMPLETED, FAILED, REFUNDED

## Setting Up the Database

1. Create a `.env` file in the `backend` directory with your database connection string:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/hotel_management"
   ```

2. Run the database setup and seed scripts:
   ```
   npm run db:setup
   npm run db:seed
   ```

This will:
1. Create all the necessary tables in your PostgreSQL database
2. Seed the database with initial data for room types and sample users

## Backend API Integration

The Node.js backend provides RESTful API endpoints to interact with the database:

- `/api/auth`: Authentication endpoints (login, register, logout)
- `/api/users`: User management
- `/api/rooms`: Room and room type management
- `/api/bookings`: Booking management
- `/api/contact`: Contact form submissions

Each endpoint implements proper authorization checks to ensure data security.
