
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthMiddleware from "./components/AuthMiddleware";
import Navbar from "./components/Navbar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Booking from "./pages/Booking";
import Profile from "./pages/Profile";
import UserBookings from "./pages/UserBookings";
import Rooms from "./pages/Rooms";
import Amenities from "./pages/Amenities";
import NotFound from "./pages/NotFound";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UserManagement from "./admin/UserManagement";

const App = () => (
  <BrowserRouter>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthMiddleware>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<UserManagement />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/bookings" element={<UserBookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/amenities" element={<Amenities />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthMiddleware>
    </TooltipProvider>
  </BrowserRouter>
);

export default App;
