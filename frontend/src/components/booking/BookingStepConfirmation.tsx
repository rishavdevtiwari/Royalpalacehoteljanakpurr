
import React from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { differenceInDays } from "date-fns";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";

interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialRequests: string;
}

interface BookingStepConfirmationProps {
  selectedRoom: any;
  dates: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  };
  adults: number;
  children: number;
  occupancyType: "single" | "double";
  extraBed: boolean;
  guestDetails: GuestDetails;
  bookingReference: string;
}

const BookingStepConfirmation: React.FC<BookingStepConfirmationProps> = ({
  selectedRoom,
  dates,
  adults,
  children,
  occupancyType,
  extraBed,
  guestDetails,
  bookingReference,
}) => {
  const navigate = useNavigate();

  // Calculate total nights
  const calculateNights = () => {
    if (dates.checkIn && dates.checkOut) {
      return differenceInDays(dates.checkOut, dates.checkIn);
    }
    return 0;
  };

  // Calculate total cost
  const calculateTotal = () => {
    if (!selectedRoom) return 0;

    const nights = calculateNights();
    const baseRate =
      occupancyType === "single"
        ? selectedRoom.rates.single
        : selectedRoom.rates.double || selectedRoom.rates.single;
    let total = baseRate * nights;

    // Add extra bed charge if needed
    if (extraBed) {
      total += EXTRA_BED_CHARGE * nights;
    }

    return total;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your booking has been successfully confirmed. A confirmation email has been sent to {guestDetails.email}.
            {bookingReference && (
              <span className="block mt-2 font-medium">Booking Reference: {bookingReference}</span>
            )}
          </p>
          
          {selectedRoom && (
            <div className="bg-gray-50 p-6 rounded-lg mb-6 text-left">
              <h3 className="font-medium text-lg mb-4">Booking Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Room Type</p>
                  <p className="font-medium">{selectedRoom.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Occupancy</p>
                  <p className="font-medium">
                    {occupancyType === "single" ? "Single" : "Double"} Occupancy
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in Date</p>
                  <p className="font-medium">
                    {dates.checkIn ? format(dates.checkIn, "PPP") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out Date</p>
                  <p className="font-medium">
                    {dates.checkOut ? format(dates.checkOut, "PPP") : "-"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="font-medium">
                    {adults} Adults, {children} Children
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-medium text-hotel-primary">
                    NPR {calculateTotal().toLocaleString()}
                  </p>
                </div>
              </div>
              
              <h4 className="font-medium mb-2">Guest Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{guestDetails.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{guestDetails.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium">{guestDetails.phone}</p>
                </div>
                {guestDetails.address && (
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="font-medium">{guestDetails.address}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Go to Dashboard
            </Button>
            <Button onClick={() => navigate("/")}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingStepConfirmation;
