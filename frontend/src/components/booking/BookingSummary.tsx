
import React from "react";
import { format, differenceInDays } from "date-fns";
import { CalendarClock, CalendarDays, Users } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";

interface BookingSummaryProps {
  selectedRoom: any;
  dates: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  };
  adults: number;
  children: number;
  occupancyType: "single" | "double";
  extraBed: boolean;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  selectedRoom,
  dates,
  adults,
  children,
  occupancyType,
  extraBed,
}) => {
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

  if (!selectedRoom) return null;

  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h2 className="text-xl font-medium mb-4">Booking Summary</h2>
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={selectedRoom.image}
            alt={selectedRoom.name}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-medium">{selectedRoom.name}</h3>
            <p className="text-sm text-gray-500">
              {occupancyType === "single"
                ? "Single Occupancy"
                : "Double Occupancy"}
            </p>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <CalendarClock className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Check-in</p>
              <p className="text-gray-600">
                {dates.checkIn
                  ? format(dates.checkIn, "PPP")
                  : "Not selected"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <CalendarDays className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Check-out</p>
              <p className="text-gray-600">
                {dates.checkOut
                  ? format(dates.checkOut, "PPP")
                  : "Not selected"}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <Users className="h-4 w-4 text-gray-400 mt-0.5" />
            <div>
              <p className="font-medium">Guests</p>
              <p className="text-gray-600">
                {adults} Adults, {children} Children
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">
              {calculateNights()} nights x NPR{" "}
              {(
                occupancyType === "single"
                  ? selectedRoom.rates.single
                  : selectedRoom.rates.double ||
                    selectedRoom.rates.single
              ).toLocaleString()}
            </span>
            <span className="text-sm">
              NPR{" "}
              {(
                (occupancyType === "single"
                  ? selectedRoom.rates.single
                  : selectedRoom.rates.double ||
                    selectedRoom.rates.single) *
                calculateNights()
              ).toLocaleString()}
            </span>
          </div>
          {extraBed && (
            <div className="flex justify-between">
              <span className="text-sm">Extra Bed</span>
              <span className="text-sm">
                NPR {(EXTRA_BED_CHARGE * calculateNights()).toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between font-medium pt-2">
            <span>Total</span>
            <span className="text-hotel-primary">
              NPR {calculateTotal().toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
