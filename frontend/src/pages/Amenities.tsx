import React from "react";
import { 
  Wifi, 
  AirVent, 
  Tv, 
  Coffee, 
  Utensils, 
  Bed, 
  Bath, 
  Sofa, 
  RefrigeratorIcon, 
  ShowerHead,
  Wine
} from "lucide-react";
import { 
  Card, 
  CardContent 
} from "../components/ui/card";
import { Checkbox } from "../components/ui/checkbox";

// Amenities data
const amenitiesData = [
  { id: "air-conditioning", label: "Air Conditioning", icon: AirVent },
  { id: "bathrobe", label: "Bathrobe & Slippers", icon: Bath },
  { id: "breakfast", label: "Breakfast Included", icon: Coffee },
  { id: "dining-area", label: "Dining Area", icon: Utensils },
  { id: "tv", label: "Flat-screen TV", icon: Tv },
  { id: "wifi", label: "Free Wi-Fi", icon: Wifi },
  { id: "living-area", label: "Living Area", icon: Sofa },
  { id: "living-room", label: "Living Room", icon: Sofa },
  { id: "mini-bar", label: "Mini Bar", icon: Wine },
  { id: "mini-fridge", label: "Mini Fridge", icon: RefrigeratorIcon },
  { id: "toiletries", label: "Premium Toiletries", icon: ShowerHead },
  { id: "seating-area", label: "Seating Area", icon: Sofa },
  { id: "coffee-maker", label: "Tea/Coffee Maker", icon: Coffee },
];

const Amenities: React.FC = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold mb-4">Hotel Amenities</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the exceptional amenities that make your stay with us comfortable, convenient, and memorable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {amenitiesData.map((amenity) => (
            <Card key={amenity.id} className="hotel-card hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-hotel-primary/10 p-3 rounded-lg">
                    <amenity.icon className="h-6 w-6 text-hotel-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Checkbox id={amenity.id} className="mr-2" defaultChecked />
                      <label 
                        htmlFor={amenity.id} 
                        className="text-lg font-medium cursor-pointer"
                      >
                        {amenity.label}
                      </label>
                    </div>
                    <p className="text-sm text-gray-500">
                      Available in all premium rooms and suites
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gray-50 rounded-xl p-8 max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-2">Looking for More?</h2>
            <p className="text-gray-600">
              Our hotel offers additional amenities upon request. Contact our concierge for personalized services.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-4">
            <a 
              href="/contact" 
              className="hotel-button-primary w-full md:w-auto text-center"
            >
              Contact Concierge
            </a>
            <a 
              href="/rooms" 
              className="hotel-button-secondary w-full md:w-auto text-center"
            >
              Explore Rooms
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Amenities;

