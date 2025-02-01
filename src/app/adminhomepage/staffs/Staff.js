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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this staff member?")) {
      return;
    }

    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete staff member");
      }

      // Optimistic UI update: Remove staff member from state
      setStaff((prevStaff) => prevStaff.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#800020]">
        <div className="flex space-x-2">
          <div className="w-5 h-5 bg-red-300 rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-red-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-5 h-5 bg-red-700 rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
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
          <div
            key={staff.id}
            className="bg-red-900 rounded-2xl shadow-lg flex flex-col items-center p-4"
          >
            {/* Staff Image */}
            <img
              src={staff.picture || "/default-avatar.png"}
              alt={staff.name}
              className="w-full rounded-2xl aspect-[4/3] object-cover"
            />

            {/* Staff Details */}
            <div className="w-full p-4 text-center">
              <h2 className="text-xl font-semibold">{staff.name}</h2>
              <p className="text-gray-300 capitalize">
                Gender: {staff.gender || "Not specified"}
              </p>
              <p className="text-gray-300 capitalize">
                Role: {staff.role || "Not specified"}
              </p>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(staff.id)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
