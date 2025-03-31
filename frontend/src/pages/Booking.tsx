
import React, { useState, useEffect } from "react";
import { differenceInDays } from "date-fns";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { getRoomById } from "apps/frontend/src/data/roomData";
import { useCreateBooking } from "../api/useBookings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

// Import our new components
import BookingStepSelect from "apps/frontend/src/components/booking/BookingStepSelect";
import BookingStepDetails from "apps/frontend/src/components/booking/BookingStepDetails";
import BookingStepPayment from "apps/frontend/src/components/booking/BookingStepPayment";
import BookingStepConfirmation from "apps/frontend/src/components/booking/BookingStepConfirmation";

type BookingStep = "select" | "details" | "payment" | "confirmation";

const Booking: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const roomIdFromQuery = searchParams.get("room");

  const [step, setStep] = useState<BookingStep>("select");
  const [selectedRoom, setSelectedRoom] = useState(
    roomIdFromQuery ? getRoomById(roomIdFromQuery) : null
  );
  const [dates, setDates] = useState<{
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  }>({
    checkIn: undefined,
    checkOut: undefined,
  });
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [extraBed, setExtraBed] = useState(false);
  const [occupancyType, setOccupancyType] = useState<"single" | "double">("single");
  const [isLoaded, setIsLoaded] = useState(false);
  const [bookingReference, setBookingReference] = useState<string>("");

  // Guest details
  const [guestDetails, setGuestDetails] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    specialRequests: "",
  });

  // Payment details
  const [paymentMethod, setPaymentMethod] = useState<"bank-transfer" | "cash">("bank-transfer");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Use the booking mutation
  const { mutate: createBooking, isPending: isBookingPending } = useCreateBooking();

  // Animation effect
  useEffect(() => {
    if (!user) {
      navigate("/login?redirect=booking");
    }
    setIsLoaded(true);
  }, [user, navigate]);

  // Handle guest details changes
  const handleGuestDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  // Handle step changes
  const goToNextStep = () => {
    // Validation for each step
    if (step === "select") {
      if (!selectedRoom) {
        toast.error("Please select a room");
        return;
      }
      if (!dates.checkIn || !dates.checkOut) {
        toast.error("Please select check-in and check-out dates");
        return;
      }
      if (adults + children === 0) {
        toast.error("Please add at least one guest");
        return;
      }
      setStep("details");
    } else if (step === "details") {
      if (!guestDetails.fullName || !guestDetails.email || !guestDetails.phone) {
        toast.error("Please fill in all required fields");
        return;
      }
      setStep("payment");
    } else if (step === "payment") {
      if (!agreedToTerms) {
        toast.error("Please agree to the terms and conditions");
        return;
      }
      
      // Submit booking to the API
      if (selectedRoom && dates.checkIn && dates.checkOut) {
        const bookingData = {
          roomId: selectedRoom.id,
          checkInDate: dates.checkIn.toISOString(),
          checkOutDate: dates.checkOut.toISOString(),
          adults,
          children,
          occupancyType: occupancyType.toUpperCase() as 'SINGLE' | 'DOUBLE',
          extraBed,
          totalAmount: calculateTotal(),
          specialRequests: guestDetails.specialRequests
        };
        
        createBooking(bookingData, {
          onSuccess: (data) => {
            console.log("Booking successful:", data);
            setBookingReference(data.booking.bookingReference);
            setStep("confirmation");
          },
          onError: (error) => {
            console.error("Booking error:", error);
            toast.error(`Booking failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
          }
        });
      }
    }
  };

  const goToPrevStep = () => {
    if (step === "details") setStep("select");
    else if (step === "payment") setStep("details");
  };

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
    <main className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="hotel-container max-w-6xl">
        <div
          className={`transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-center mb-8">Book Your Stay</h1>

          {/* Booking Steps */}
          <Tabs
            value={step}
            className="w-full"
            onValueChange={(value) => setStep(value as BookingStep)}
          >
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger
                value="select"
                disabled={step !== "select"}
                className="data-[state=active]:text-hotel-primary"
              >
                1. Select Room
              </TabsTrigger>
              <TabsTrigger
                value="details"
                disabled={step !== "details" && step !== "select"}
                className="data-[state=active]:text-hotel-primary"
              >
                2. Your Details
              </TabsTrigger>
              <TabsTrigger
                value="payment"
                disabled={
                  step !== "payment" && step !== "details" && step !== "select"
                }
                className="data-[state=active]:text-hotel-primary"
              >
                3. Payment
              </TabsTrigger>
              <TabsTrigger
                value="confirmation"
                disabled={step !== "confirmation"}
                className="data-[state=active]:text-hotel-primary"
              >
                4. Confirmation
              </TabsTrigger>
            </TabsList>

            {/* Room Selection Step */}
            <TabsContent value="select">
              <BookingStepSelect 
                selectedRoom={selectedRoom}
                setSelectedRoom={setSelectedRoom}
                dates={dates}
                setDates={setDates}
                adults={adults}
                setAdults={setAdults}
                children={children}
                setChildren={setChildren}
                occupancyType={occupancyType}
                setOccupancyType={setOccupancyType}
                extraBed={extraBed}
                setExtraBed={setExtraBed}
                goToNextStep={goToNextStep}
              />
            </TabsContent>

            {/* Guest Details Step */}
            <TabsContent value="details">
              <BookingStepDetails 
                selectedRoom={selectedRoom}
                dates={dates}
                adults={adults}
                children={children}
                occupancyType={occupancyType}
                extraBed={extraBed}
                guestDetails={guestDetails}
                handleGuestDetailsChange={handleGuestDetailsChange}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
              />
            </TabsContent>

            {/* Payment Step */}
            <TabsContent value="payment">
              <BookingStepPayment 
                selectedRoom={selectedRoom}
                dates={dates}
                adults={adults}
                children={children}
                occupancyType={occupancyType}
                extraBed={extraBed}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                agreedToTerms={agreedToTerms}
                setAgreedToTerms={setAgreedToTerms}
                goToNextStep={goToNextStep}
                goToPrevStep={goToPrevStep}
                isBookingPending={isBookingPending}
              />
            </TabsContent>

            {/* Confirmation Step */}
            <TabsContent value="confirmation">
              <BookingStepConfirmation 
                selectedRoom={selectedRoom}
                dates={dates}
                adults={adults}
                children={children}
                occupancyType={occupancyType}
                extraBed={extraBed}
                guestDetails={guestDetails}
                bookingReference={bookingReference}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Booking;
