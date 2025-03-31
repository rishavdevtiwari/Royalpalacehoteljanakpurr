
import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";

const About: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="hotel-container">
        <div
          className={`transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-center mb-2">About Us</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            Welcome to Royal Palace Hotel, your premier destination in Janakpurdham, Nepal.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-medium mb-4">Our Story</h2>
              <div className="prose max-w-none">
                <p>
                  Established in 2018, Royal Palace Hotel has quickly become one of the most sought-after accommodations in Janakpurdham. 
                  Our hotel combines modern luxury with traditional Nepali hospitality to create an unforgettable experience for all our guests.
                </p>
                <p>
                  Located in the heart of Janakpurdham, we offer convenient access to major religious sites, business centers, 
                  and tourist attractions. Our dedicated team works tirelessly to ensure your stay is comfortable, enjoyable, and memorable.
                </p>
                <p>
                  We pride ourselves on attention to detail, personalized service, and creating a home away from home for business and leisure travelers alike.
                </p>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
                alt="Royal Palace Hotel Building" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-medium mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-hotel-card">
                <div className="w-12 h-12 bg-hotel-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hotel-primary"><rect width="8" height="8" x="8" y="8" rx="2"></rect><line x1="10" x2="10" y1="8" y2="4"></line><line x1="14" x2="14" y1="8" y2="4"></line><line x1="10" x2="10" y1="16" y2="20"></line><line x1="14" x2="14" y1="16" y2="20"></line><line x1="16" x2="20" y1="10" y2="10"></line><line x1="16" x2="20" y1="14" y2="14"></line><line x1="4" x2="8" y1="10" y2="10"></line><line x1="4" x2="8" y1="14" y2="14"></line></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Excellence</h3>
                <p className="text-gray-600">
                  We strive for excellence in every aspect of our service, from the quality of our rooms to the food we serve and the experiences we create.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-hotel-card">
                <div className="w-12 h-12 bg-hotel-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hotel-primary"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Hospitality</h3>
                <p className="text-gray-600">
                  We embrace the rich tradition of Nepali hospitality, welcoming our guests with warmth, respect, and genuine care.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-hotel-card">
                <div className="w-12 h-12 bg-hotel-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-hotel-primary"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Sustainability</h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices, respecting our environment and contributing positively to our local community.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h2 className="text-2xl font-medium mb-6 text-center">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=987&auto=format&fit=crop"
                    alt="Rajesh Kumar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Rajesh Kumar</h3>
                <p className="text-hotel-primary mb-2">General Manager</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years of experience in the hospitality industry, Rajesh ensures that every aspect of our hotel meets the highest standards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop"
                    alt="Priya Sharma" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Priya Sharma</h3>
                <p className="text-hotel-primary mb-2">Front Office Manager</p>
                <p className="text-gray-600 text-sm">
                  Priya and her team are the first faces you'll see at our hotel. Their warm welcome sets the tone for your entire stay.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm text-center">
                <div className="w-24 h-24 mx-auto mb-4 overflow-hidden rounded-full">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=987&auto=format&fit=crop"
                    alt="Anup Karki" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-medium">Anup Karki</h3>
                <p className="text-hotel-primary mb-2">Executive Chef</p>
                <p className="text-gray-600 text-sm">
                  Chef Anup brings culinary excellence to our restaurant, blending traditional Nepali flavors with international cuisine.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Button onClick={() => window.location.href = '/contact'} className="px-6">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
