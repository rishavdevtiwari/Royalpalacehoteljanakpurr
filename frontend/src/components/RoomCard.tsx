
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { ChevronRight } from "lucide-react";
import { RoomType } from "apps/frontend/src/data/roomData";

interface RoomCardProps {
  room: RoomType;
  className?: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, className = "" }) => {
  return (
    <Card className={`hotel-card group animate-fade-in ${className}`}>
      <div className="img-hover-zoom h-56 md:h-72">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-medium mb-2">{room.name}</h3>
        <p className="text-gray-600 mb-4">{room.description}</p>
        <div className="flex flex-col space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Single Occupancy:</span>
            <span className="font-medium">NPR {room.rates.single.toLocaleString()}</span>
          </div>
          {room.rates.double && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Double Occupancy:</span>
              <span className="font-medium">NPR {room.rates.double.toLocaleString()}</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-hotel-primary">
            <span className="text-2xl font-semibold">NPR {room.rates.single.toLocaleString()}</span>
            <span className="text-sm text-gray-500"> / night</span>
          </div>
          <Link to={`/booking?room=${room.id}`}>
            <Button variant="outline" className="group-hover:bg-hotel-primary group-hover:text-white transition-all duration-300">
              Book Now
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
