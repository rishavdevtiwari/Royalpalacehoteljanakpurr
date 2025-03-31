import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Calendar, ChevronRight, Wifi, Utensils, Car, Coffee, Wind, Tv, ShowerHead, MapPin, Landmark, Waves, PartyPopper, Sofa, Facebook, Mail, Phone, MessageSquare, Image } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ROOM_TYPES } from "apps/frontend/src/data/roomData";
import RoomCard from "../components/RoomCard";

// Amenities
const AMENITIES = [{
  icon: Wifi,
  name: "High-Speed WiFi"
}, {
  icon: Utensils,
  name: "Fine Dining"
}, {
  icon: Car,
  name: "Valet Parking"
}, {
  icon: Coffee,
  name: "24/7 Room Service"
}, {
  icon: Waves,
  name: "Swimming Pool"
}, {
  icon: PartyPopper,
  name: "Event & Banquet"
}, {
  icon: Sofa,
  name: "Lounge Area"
}, {
  icon: ShowerHead,
  name: "Luxury Bathrooms"
}];

// Gallery images
const GALLERY_IMAGES = [{
  id: 1,
  url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
  alt: "Luxurious Hotel Room",
  size: "large"
}, {
  id: 2,
  url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
  alt: "Hotel Suite",
  size: "small"
}, {
  id: 3,
  url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
  alt: "Hotel Pool",
  size: "medium"
}, {
  id: 4,
  url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
  alt: "Hotel Lobby",
  size: "small"
}, {
  id: 5,
  url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
  alt: "Hotel Restaurant",
  size: "medium"
}, {
  id: 6,
  url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
  alt: "Hotel Bar",
  size: "large"
}];
const Landing: React.FC = () => {
  const {
    user
  } = useAuth();
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [guests, setGuests] = useState<number>(2);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Calculate tomorrow's date for default checkout
  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  // Handle booking search
  const handleBookingSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would redirect to the search results page with query params
    console.log({
      checkInDate,
      checkOutDate,
      guests
    });
  };
  return <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/20 z-10"></div>
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1470&auto=format&fit=crop" alt="Royal Palace Hotel Exterior" className="w-full h-full object-cover" />
        </div>

        {/* Hero Content */}
        <div className="hotel-container relative z-10 mt-16">
          <div className="max-w-3xl">
            <h1 className={`text-white font-light mb-4 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
              <span className="font-semibold">Royal Palace</span> Hotel, 
              <span className="block">A touch of luxury in Janakpurdham</span>
            </h1>
            <p className={`text-white/90 text-lg md:text-xl mb-8 transition-all duration-1000 delay-100 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
              Experience unparalleled elegance and exceptional service at our premium hotel destination. Your perfect getaway awaits.
            </p>
            <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 delay-200 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-10"}`}>
              {user ? <Link to="/booking">
                  <Button className="hotel-button-accent shadow-lg">
                    Book Your Stay
                  </Button>
                </Link> : <Link to="/register">
                  <Button className="hotel-button-accent shadow-lg">
                    Start Your Journey
                  </Button>
                </Link>}
              <Link to="/about">
                <Button variant="outline" className="border-white hover:bg-white/10 text-zinc-600">
                  Discover More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className={`absolute left-0 right-0 bottom-0 translate-y-1/2 z-20 px-4 transition-all duration-1000 delay-300 ${isLoaded ? "opacity-100" : "opacity-0 translate-y-20"}`}>
          <div className="hotel-container">
            <form onSubmit={handleBookingSearch} className="hotel-glass-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-hotel-dark">Check-in Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="hotel-input pl-10 w-full" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-hotel-dark">Check-out Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)} min={checkInDate || getTomorrowDate()} className="hotel-input pl-10 w-full" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-hotel-dark">Guests</label>
                <select value={guests} onChange={e => setGuests(Number(e.target.value))} className="hotel-input w-full">
                  {[1, 2, 3, 4, 5, 6].map(num => <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <Button type="submit" className="w-full bg-hotel-primary hover:bg-hotel-dark text-white h-[46px]">
                  Search Availability
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="hotel-section pt-40 md:pt-32">
        <div className="hotel-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Featured Accommodations</h2>
            <p className="max-w-2xl mx-auto">
              Discover our carefully curated selection of premium rooms and suites, 
              designed to provide the ultimate comfort and luxury for your stay.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOM_TYPES.slice(0, 3).map((room, index) => <RoomCard key={room.id} room={room} />)}
          </div>

          <div className="text-center mt-12">
            <Link to="/rooms">
              <Button className="hotel-button-secondary">
                View All Rooms
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="hotel-section bg-hotel-secondary/50">
        <div className="hotel-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Premium Amenities</h2>
            <p className="max-w-2xl mx-auto">
              Enjoy our carefully selected range of premium amenities designed to enhance your stay 
              and provide unparalleled comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
            {AMENITIES.map((amenity, index) => <Card key={index} className="border-0 bg-white shadow-hotel-soft hover:shadow-hotel-card transition-all duration-300 animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <CardContent className="flex flex-col items-center text-center p-6">
                  <div className="w-12 h-12 bg-hotel-primary/10 rounded-full flex items-center justify-center mb-4">
                    <amenity.icon className="h-6 w-6 text-hotel-primary" />
                  </div>
                  <h3 className="text-lg font-medium">{amenity.name}</h3>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="hotel-section">
        <div className="hotel-container">
          <div className="text-center mb-16">
            <h2 className="mb-4">Our Gallery</h2>
            <p className="max-w-2xl mx-auto">
              Take a visual tour of our beautiful hotel and facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {GALLERY_IMAGES.map(image => <div key={image.id} className={`relative overflow-hidden rounded-xl group ${image.size === 'large' ? 'md:col-span-2 md:row-span-2' : image.size === 'medium' ? 'md:col-span-1 md:row-span-2' : ''} hover:z-10 transition-all duration-300 animate-fade-in`} style={{
            animationDelay: `${image.id * 0.1}s`
          }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img src={image.url} alt={image.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  <h3 className="font-medium text-lg text-white">{image.alt}</h3>
                </div>
              </div>)}
          </div>

          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button className="hotel-button-secondary">
                View Full Gallery
                <Image className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-hotel-primary/90 z-10"></div>
          <img src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=1632&auto=format&fit=crop" alt="Hotel Interior" className="w-full h-full object-cover" />
        </div>

        <div className="hotel-container relative z-10">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-white mb-6">Start Your Luxurious Journey Today</h2>
            <p className="text-white/90 mb-8 text-lg">
              Book your stay now and experience the perfect blend of comfort, luxury, and exceptional service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to={user ? "/booking" : "/register"}>
                <Button className="hotel-button-accent">
                  {user ? "Book Your Stay" : "Create an Account"}
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="text-white border-white bg-zinc-700 hover:bg-zinc-600">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hotel-dark text-white py-12">
        <div className="hotel-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Landmark className="h-6 w-6 text-hotel-accent" />
                <span className="font-semibold text-xl">Royal Palace Hotel</span>
              </div>
              <p className="text-white/70 mb-6">
                Experience luxury redefined at our premium hotel destination in Janakpurdham, where comfort meets elegance.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/profile.php?id=61573381963881" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hotel-accent transition-colors">
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a href="mailto:royalpalacejanakpur@gmail.com" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hotel-accent transition-colors">
                  <Mail className="h-5 w-5 text-white" />
                </a>
                <a href="https://wa.me/9705151900" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hotel-accent transition-colors">
                  <MessageSquare className="h-5 w-5 text-white" />
                </a>
                <a href="tel:+9779705151900" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-hotel-accent transition-colors">
                  <Phone className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/rooms" className="text-white/70 hover:text-white transition-colors">Rooms</Link></li>
                <li><Link to="/amenities" className="text-white/70 hover:text-white transition-colors">Amenities</Link></li>
                <li><Link to="/gallery" className="text-white/70 hover:text-white transition-colors">Gallery</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Contact</h4>
              <address className="not-italic text-white/70">
                <p className="mb-2">Mujeliya, Janakpurdham</p>
                <p className="mb-2">Nepal</p>
                <p className="mb-2">Email: royalpalacejanakpur@gmail.com</p>
                <p className="mb-2">Phone: 041-591471 | 9705151900</p>
                <p>WhatsApp: 9705151900</p>
              </address>
            </div>

            <div>
              <h4 className="text-lg font-medium mb-4">Newsletter</h4>
              <p className="text-white/70 mb-4">Subscribe to receive updates and special offers.</p>
              <form className="flex">
                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800" />
                <button type="submit" className="bg-hotel-accent text-white px-4 py-2 rounded-r-md hover:bg-amber-600 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-6 text-center text-white/50">
            <p>© {new Date().getFullYear()} Royal Palace Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>;
};
export default Landing;