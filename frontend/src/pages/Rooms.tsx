
import React, { useState } from "react";
import { ROOM_TYPES } from "apps/frontend/src/data/roomData";
import RoomCard from "../components/RoomCard";
import { Bed, Users, DollarSign, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Slider } from "../components/ui/slider";
import { Separator } from "../components/ui/separator";

const Rooms: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 15000]);
  const [occupancy, setOccupancy] = useState<string>("any");
  const [amenities, setAmenities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique amenities from rooms
  const allAmenities = Array.from(
    new Set(ROOM_TYPES.flatMap(room => room.amenities))
  ).sort();

  // Filter rooms based on criteria
  const filteredRooms = ROOM_TYPES.filter(room => {
    // Price filter
    const roomPrice = room.rates.single;
    if (roomPrice < priceRange[0] || roomPrice > priceRange[1]) {
      return false;
    }

    // Occupancy filter
    if (occupancy === "single" && !room.rates.single) {
      return false;
    }
    if (occupancy === "double" && !room.rates.double) {
      return false;
    }

    // Amenities filter
    if (amenities.length > 0) {
      return amenities.every(amenity => room.amenities.includes(amenity));
    }

    return true;
  });

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1551776552-dde2a0aaf879?q=80&w=1470&auto=format&fit=crop"
            alt="Hotel Rooms"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="hotel-container relative z-10">
          <h1 className="text-white mb-4">Our Accommodations</h1>
          <p className="text-white/90 max-w-2xl">
            Discover our carefully curated selection of premium rooms and suites,
            designed to provide the ultimate comfort and luxury for your stay.
          </p>
        </div>
      </section>

      <section className="hotel-section">
        <div className="hotel-container">
          {/* Mobile filter toggle */}
          <div className="md:hidden mb-6">
            <Button 
              onClick={() => setShowFilters(!showFilters)}
              variant="outline" 
              className="w-full flex items-center justify-center"
            >
              <Filter className="h-4 w-4 mr-2" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <aside className={`w-full md:w-64 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Price Range
                  </h3>
                  <Slider
                    defaultValue={[0, 15000]}
                    max={15000}
                    step={500}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>NPR {priceRange[0].toLocaleString()}</span>
                    <span>NPR {priceRange[1].toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Occupancy */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <Users className="h-4 w-4 mr-2" />
                    Occupancy
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="occupancy"
                        checked={occupancy === "any"}
                        onChange={() => setOccupancy("any")}
                        className="radio"
                      />
                      <span>Any</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="occupancy"
                        checked={occupancy === "single"}
                        onChange={() => setOccupancy("single")}
                        className="radio"
                      />
                      <span>Single</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="occupancy"
                        checked={occupancy === "double"}
                        onChange={() => setOccupancy("double")}
                        className="radio"
                      />
                      <span>Double</span>
                    </label>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Amenities */}
                <div>
                  <h3 className="text-lg font-medium flex items-center mb-4">
                    <Bed className="h-4 w-4 mr-2" />
                    Amenities
                  </h3>
                  <div className="space-y-3">
                    {allAmenities.map(amenity => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={`amenity-${amenity}`}
                          checked={amenities.includes(amenity)}
                          onCheckedChange={() => toggleAmenity(amenity)}
                        />
                        <label
                          htmlFor={`amenity-${amenity}`}
                          className="text-sm cursor-pointer"
                        >
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Room Listings */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold">
                  Available Rooms ({filteredRooms.length})
                </h2>
              </div>

              {filteredRooms.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <p className="text-gray-500 mb-2">No rooms match your current filters.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setPriceRange([0, 15000]);
                      setOccupancy("any");
                      setAmenities([]);
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {filteredRooms.map((room, index) => (
                    <RoomCard key={room.id} room={room} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Rooms;
