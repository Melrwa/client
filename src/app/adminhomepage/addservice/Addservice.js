"use client"; 
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddService() {
  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    price: "",
    time_taken: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get user details from localStorage
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role");

    if (!username || role !== "admin") {
      router.replace("/login"); // Redirect to login if not an admin
    } else {
      setUser({ username, role });
    }
  }, []);

  if (user === null) {
    return <p className="text-center text-white">Checking authentication...</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    // Ensure price and time_taken are numbers
    const price = parseFloat(formData.price);
    const timeTaken = parseFloat(formData.time_taken);

    if (isNaN(price) || isNaN(timeTaken) || price <= 0 || timeTaken <= 0) {
      setMessage("Please enter valid numbers for price and time taken.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/services", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          picture: formData.picture,
          price: price,
          time_taken: timeTaken,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Service added successfully!");
        setFormData({ name: "", picture: "", price: "", time_taken: "" });
      } else {
        setMessage(`❌ ${data.message || "Failed to add service"}`);
      }
    } catch (error) {
      console.error("Add service error:", error);
      setMessage("❌ Error adding service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#800020] min-h-screen flex items-center justify-center p-6 text-white">
      <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Service</h2>
        {message && <p className="text-center text-gray-200">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-200">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-200">Picture URL</label>
            <input
              type="text"
              name="picture"
              value={formData.picture}
              onChange={(e) => setFormData({ ...formData, picture: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </div>

          {formData.picture && (
            <div className="w-full flex justify-center mt-4">
              <img
                src={formData.picture}
                alt="Preview"
                className="h-32 w-32 object-cover rounded border-2 border-white shadow-lg"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-200">Price (USD)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-200">Time Taken (Hours)</label>
            <input
              type="number"
              name="time_taken"
              value={formData.time_taken}
              onChange={(e) => setFormData({ ...formData, time_taken: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-[#800020] hover:bg-red-700 text-white font-bold rounded-lg transition duration-200"
          >
            {loading ? "Adding..." : "Add Service"}
          </button>
        </form>
      </div>
    </div>
  );
}
