"use client";
import { useEffect, useState } from "react";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-900 text-white">
        <h1 className="text-2xl animate-pulse">Loading staff...</h1>
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
      <h1 className="text-3xl font-bold text-center mb-6">Meet Our Staff</h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {staff.map((staff) => (
          <div key={staff.id} className="bg-red-900 rounded-2xl shadow-lg flex flex-col items-center p-4">
            {/* Staff Image */}
            <img
              src={staff.picture || "/default-avatar.png"}
              alt={staff.name}
              className="w-full rounded-2xl aspect-[4/3] object-cover"
            />

            {/* Staff Details */}
            <div className="w-full p-4">
              <h2 className="text-xl font-semibold text-center">{staff.name}</h2>
              <p className="text-gray-300 text-center capitalize">
                Gender: {staff.gender || "Not specified"}
              </p>
              <p className="text-gray-300 text-center capitalize">
                Role: {staff.role || "Not specified"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
