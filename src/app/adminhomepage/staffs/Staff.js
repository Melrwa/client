"use client";
import { useEffect, useState } from "react";

export default function Staff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(null); // Track which staff is being edited
  const [editData, setEditData] = useState({ name: "", picture: "", gender: "", role: "" });

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

      setStaff((prevStaff) => prevStaff.filter((s) => s.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (staff) => {
    setEditing(staff.id);
    setEditData({ name: staff.name, picture: staff.picture, gender: staff.gender, role: staff.role });
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await fetch(`/api/staff/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
           "Authorization": "Bearer your_jwt_token"
        },
        body: JSON.stringify(editData),
      });

      if (!res.ok) {
        throw new Error("Failed to update staff details");
      }

      const updatedStaff = await res.json();

      // Update state with new staff details
      setStaff((prevStaff) =>
        prevStaff.map((s) => (s.id === id ? { ...s, ...updatedStaff.staff } : s))
      );

      setEditing(null); // Exit edit mode
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
            <img
              src={staff.picture || "/default-avatar.png"}
              alt={staff.name}
              className="w-full rounded-2xl aspect-[4/3] object-cover"
            />

            <div className="w-full p-4 text-center">
              {editing === staff.id ? (
                <>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="w-full mb-2 p-2 text-black rounded"
                  />
                  <input
                    type="text"
                    value={editData.picture}
                    onChange={(e) => setEditData({ ...editData, picture: e.target.value })}
                    className="w-full mb-2 p-2 text-black rounded"
                  />
                  <select
                    value={editData.gender}
                    onChange={(e) => setEditData({ ...editData, gender: e.target.value })}
                    className="w-full mb-2 p-2 text-black rounded"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <select
                    value={editData.role}
                    onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                    className="w-full mb-2 p-2 text-black rounded"
                  >
                    <option value="stylist">Stylist</option>
                    <option value="barber">Barber</option>
                    <option value="spa_therapist">Spa Therapist</option>
                  </select>
                  <button onClick={() => handleSaveEdit(staff.id)} className="bg-green-500 p-2 rounded">Save</button>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{staff.name}</h2>
                  <p>Gender: {staff.gender}</p>
                  <p>Role: {staff.role}</p>
                  {/* <button onClick={() => handleEdit(staff)} className="bg-green-500  p-2 rounded">Edit</button> */}
                  <button onClick={() => handleDelete(staff.id)} className="bg-red-600 p-2 rounded">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
