
import React, { useState, useEffect } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";

// Gallery images with categories
const GALLERY_IMAGES = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=800&auto=format&fit=crop",
    alt: "Deluxe Room",
    category: "rooms"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=800&auto=format&fit=crop",
    alt: "Premium Suite",
    category: "rooms"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
    alt: "Swimming Pool",
    category: "facilities"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
    alt: "Hotel Lobby",
    category: "common-areas"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
    alt: "Hotel Restaurant",
    category: "dining"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=800&auto=format&fit=crop",
    alt: "Hotel Bar",
    category: "dining"
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1574052434365-4592bb423a30?q=80&w=800&auto=format&fit=crop",
    alt: "Executive Suite",
    category: "rooms"
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1543489822-c49534f3271f?q=80&w=800&auto=format&fit=crop",
    alt: "Conference Room",
    category: "facilities"
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=800&auto=format&fit=crop",
    alt: "Breakfast Buffet",
    category: "dining"
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop",
    alt: "Spa Treatment Room",
    category: "facilities"
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1584132869994-873f9363a562?q=80&w=800&auto=format&fit=crop",
    alt: "Hotel Corridor",
    category: "common-areas"
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1553653924-39b70295f8da?q=80&w=800&auto=format&fit=crop",
    alt: "Fitness Center",
    category: "facilities"
  }
];

// Gallery categories
const CATEGORIES = [
  { id: "all", name: "All" },
  { id: "rooms", name: "Rooms & Suites" },
  { id: "facilities", name: "Facilities" },
  { id: "dining", name: "Dining" },
  { id: "common-areas", name: "Common Areas" }
];

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Filter images based on selected category
  const filteredImages = selectedCategory === "all" 
    ? GALLERY_IMAGES 
    : GALLERY_IMAGES.filter(image => image.category === selectedCategory);

  // Open image in modal
  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  // Close modal
  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = "";
  };

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="hotel-container">
        <div
          className={`transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-center mb-2">Our Gallery</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our beautiful property through this collection of images showcasing our rooms, facilities, and amenities.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {CATEGORIES.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full ${
                  selectedCategory === category.id 
                    ? "bg-hotel-primary text-white" 
                    : "text-gray-700 hover:bg-hotel-primary/10"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div 
                key={image.id}
                className="relative overflow-hidden rounded-xl group cursor-pointer hover:shadow-lg transform transition duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => openModal(image.url)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 w-full">
                    <h3 className="text-white font-medium text-lg">{image.alt}</h3>
                    <div className="mt-2 flex items-center">
                      <ImageIcon className="h-4 w-4 text-hotel-accent mr-1" />
                      <span className="text-white/80 text-sm">View larger</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No images found in this category.</p>
            </div>
          )}

          {/* Image Modal */}
          {modalImage && (
            <div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
              onClick={closeModal}
            >
              <div 
                className="relative max-w-5xl max-h-[90vh] animate-scale-in"
                onClick={e => e.stopPropagation()}
              >
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white border-0"
                  onClick={closeModal}
                >
                  <span className="sr-only">Close</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </Button>
                <img 
                  src={modalImage} 
                  alt="Gallery image" 
                  className="max-w-full max-h-[90vh] object-contain"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Gallery;
