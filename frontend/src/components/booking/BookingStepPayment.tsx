
import React from "react";
import { format, differenceInDays } from "date-fns";
import { ChevronRight, Landmark, DollarSign, CalendarClock, CalendarDays, Users } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";

interface BookingStepPaymentProps {
  selectedRoom: any;
  dates: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  };
  adults: number;
  children: number;
  occupancyType: "single" | "double";
  extraBed: boolean;
  paymentMethod: "bank-transfer" | "cash";
  setPaymentMethod: React.Dispatch<React.SetStateAction<"bank-transfer" | "cash">>;
  agreedToTerms: boolean;
  setAgreedToTerms: React.Dispatch<React.SetStateAction<boolean>>;
  goToNextStep: () => void;
  goToPrevStep: () => void;
  isBookingPending: boolean;
}

const BookingStepPayment: React.FC<BookingStepPaymentProps> = ({
  selectedRoom,
  dates,
  adults,
  children,
  occupancyType,
  extraBed,
  paymentMethod,
  setPaymentMethod,
  agreedToTerms,
  setAgreedToTerms,
  goToNextStep,
  goToPrevStep,
  isBookingPending,
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
            <h2 className="text-xl font-medium mb-6">Payment Method</h2>

            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(
                  value as "bank-transfer" | "cash"
                )
              }
              className="space-y-4 mb-6"
            >
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:border-hotel-primary/50">
                <RadioGroupItem
                  value="bank-transfer"
                  id="payment-bank"
                />
                <Label
                  htmlFor="payment-bank"
                  className="flex items-center cursor-pointer"
                >
                  <Landmark className="h-5 w-5 mr-2 text-gray-600" />
                  Bank Transfer
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 border rounded-lg cursor-pointer hover:border-hotel-primary/50">
                <RadioGroupItem value="cash" id="payment-cash" />
                <Label
                  htmlFor="payment-cash"
                  className="flex items-center cursor-pointer"
                >
                  <DollarSign className="h-5 w-5 mr-2 text-gray-600" />
                  Pay at Hotel
                </Label>
              </div>
            </RadioGroup>
            {paymentMethod === "bank-transfer" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">
                  Bank Transfer Instructions
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Please make a bank transfer to the following account.
                  Include your name and booking reference in the
                  transfer description.
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Bank Name:</span>{" "}
                    Nepal Bank Ltd
                  </p>
                  <p>
                    <span className="font-medium">
                      Account Name:
                    </span>{" "}
                    Royal Palace Hotel
                  </p>
                  <p>
                    <span className="font-medium">
                      Account Number:
                    </span>{" "}
                    1234567890123
                  </p>
                  <p>
                    <span className="font-medium">Branch:</span>{" "}
                    Kathmandu Main
                  </p>
                  <p>
                    <span className="font-medium">
                      Swift Code:
                    </span>{" "}
                    NEPBNPKA
                  </p>
                </div>
              </div>
            )}

            {paymentMethod === "cash" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">Pay at Hotel</h3>
                <p className="text-sm text-gray-600">
                  You'll pay the full amount at the hotel during
                  check-in. Please note that we may request a deposit
                  to secure your booking.
                </p>
              </div>
            )}

            <div className="mt-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked === true)
                  }
                />
                <Label
                  htmlFor="terms"
                  className="text-sm cursor-pointer"
                >
                  I agree to the{" "}
                  <span className="text-blue-600 hover:underline">
                    terms and conditions
                  </span>{" "}
                  and{" "}
                  <span className="text-blue-600 hover:underline">
                    privacy policy
                  </span>
                </Label>
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={goToPrevStep}>
                Back
              </Button>
              <Button onClick={goToNextStep} disabled={isBookingPending || !agreedToTerms}>
                {isBookingPending ? "Processing..." : "Complete Booking"}
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

export default BookingStepPayment;
