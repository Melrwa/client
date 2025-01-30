"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch("/api/services");
        if (!res.ok) {
          throw new Error("Failed to fetch services");
        }
        const data = await res.json();
        setServices(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Auto-slide effect for images
  useEffect(() => {
    if (services.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % services.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [services]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-900 text-white">
        <h1 className="text-2xl animate-pulse">Loading services...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        <h1 className="text-2xl">{error}</h1>
      </div>
    );

  }return (
  <div className="bg-[#800020] min-h-screen p-6 text-white">
    <h1 className="text-3xl font-bold text-center mb-6">Our Services</h1>
    <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-red-900 rounded-2xl shadow-lg flex flex-col items-center p-4"
        >
          {/* Service Image */}
          <img
            src={service.picture}
            alt={service.name}
            className="w-full rounded-2xl aspect-[4/3] object-contain"
          />

          {/* Service Details */}
          <div className="w-full p-4">
            <h2 className="text-xl font-semibold text-center">{service.name}</h2>
            <p className="text-gray-200 mt-2 text-center">
              Price: <span className="font-bold">${service.price}</span>
            </p>
            <p className="text-gray-300 text-center">
              Time Taken: {service.time_taken}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}