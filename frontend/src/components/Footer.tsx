import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Royal Palace Hotel</h3>
          <p className="mb-4">Experience luxury and comfort in the heart of the city. Our award-winning service ensures your stay is memorable.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-blue-400"><Facebook size={20} /></a>
            <a href="#" className="text-white hover:text-pink-400"><Instagram size={20} /></a>
            <a href="#" className="text-white hover:text-blue-300"><Twitter size={20} /></a>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
            <li><Link to="/rooms" className="hover:text-gray-300">Rooms</Link></li>
            <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <MapPin size={18} className="mr-2" />
              <span>123 Hotel Street, City, Country</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-2" />
              <span>+1 (123) 456-7890</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-2" />
              <span>info@royalpalace.com</span>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
          <p className="mb-4">Subscribe to our newsletter for special offers and updates.</p>
          <form className="flex">
            <input 
              type="email" 
              placeholder="Your email" 
              className="px-4 py-2 text-gray-800 rounded-l focus:outline-none w-full"
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-6 text-center">
        <p>&copy; {currentYear} Royal Palace Hotel. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer