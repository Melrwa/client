"use client";
import { useEffect, useState } from "react";

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

  // Handle service deletion
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this service?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/services/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete service");
      }

      // Remove the deleted service from UI
      setServices((prevServices) => prevServices.filter((service) => service.id !== id));
    } catch (err) {
      console.error("Error deleting service:", err);
      alert("Failed to delete service. Please try again.");
    }
  };

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
  }
  return (
    <div className="bg-[#800020] min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Panel - Manage Services</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-red-900 rounded-2xl shadow-lg flex flex-col items-center p-4">
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
              <p className="text-gray-300 text-center">Time Taken: {service.time_taken} hours</p>
  
              {/* Delete Button */}
              <button
                onClick={() => handleDelete(service.id)}
                className="mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-lg w-full"
              >
                Delete Service
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}  