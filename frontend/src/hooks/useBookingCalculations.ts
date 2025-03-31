
import { differenceInDays } from "date-fns";
import { EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";

interface UseBookingCalculationsProps {
  selectedRoom: any;
  dates: {
    checkIn: Date | undefined;
    checkOut: Date | undefined;
  };
  occupancyType: "single" | "double";
  extraBed: boolean;
}

export const useBookingCalculations = ({
  selectedRoom,
  dates,
  occupancyType,
  extraBed,
}: UseBookingCalculationsProps) => {
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

  return {
    calculateNights,
    calculateTotal,
  };
};
