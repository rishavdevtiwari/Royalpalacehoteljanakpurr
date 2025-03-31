
import React, { useState } from "react";
import { useGetUserBookings, useUpdateBookingStatus } from "@/api/useBookings";
import { useAuth } from "@/context/AuthContext";
import { format } from "date-fns";
import { toast } from "sonner";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Users, Hotel, CreditCard, XCircle } from "lucide-react";
import { Link } from "react-router-dom";

const UserBookings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const { data: bookings, isLoading, error, refetch } = useGetUserBookings();
  const { mutate: updateBookingStatus } = useUpdateBookingStatus();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24">
        <p className="text-center">Please log in to view your bookings.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <p className="text-center">Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24">
        <p className="text-center text-red-500">Error loading bookings: {error.message}</p>
        <div className="text-center mt-4">
          <Button onClick={() => refetch()}>Try Again</Button>
        </div>
      </div>
    );
  }

  const handleCancelBooking = (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      updateBookingStatus({ bookingId, status: "CANCELLED" }, {
        onSuccess: () => {
          toast.success("Booking cancelled successfully");
          refetch();
        },
        onError: (error) => {
          toast.error(`Failed to cancel booking: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      });
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "CONFIRMED": return "bg-green-500";
      case "PENDING": return "bg-yellow-500";
      case "CANCELLED": return "bg-red-500";
      case "COMPLETED": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  // Filter bookings based on active tab
  const filteredBookings = activeTab === "all" 
    ? bookings 
    : bookings?.filter(booking => booking.status === activeTab.toUpperCase());

  return (
    <main className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-center mb-8">Your Bookings</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 w-full max-w-lg mx-auto">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredBookings?.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p>No bookings found in this category.</p>
              <div className="mt-4">
                <Link to="/booking">
                  <Button>Make a Reservation</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {filteredBookings?.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{booking.room.roomType.name}</CardTitle>
                      <CardDescription>
                        Booking #{booking.bookingReference}
                      </CardDescription>
                    </div>
                    <Badge className={getStatusBadgeColor(booking.status)}>
                      {booking.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-hotel-primary" />
                        <span>
                          Check-in: {format(new Date(booking.checkInDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-hotel-primary" />
                        <span>
                          Check-out: {format(new Date(booking.checkOutDate), "MMM dd, yyyy")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-hotel-primary" />
                        <span>
                          Guests: {booking.adults} adults{booking.children > 0 ? `, ${booking.children} children` : ""}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Hotel className="h-4 w-4 text-hotel-primary" />
                        <span>
                          Room: {booking.room.roomNumber} ({booking.occupancyType} Occupancy)
                        </span>
                      </div>
                      {booking.extraBed && (
                        <div className="flex items-center gap-2">
                          <span>Extra bed requested</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-hotel-primary" />
                        <span>
                          Total: ${booking.totalAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 flex justify-between">
                  <div className="text-sm text-gray-500">
                    Booked on {format(new Date(booking.createdAt), "MMM dd, yyyy")}
                  </div>
                  {booking.status === "CONFIRMED" && (
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleCancelBooking(booking.id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default UserBookings;
