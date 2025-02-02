"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Bookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings from API
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#816b70] p-6">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-[#800020] text-center mb-6">
        📅 Bookings
      </h2>

      {/* Animated Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#800020] border-solid"></div>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-lg">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-[#800020] text-white">
                <th className="p-3 border border-gray-300">⏰ Time</th>
                <th className="p-3 border border-gray-300">👤 Client</th>
                <th className="p-3 border border-gray-300">💆 Service</th>
                <th className="p-3 border border-gray-300">👨‍💼 Staff</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={index} className="text-center hover:bg-gray-200">
                    <td className="p-3 border border-gray-300">{booking.booking_time}</td>
                    <td className="p-3 border border-gray-300">{booking.user}</td>
                    <td className="p-3 border border-gray-300">{booking.service}</td>
                    <td className="p-3 border border-gray-300">{booking.staff}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="p-4 text-center text-gray-600">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => router.push("/adminhomepage")}
          className="bg-[#800020] text-white py-2 px-6 rounded-lg hover:bg-red-700 transition"
        >
          ⬅️ Back to Admin Dashboard
        </button>
      </div>
    </div>
  );
}
