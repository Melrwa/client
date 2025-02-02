"use client";
import { useEffect, useState } from "react";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [message, setMessage] = useState(null);

  const userId = 1; // Replace with dynamic user ID from authentication

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

  const handleRate = (staff) => {
    setSelectedStaff(staff);
    setMessage(null);
    setRating(0);
    setReview("");
  };

  const submitReview = async () => {
    if (!rating || !review) {
      alert("Please provide both a rating and a review.");
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        staff_id: selectedStaff.id,
        client_id: userId,
        rating,
        review,
      }),
    });

    if (res.ok) {
      setMessage("Review submitted successfully!");
      setSelectedStaff(null);
    } else {
      const errorData = await res.json();
      setMessage(errorData.error || "Failed to submit review.");
    }
  };

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
            <img
              src={staff.picture || "/default-avatar.png"}
              alt={staff.name}
              className="w-full rounded-2xl aspect-[4/3] object-cover"
            />
            <div className="w-full p-4">
              <h2 className="text-xl font-semibold text-center">{staff.name}</h2>
              <p className="text-gray-300 text-center capitalize">Role: {staff.role || "Not specified"}</p>
              <button 
                className="mt-2 bg-white text-red-900 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={() => handleRate(staff)}
              >
                Rate & Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Review Popup */}
      {selectedStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-center">Review {selectedStaff.name}</h2>
            <div className="flex justify-center space-x-2 my-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => setRating(num)}
                  className={`w-8 h-8 text-white text-sm font-bold flex items-center justify-center rounded ${
                    num === 1 ? "bg-black" : 
                    num === 2 ? "bg-gray-700" : 
                    num === 3 ? "bg-yellow-500" : 
                    num === 4 ? "bg-orange-500" : 
                    "bg-green-500"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            {rating > 0 && (
              <textarea
                className="w-full border p-2 mt-2"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            )}
            <div className="flex justify-between mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setSelectedStaff(null)}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={submitReview}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Message Popup */}
      {message && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded-lg shadow-lg">
          {message}
          <button className="ml-4 text-black font-bold" onClick={() => setMessage(null)}>X</button>
        </div>
      )}
    </div>
  );
}
