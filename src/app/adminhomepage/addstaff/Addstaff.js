"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStaff() {
  const [formData, setFormData] = useState({
    name: "",
    picture: "",
    gender: "",
    role: "stylist", // Default role set to stylist
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

    console.log("Submitting role:", formData.role); // Debug role before sending

    try {
      const response = await fetch("/api/staff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          picture: formData.picture,
          gender: formData.gender,
          role: formData.role.toLowerCase(), // Ensure lowercase consistency
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Staff added successfully!");
        setFormData({ name: "", picture: "", gender: "", role: "stylist" });
      } else {
        setMessage(`❌ ${data.message || "Failed to add staff"}`);
      }
    } catch (error) {
      console.error("Add staff error:", error);
      setMessage("❌ Error adding staff. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#800020] min-h-screen flex items-center justify-center p-6 text-white">
      <div className="bg-red-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Staff</h2>
        {message && <p className="text-center text-gray-200">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Staff Name */}
          <div>
            <label className="block text-gray-200">Staff Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            />
          </div>

          {/* Picture URL */}
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

          {/* Image Preview */}
          {formData.picture && (
            <div className="w-full flex justify-center mt-4">
              <img
                src={formData.picture}
                alt="Preview"
                className="h-32 w-32 object-cover rounded border-2 border-white shadow-lg"
              />
            </div>
          )}

          {/* Gender Dropdown */}
          <div>
            <label className="block text-gray-200">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-gray-200">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none"
            >
              <option value="stylist">Stylist</option>
              <option value="barber">Barber</option>
              <option value="spa_therapist">Spa Therapist</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 bg-[#800020] hover:bg-red-700 text-white font-bold rounded-lg transition duration-200"
          >
            {loading ? "Adding..." : "Add Staff"}
          </button>
        </form>
      </div>
    </div>
  );
}
