"use client"
import { useEffect, useState } from "react";

export default function StaffReviews() {
    const [staffReviews, setStaffReviews] = useState([]);

    useEffect(() => {
        fetch("http://127.0.0.1:5555/api/staff/reviews")
            .then((res) => res.json())
            .then((data) => setStaffReviews(data))
            .catch((err) => console.error("Error fetching staff reviews:", err));
    }, []);

    return (
        <div className="bg-[#800020] min-h-screen p-6 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">Staff Reviews</h1>
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                {staffReviews.map((staff) => (
                    <div key={staff.id} className="bg-red-900 rounded-2xl shadow-lg flex flex-col items-center p-4">
                        {/* Staff Image */}
                        <img
                            src={staff.picture}
                            alt={staff.name}
                            className="w-full rounded-2xl aspect-[4/3] object-cover"
                        />

                        {/* Staff Details */}
                        <div className="w-full p-4">
                            <h2 className="text-xl font-semibold text-center text-white">{staff.name} - {staff.role}</h2>
                            <p className="text-gray-200 mt-2 text-center">
                                Average Rating: <span className="font-bold">{staff.average_rating || "No ratings yet"}</span>
                            </p>

                            {/* Reviews Section */}
                            <div className="mt-4 bg-red-700 p-3 rounded-lg text-gray-200">
                                <h3 className="text-lg font-semibold text-center">Reviews</h3>
                                {staff.reviews.length > 0 ? (
                                    staff.reviews.map((review, index) => (
                                        <div key={index} className="mt-2 p-2 border border-red-600 rounded bg-red-800">
                                            <p className="font-semibold">{review.client}:</p>
                                            <p>{review.review}</p>
                                            <p className="text-sm text-gray-300">Rating: {review.rating}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-gray-300 text-center">No reviews yet</p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
