import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  FacebookIcon,
  Send
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { toast } from "sonner";
import { useSendContactForm } from "../api/useContact";

const Contact: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  // Get the mutation hook for submitting the contact form
  const { mutate: submitContactForm, isPending } = useSendContactForm();

  // Animation on page load
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    submitContactForm(formData, {
      onSuccess: () => {
        toast.success("Message sent successfully! We'll get back to you soon.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        });
      },
      onError: (error) => {
        toast.error(`Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    });
  };

  return (
    <main className="min-h-screen pt-20 pb-20">
      <div className="hotel-container">
        <div
          className={`transition-all duration-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h1 className="text-center mb-2">Contact Us</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We're here to answer any questions you may have about our hotel. Reach out to us and we'll respond as soon as we can.
          </p>

          {/* Contact Information and Form Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-hotel-secondary/30 rounded-xl p-8">
                <h2 className="text-2xl font-medium mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-hotel-primary/10 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-hotel-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Location</h3>
                      <p className="text-gray-600 mt-1">Mujeliya, Janakpurdham, Nepal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-primary/10 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-hotel-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Phone</h3>
                      <p className="text-gray-600 mt-1">041-591471 | 9705151900</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-primary/10 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-hotel-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Email</h3>
                      <a 
                        href="mailto:royalpalacejanakpur@gmail.com" 
                        className="text-gray-600 hover:text-hotel-primary transition-colors mt-1 block"
                      >
                        royalpalacejanakpur@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-primary/10 p-3 rounded-full mr-4">
                      <MessageSquare className="h-6 w-6 text-hotel-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">WhatsApp</h3>
                      <p className="text-gray-600 mt-1">9705151900</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-hotel-primary/10 p-3 rounded-full mr-4">
                      <Clock className="h-6 w-6 text-hotel-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">Opening Hours</h3>
                      <p className="text-gray-600 mt-1">24/7 - We're always open to serve you</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="bg-hotel-secondary/30 rounded-xl p-8">
                <h3 className="text-xl font-medium mb-4">Follow Us</h3>
                <p className="text-gray-600 mb-4">Connect with us on social media for updates and offers.</p>
                <div className="flex space-x-3">
                  <a 
                    href="https://www.facebook.com/profile.php?id=61573381963881" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors"
                  >
                    <FacebookIcon className="h-5 w-5" />
                  </a>
                  {/* Add more social media links here as needed */}
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-hotel-card p-8">
              <h2 className="text-2xl font-medium mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input 
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="Booking Inquiry"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <Textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="How can we help you?"
                    className="min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Map Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-medium mb-6 text-center">Find Us</h2>
            <div className="rounded-xl overflow-hidden shadow-hotel-card h-[400px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3571.5378703511213!2d85.92387491541372!3d26.463845184156933!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec4105b15e7e75%3A0xb7fa3fde67987faa!2sJanakpur%2C%20Nepal!5e0!3m2!1sen!2sus!4v1656789012345!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Royal Palace Hotel location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Contact;
