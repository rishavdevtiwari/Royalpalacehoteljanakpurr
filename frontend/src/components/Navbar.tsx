import React from "react"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800">Royal Palace Hotel</Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <Link to="/rooms" className="text-gray-600 hover:text-gray-900">Rooms</Link>
          <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
          
          {user ? (
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                <User size={18} className="mr-1" />
                {user.name}
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">Register</Link>
            </div>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="text-gray-600 hover:text-gray-900 py-1">Home</Link>
            <Link to="/rooms" className="text-gray-600 hover:text-gray-900 py-1">Rooms</Link>
            <Link to="/about" className="text-gray-600 hover:text-gray-900 py-1">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-gray-900 py-1">Contact</Link>
            
            {user ? (
              <>
                <Link to="/profile" className="text-gray-600 hover:text-gray-900 py-1">Profile</Link>
                {user.role === 'ADMIN' && (
                  <Link to="/dashboard" className="text-gray-600 hover:text-gray-900 py-1">Dashboard</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="text-left text-gray-600 hover:text-gray-900 py-1 flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-gray-900 py-1">Login</Link>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 w-fit">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar