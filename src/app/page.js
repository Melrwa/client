"use client";
import { useState } from "react";

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-red-900 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737978615/Screenshot_from_2025-01-27_14-49-01_slb5ux.png" alt="Logo" className="h-16" />
          <span 
        className="text-4xl font-extrabold" 
        style={{
          fontFamily: "'Dancing Script', cursive", // Elegant beauty-related font
          letterSpacing: '2px',
        }}
      >
        Angelic BeautyShop & Spa
      </span>
        </div>
        <div className="flex space-x-4">
        <a href="/bookservice" className="hover:text-gray-300 transition duration-300">
        Book Service
      </a>
      <a href="/staffs" className="hover:text-gray-300 transition duration-300">
        Staffs
      </a>
      {isAuthenticated ? (
        <>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              // Add logout logic
            }}
            className="hover:text-gray-300 transition duration-300"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <a href="/login" className="hover:text-gray-300 transition duration-300">
            Login
          </a>
          <a href="/signup" className="hover:text-gray-300 transition duration-300">
            Sign Up
          </a>
        </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gray-100">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          {/* Image Slider */}
          <div className="w-full h-full flex animate-slide">
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737974826/68bec510ea6a30ec83df0d4c3edd0813_zdbrwc.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975036/df39751429b14fc78a27cee0b21c2802_nxnd7y.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975640/stunning-waves-and-curls-on-a-black-pixie-cut_sn1crq.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
               <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975635/Curly-Afro-Prom-Hairstylee_atjead.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
               <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975636/IMG_8943_jmmldw.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
               <img
              src='https://res.cloudinary.com/dmnytetf0/image/upload/v1737975635/long-big-afro-for-black-men_igmyni.jpg'
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Angelic BeautyShop & Spa</h1>
          <p className="text-lg">
          Be The Angel You Are!
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-200 text-center">
        <h2 className="text-3xl font-bold mb-4">About Us</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          At BeautyShop, we offer a variety of salon and spa services, including
          hair plaiting, barber shop features, and more. Our experienced staff
          ensures you have the best experience.
        </p>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-300 text-center">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <p className="text-gray-700">Phone: (123) 456-7890</p>
        <p className="text-gray-700">Email: info@beautyshop.com</p>
        <p className="text-gray-700">Location: 123 Beauty Lane, City</p>
      </section>
    </div>
  );
}
