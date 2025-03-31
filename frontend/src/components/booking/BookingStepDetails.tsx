
import React from "react";
import { format } from "date-fns";
import { ChevronRight, Info, CalendarClock, CalendarDays, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { Separator } from "../ui/separator";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";
import { differenceInDays } from "date-fns";

interface GuestDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  specialRequests: string;
}

interface BookingStepDetailsProps {
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
  handleGuestDetailsChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  goToNextStep: () => void;
  goToPrevStep: () => void;
}

const BookingStepDetails: React.FC<BookingStepDetailsProps> = ({
  selectedRoom,
  dates,
  adults,
  children,
  occupancyType,
  extraBed,
  guestDetails,
  handleGuestDetailsChange,
  goToNextStep,
  goToPrevStep,
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-6">Your Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={guestDetails.fullName}
                    onChange={handleGuestDetailsChange}
                    className="mt-1"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={guestDetails.email}
                    onChange={handleGuestDetailsChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={guestDetails.phone}
                    onChange={handleGuestDetailsChange}
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={guestDetails.address}
                  onChange={handleGuestDetailsChange}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">
                  Special Requests (Optional)
                </Label>
                <Textarea
                  id="specialRequests"
                  name="specialRequests"
                  value={guestDetails.specialRequests}
                  onChange={handleGuestDetailsChange}
                  placeholder="Let us know if you have any special requests or requirements"
                  className="mt-1"
                />
              </div>
            </div>

            <Alert className="mt-6 bg-blue-50">
              <Info className="h-4 w-4" />
              <AlertDescription>
                We'll send your booking confirmation and receipt to the
                email address you provide.
              </AlertDescription>
            </Alert>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={goToPrevStep}>
                Back
              </Button>
              <Button onClick={goToNextStep}>
                Continue to Payment
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Booking Summary</h2>

            {selectedRoom && (
              <>
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
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingStepDetails;
