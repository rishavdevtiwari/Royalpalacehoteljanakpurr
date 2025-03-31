
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Home,
  Users,
  Calendar,
  DollarSign,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  Edit,
  Eye,
  BedDouble,
  Landmark,
  UserCheck,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock data for the admin dashboard
const revenueData = [
  { month: "Jan", revenue: 12500 },
  { month: "Feb", revenue: 14000 },
  { month: "Mar", revenue: 15800 },
  { month: "Apr", revenue: 17200 },
  { month: "May", revenue: 19500 },
  { month: "Jun", revenue: 22000 },
  { month: "Jul", revenue: 25000 },
];

const bookingData = [
  { name: "Deluxe Rooms", value: 35 },
  { name: "Suites", value: 25 },
  { name: "Standard Rooms", value: 30 },
  { name: "Premium Rooms", value: 10 },
];

const COLORS = ["#334155", "#94A3B8", "#D4AF37", "#1E293B"];

const recentBookings = [
  {
    id: "B001",
    guestName: "Michael Johnson",
    roomType: "Deluxe King Suite",
    checkIn: "2023-07-15",
    checkOut: "2023-07-18",
    amount: 899,
    status: "Confirmed",
  },
  {
    id: "B002",
    guestName: "Sarah Wilson",
    roomType: "Ocean View Premium",
    checkIn: "2023-07-20",
    checkOut: "2023-07-25",
    amount: 1299,
    status: "Pending",
  },
  {
    id: "B003",
    guestName: "David Thompson",
    roomType: "Executive Suite",
    checkIn: "2023-07-18",
    checkOut: "2023-07-19",
    amount: 499,
    status: "Cancelled",
  },
  {
    id: "B004",
    guestName: "Emma Martinez",
    roomType: "Deluxe King Suite",
    checkIn: "2023-08-01",
    checkOut: "2023-08-05",
    amount: 1199,
    status: "Confirmed",
  },
  {
    id: "B005",
    guestName: "Robert Brown",
    roomType: "Premium Ocean View",
    checkIn: "2023-08-10",
    checkOut: "2023-08-15",
    amount: 1999,
    status: "Pending",
  },
];

const availableRooms = [
  {
    id: "R001",
    name: "Deluxe King Suite",
    type: "Suite",
    price: 299,
    status: "Available",
    occupancy: "2 Adults, 1 Child",
  },
  {
    id: "R002",
    name: "Premium Ocean View",
    type: "Premium",
    price: 399,
    status: "Occupied",
    occupancy: "2 Adults",
  },
  {
    id: "R003",
    name: "Executive Suite",
    type: "Suite",
    price: 499,
    status: "Maintenance",
    occupancy: "2 Adults, 2 Children",
  },
  {
    id: "R004",
    name: "Standard Double",
    type: "Standard",
    price: 199,
    status: "Available",
    occupancy: "2 Adults",
  },
  {
    id: "R005",
    name: "Family Suite",
    type: "Suite",
    price: 599,
    status: "Available",
    occupancy: "4 Adults, 2 Children",
  },
];

const Dashboard: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Redirect non-admin users
    if (user && !isAdmin) {
      navigate("/");
    }
    
    // Animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null; // Or a loading state
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Occupied":
        return "bg-blue-100 text-blue-800";
      case "Maintenance":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-semibold flex items-center">
              <Landmark className="h-5 w-5 mr-2 text-hotel-primary" />
              Admin Dashboard
            </h2>
          </div>
          <nav className="mt-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center px-6 py-3 w-full text-left ${
                activeTab === "overview"
                  ? "bg-hotel-primary/10 text-hotel-primary border-r-2 border-hotel-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-hotel-primary"
              }`}
            >
              <Home className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`flex items-center px-6 py-3 w-full text-left ${
                activeTab === "bookings"
                  ? "bg-hotel-primary/10 text-hotel-primary border-r-2 border-hotel-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-hotel-primary"
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("rooms")}
              className={`flex items-center px-6 py-3 w-full text-left ${
                activeTab === "rooms"
                  ? "bg-hotel-primary/10 text-hotel-primary border-r-2 border-hotel-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-hotel-primary"
              }`}
            >
              <BedDouble className="h-5 w-5 mr-3" />
              Rooms
            </button>
            <button
              onClick={() => setActiveTab("guests")}
              className={`flex items-center px-6 py-3 w-full text-left ${
                activeTab === "guests"
                  ? "bg-hotel-primary/10 text-hotel-primary border-r-2 border-hotel-primary"
                  : "text-gray-600 hover:bg-gray-50 hover:text-hotel-primary"
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Guests
            </button>
          </nav>
        </aside>

        {/* Mobile navigation */}
        <div className="md:hidden bg-white w-full border-b border-gray-200 py-3 px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview" className="flex flex-col items-center">
                <Home className="h-4 w-4 mb-1" />
                <span className="text-xs">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="bookings" className="flex flex-col items-center">
                <Calendar className="h-4 w-4 mb-1" />
                <span className="text-xs">Bookings</span>
              </TabsTrigger>
              <TabsTrigger value="rooms" className="flex flex-col items-center">
                <BedDouble className="h-4 w-4 mb-1" />
                <span className="text-xs">Rooms</span>
              </TabsTrigger>
              <TabsTrigger value="guests" className="flex flex-col items-center">
                <Users className="h-4 w-4 mb-1" />
                <span className="text-xs">Guests</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
                <Button className="hidden sm:flex bg-hotel-primary hover:bg-hotel-dark text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-hotel-primary/10">
                        <Calendar className="h-6 w-6 text-hotel-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                        <h3 className="text-2xl font-bold">324</h3>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <span>↑ 12%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-blue-100">
                        <UserCheck className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Occupancy Rate</p>
                        <h3 className="text-2xl font-bold">78%</h3>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <span>↑ 4%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-hotel-accent/10">
                        <DollarSign className="h-6 w-6 text-hotel-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                        <h3 className="text-2xl font-bold">$126,500</h3>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <span>↑ 18%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-full bg-gray-100">
                        <Users className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">New Guests</p>
                        <h3 className="text-2xl font-bold">42</h3>
                        <p className="text-xs text-red-600 flex items-center mt-1">
                          <span>↓ 6%</span>
                          <span className="text-gray-500 ml-1">from last month</span>
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monthly Revenue</CardTitle>
                    <CardDescription>Revenue trend for the last 7 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={revenueData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                          }}
                        >
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip 
                            formatter={(value) => [`$${value}`, "Revenue"]}
                            contentStyle={{ 
                              borderRadius: "8px", 
                              border: "none", 
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              padding: "10px"
                            }}
                          />
                          <Bar 
                            dataKey="revenue" 
                            fill="#334155" 
                            radius={[4, 4, 0, 0]} 
                            barSize={30}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Booking Distribution</CardTitle>
                    <CardDescription>Room type popularity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={bookingData}
                            cx="50%"
                            cy="50%"
                            innerRadius={80}
                            outerRadius={120}
                            fill="#8884d8"
                            paddingAngle={3}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {bookingData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip 
                            formatter={(value, name) => [`${value}%`, name]}
                            contentStyle={{ 
                              borderRadius: "8px", 
                              border: "none", 
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                              padding: "10px"
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings Table */}
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-lg">Recent Bookings</CardTitle>
                      <CardDescription>Latest hotel reservations</CardDescription>
                    </div>
                    <Button variant="outline" className="text-hotel-primary bg-hotel-primary/5 border-hotel-primary/20 hover:bg-hotel-primary/10">
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead className="hidden md:table-cell">Check In</TableHead>
                        <TableHead className="hidden md:table-cell">Check Out</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.guestName}</TableCell>
                          <TableCell className="hidden sm:table-cell">{booking.roomType}</TableCell>
                          <TableCell className="hidden md:table-cell">{booking.checkIn}</TableCell>
                          <TableCell className="hidden md:table-cell">{booking.checkOut}</TableCell>
                          <TableCell>${booking.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit booking
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Cancel booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Bookings Management</h1>
                <Button className="bg-hotel-primary hover:bg-hotel-dark text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Booking
                </Button>
              </div>

              {/* Filter and Search */}
              <Card className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search fields would go here */}
                </div>
              </Card>

              {/* Bookings Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Booking ID</TableHead>
                        <TableHead>Guest</TableHead>
                        <TableHead>Room Type</TableHead>
                        <TableHead className="hidden md:table-cell">Check In</TableHead>
                        <TableHead className="hidden md:table-cell">Check Out</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentBookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.guestName}</TableCell>
                          <TableCell className="hidden sm:table-cell">{booking.roomType}</TableCell>
                          <TableCell className="hidden md:table-cell">{booking.checkIn}</TableCell>
                          <TableCell className="hidden md:table-cell">{booking.checkOut}</TableCell>
                          <TableCell>${booking.amount}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit booking
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Cancel booking
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Rooms Tab */}
          {activeTab === "rooms" && (
            <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Room Management</h1>
                <Button className="bg-hotel-primary hover:bg-hotel-dark text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </div>

              {/* Rooms Table */}
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Room ID</TableHead>
                        <TableHead>Room Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Price/Night</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Occupancy</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {availableRooms.map((room) => (
                        <TableRow key={room.id}>
                          <TableCell className="font-medium">{room.id}</TableCell>
                          <TableCell>{room.name}</TableCell>
                          <TableCell>{room.type}</TableCell>
                          <TableCell>${room.price}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getRoomStatusColor(room.status)}>
                              {room.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{room.occupancy}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit room
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete room
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Guests Tab */}
          {activeTab === "guests" && (
            <div className={`space-y-6 ${isLoaded ? "animate-fade-in" : "opacity-0"}`}>
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Guest Management</h1>
                <Button className="bg-hotel-primary hover:bg-hotel-dark text-white">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Guest
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <p className="text-center text-gray-500">Guests management functionality will be implemented in the next phase.</p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
