"use client";
import { useEffect, useState } from "react";

export default function Booking() {
  const [services, setServices] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    service_id: "",
    staff_id: "",
    booking_time: "",
  });

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

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const res = await fetch("/api/staff");
        if (!res.ok) {
          throw new Error("Failed to fetch staff");
        }
        const data = await res.json();
        setStaff(data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      }
    };

    fetchStaff();
  }, []);

  const handleBookClick = (service) => {
    setSelectedService(service);
    setBookingDetails((prev) => ({ ...prev, service_id: service.id }));
    setShowBookingForm(true);
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!res.ok) {
        throw new Error("Failed to create booking");
      }

      alert("Booking successful!");
      setShowBookingForm(false);
    } catch (err) {
      console.error("Booking error:", err);
      alert("Error creating booking.");
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
    <div className="bg-red-900 min-h-screen p-6 text-red-900">
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
              <h2 className="text-xl font-semibold text-center text-white">{service.name}</h2>
              <p className="text-gray-200 mt-2 text-center">
                Price: <span className="font-bold">${service.price}</span>
              </p>
              <p className="text-gray-300 text-center">
                Time Taken: {service.time_taken}
              </p>

              {/* Book Button */}
              <button
                className="mt-4 px-4 py-2 bg-white text-red-900 rounded-md hover:bg-red-700 hover:text-white"
                onClick={() => handleBookClick(service)}
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Popup */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-900">Book {selectedService?.name}</h2>
            <form onSubmit={handleBookingSubmit} className="flex flex-col space-y-4">
              {/* Service ID (Hidden) */}
              <input type="hidden" name="service_id" value={bookingDetails.service_id} />

              {/* Staff Selection */}
              <label className="text-gray-800">Select Staff</label>
              <select
                name="staff_id"
                value={bookingDetails.staff_id}
                onChange={handleBookingChange}
                required
                className="p-2 border rounded-md"
              >
                <option value="">Select a Staff Member</option>
                {staff.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>

              {/* Booking Date & Time */}
              <label className="text-gray-800">Select Date & Time</label>
              <input
                type="datetime-local"
                name="booking_time"
                value={bookingDetails.booking_time}
                onChange={handleBookingChange}
                required
                className="p-2 border rounded-md"
              />

              {/* Submit & Cancel Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setShowBookingForm(false)}
                  className="bg-gray-400 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-red-900 text-white px-4 py-2 rounded-md">
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
