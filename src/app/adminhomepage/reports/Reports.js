"use client";
import { useEffect, useState } from "react";

export default function ReportsDashboard() {
    const [reports, setReports] = useState({
        dailyRevenue: 0,
        weeklyRevenue: 0,
        monthlyRevenue: 0,
        mostBookedStaff: [],
        mostBookedService: [],
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);  // Track loading state

    useEffect(() => {
        fetch("/api/reports")
            .then((res) => res.json())
            .then((data) => {
                console.log("API Response:", data);
                if (data.error) {
                    setError(data.error);
                } else {
                    setReports(data);
                }
            })
            .catch((err) => {
                console.error("Error fetching reports:", err);
                setError("Failed to fetch report data.");
            })
            .finally(() => {
                setLoading(false);  // Set loading to false after the data is fetched
            });
    }, []);

    if (loading) {
        return (
            <div className="bg-[#800020] min-h-screen p-6 text-white text-center">
                <h2 className="text-3xl font-bold mb-6">Loading Reports...</h2>
            </div>
        );
    }

    return (
        <div className="bg-[#800020] min-h-screen p-6 text-white">
            <h2 className="text-3xl font-bold mb-6 text-left">Reports Dashboard</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Daily Revenue */}
                <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Daily Revenue</h3>
                    <p className="text-2xl">${reports.dailyRevenue}</p>
                </div>

                {/* Weekly Revenue */}
                <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Weekly Revenue</h3>
                    <p className="text-2xl">${reports.weeklyRevenue}</p>
                </div>

                {/* Monthly Revenue */}
                <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
                    <p className="text-2xl">${reports.monthlyRevenue}</p>
                </div>

                {/* Most Booked Staff */}
                <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Most Booked Staff</h3>
                    {Array.isArray(reports.mostBookedStaff) && reports.mostBookedStaff.length > 0 ? (
                    <ul className="space-y-2">
                        {reports.mostBookedStaff.map((staff, index) => (
                            <li key={index}>
                                {staff.name} - {staff.count} bookings
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No data available.</p>
                )}
                </div>

                {/* Most Booked Service */}
                <div className="bg-red-900 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold mb-4">Most Booked Service</h3>
                                {Array.isArray(reports.mostBookedService) && reports.mostBookedService.length > 0 ? (
                    <ul className="space-y-2">
                            {reports.mostBookedService.map((service, index) => (
                                <li key={index}>
                                    {service.name} - {service.count} bookings
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No data available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
