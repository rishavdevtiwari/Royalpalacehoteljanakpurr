
import React from "react";
import { format, addDays, differenceInDays } from "date-fns";
import { 
  CalendarIcon, 
  ChevronRight, 
  Users, 
  Plus, 
  Minus
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { Checkbox } from "../ui/checkbox";
import { cn } from "../../lib/utils";
import { ROOM_TYPES, EXTRA_BED_CHARGE } from "apps/frontend/src/data/roomData";

interface DateRange {
  checkIn: Date | undefined;
  checkOut: Date | undefined;
}

interface BookingStepSelectProps {
  selectedRoom: any;
  setSelectedRoom: (room: any) => void;
  dates: DateRange;
  setDates: React.Dispatch<React.SetStateAction<DateRange>>;
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  children: number;
  setChildren: React.Dispatch<React.SetStateAction<number>>;
  occupancyType: "single" | "double";
  setOccupancyType: React.Dispatch<React.SetStateAction<"single" | "double">>;
  extraBed: boolean;
  setExtraBed: React.Dispatch<React.SetStateAction<boolean>>;
  goToNextStep: () => void;
}

const BookingStepSelect: React.FC<BookingStepSelectProps> = ({
  selectedRoom,
  setSelectedRoom,
  dates,
  setDates,
  adults,
  setAdults,
  children,
  setChildren,
  occupancyType,
  setOccupancyType,
  extraBed,
  setExtraBed,
  goToNextStep,
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
            <h2 className="text-xl font-medium mb-4">Select Room</h2>
            <div className="space-y-6">
              {ROOM_TYPES.map((room) => (
                <div
                  key={room.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedRoom?.id === room.id
                      ? "border-hotel-primary bg-hotel-primary/5"
                      : "border-gray-200 hover:border-hotel-primary/50"
                  }`}
                  onClick={() => setSelectedRoom(room)}
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-32 object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-lg">
                          {room.name}
                        </h3>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-hotel-primary">
                            NPR {room.rates.single.toLocaleString()}
                          </p>
                          <p className="text-sm text-gray-500">
                            per night
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mt-1 mb-2">
                        {room.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {room.amenities.slice(0, 4).map((amenity) => (
                          <span
                            key={amenity}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                          >
                            {amenity}
                          </span>
                        ))}
                        {room.amenities.length > 4 && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            +{room.amenities.length - 4} more
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        <Users className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          Max {room.maxOccupancy.adults + room.maxOccupancy.children} guests (
                          {room.maxOccupancy.adults} adults, {room.maxOccupancy.children} children)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card className="sticky top-24">
          <CardContent className="p-6">
            <h2 className="text-xl font-medium mb-4">Your Stay</h2>

            {/* Dates */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="checkIn">Check-in Date</Label>
                <div className="mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dates.checkIn && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dates.checkIn ? (
                          format(dates.checkIn, "PPP")
                        ) : (
                          <span>Select check-in date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dates.checkIn}
                        onSelect={(date) =>
                          setDates({
                            ...dates,
                            checkIn: date,
                            // If checkout is earlier than the new checkin date, set checkout to checkin+1
                            checkOut:
                              !dates.checkOut ||
                              (date &&
                                dates.checkOut <= date)
                                ? date
                                  ? addDays(date, 1)
                                  : undefined
                                : dates.checkOut,
                          })
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div>
                <Label htmlFor="checkOut">Check-out Date</Label>
                <div className="mt-1">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dates.checkOut && "text-muted-foreground"
                        )}
                        disabled={!dates.checkIn}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dates.checkOut ? (
                          format(dates.checkOut, "PPP")
                        ) : (
                          <span>Select check-out date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dates.checkOut}
                        onSelect={(date) =>
                          setDates({ ...dates, checkOut: date })
                        }
                        disabled={(date) =>
                          !dates.checkIn ||
                          date <
                            addDays(dates.checkIn, 1)
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="space-y-4 mb-6">
              <div>
                <Label>Adults</Label>
                <div className="flex items-center mt-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setAdults((prev) => Math.max(1, prev - 1))
                    }
                    disabled={adults <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">
                    {adults}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setAdults((prev) => Math.min(4, prev + 1))
                    }
                    disabled={adults + children >= 4}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <Label>Children</Label>
                <div className="flex items-center mt-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setChildren((prev) => Math.max(0, prev - 1))
                    }
                    disabled={children <= 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="mx-4 w-8 text-center">
                    {children}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      setChildren((prev) => Math.min(3, prev + 1))
                    }
                    disabled={adults + children >= 4}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Occupancy Type (only show for rooms with double option) */}
            {selectedRoom && selectedRoom.rates.double && (
              <div className="mb-6">
                <Label className="mb-2 block">Occupancy Type</Label>
                <RadioGroup
                  value={occupancyType}
                  onValueChange={(value) =>
                    setOccupancyType(value as "single" | "double")
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="single"
                      id="occupancy-single"
                    />
                    <Label htmlFor="occupancy-single">
                      Single (NPR {selectedRoom.rates.single.toLocaleString()})
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="double"
                      id="occupancy-double"
                    />
                    <Label htmlFor="occupancy-double">
                      Double (NPR {selectedRoom.rates.double.toLocaleString()})
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {/* Extra Bed Option */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extraBed"
                  checked={extraBed}
                  onCheckedChange={(checked) =>
                    setExtraBed(checked === true)
                  }
                />
                <Label
                  htmlFor="extraBed"
                  className="text-sm cursor-pointer"
                >
                  Add extra bed (NPR {EXTRA_BED_CHARGE.toLocaleString()})
                </Label>
              </div>
            </div>

            {selectedRoom && dates.checkIn && dates.checkOut && (
              <>
                <Separator className="my-6" />

                {/* Price Summary */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Room ({calculateNights()} nights):</span>
                    <span>
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
                      <span>Extra Bed:</span>
                      <span>
                        NPR {(EXTRA_BED_CHARGE * calculateNights()).toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold pt-2">
                    <span>Total:</span>
                    <span className="text-hotel-primary">
                      NPR {calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}

            <Button
              className="w-full"
              onClick={goToNextStep}
              disabled={
                !selectedRoom ||
                !dates.checkIn ||
                !dates.checkOut ||
                adults + children === 0
              }
            >
              Continue to Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BookingStepSelect;
