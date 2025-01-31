"use client";
import { useEffect, useState } from "react";

export default function AddTransaction() {
    const [formData, setFormData] = useState({
        service_id: "",
        staff_id: "",
        client_id: "",
        client_name: "",
        amount_paid: "",
        time_taken: "",
    });

    const [services, setServices] = useState([]);
    const [staff, setStaff] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/services")
            .then((res) => res.json())
            .then((data) => setServices(data))
            .catch((err) => console.error("Error fetching services:", err));

        fetch("/api/staff")
            .then((res) => res.json())
            .then((data) => setStaff(data))
            .catch((err) => console.error("Error fetching staff:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "service_id") {
            const selectedService = services.find((s) => s.id === parseInt(value));
            setFormData({
                ...formData,
                service_id: value,
                amount_paid: selectedService ? selectedService.price : "",
                time_taken: selectedService ? selectedService.time_taken : "",
            });
        } else {
          setFormData({
            ...formData,
            [name]: value ? value.trim() : "",  // Ensure it is always a string
        });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setMessage(`Error: ${data.error}`);
                } else {
                    setMessage("Transaction added successfully!");
                    setFormData({
                        service_id: "",
                        staff_id: "",
                        client_id: "",
                        client_name: "",
                        amount_paid: "",
                        time_taken: "",
                    });
                }
            })
            .catch((err) => console.error("Error adding transaction:", err));
    };

    return (
        <div className="bg-[#800020] min-h-screen flex items-center justify-center p-6 text-white">
            <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Add Transaction</h2>
                {message && <p className="text-center text-gray-200">{message}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Service Dropdown */}
                    <div>
                        <label className="block text-gray-200">Service</label>
                        <select
                            name="service_id"
                            value={formData.service_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        >
                            <option value="">Select Service</option>
                            {services.map((service) => (
                                <option key={service.id} value={service.id}>
                                    {service.name} - ${service.price}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Staff Dropdown */}
                    <div>
                        <label className="block text-gray-200">Staff</label>
                        <select
                            name="staff_id"
                            value={formData.staff_id}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        >
                            <option value="">Select Staff</option>
                            {staff.map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.name} - {s.role}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Client Name (Required) */}
                    <div>
                        <label className="block text-gray-200">Client Name</label>
                        <input
                            type="text"
                            name="client_name"
                            value={formData.client_name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        />
                    </div>

                    {/* Client ID (Optional) */}
                    <div>
                        <label className="block text-gray-200">Client ID (Optional)</label>
                        <input
                            type="number"
                            name="client_id"
                            value={formData.client_id}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
                        />
                    </div>

                    {/* Amount Paid (Auto-Filled) */}
                    <div>
                        <label className="block text-gray-200">Amount Paid</label>
                        <input
                            type="number"
                            name="amount_paid"
                            value={formData.amount_paid}
                            readOnly
                            required
                            className="w-full p-2 rounded bg-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Time Taken (Auto-Filled) */}
                    <div>
                        <label className="block text-gray-200">Time Taken (Hours)</label>
                        <input
                            type="number"
                            name="time_taken"
                            value={formData.time_taken}
                            readOnly
                            required
                            className="w-full p-2 rounded bg-gray-800 text-gray-400 border border-gray-600 cursor-not-allowed"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full p-2 bg-[#800020] hover:bg-red-700 text-white font-bold rounded-lg transition duration-200"
                    >
                        Add Transaction
                    </button>
                </form>
            </div>
        </div>
    );
}
