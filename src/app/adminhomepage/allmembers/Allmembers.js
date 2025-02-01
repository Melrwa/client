"use client";
import { useState, useEffect } from "react";

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/members", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.members);
        setTotalMembers(data.total_members);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setLoading(false);
      });
  }, []);

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

  return (
  <div className="p-6 bg-[#800020] text-white min-h-screen">
    <h2 className="text-3xl font-bold text-red-700 mb-4">All Members</h2>
    <p className="text-lg mb-4">Total Members: <span className="font-bold">{totalMembers}</span></p>

    <div className="p-4 rounded-lg shadow-lg overflow-x-auto bg-red-900">
      <table className="w-full border-collapse text-white">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="border border-red-800 px-4 py-2">Member Name</th>
            <th className="border border-red-800 px-4 py-2">Email</th>
            <th className="border border-red-800 px-4 py-2">Times Served</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member, index) => (
            <tr key={member.id} className={index % 2 === 0 ? "bg-[#800020]" : "bg-red-900"}>
              <td className="border border-red-800 px-4 py-2">{member.name}</td>
              <td className="border border-red-800 px-4 py-2">{member.email}</td>
              <td className="border border-red-800 px-4 py-2 text-center">{member.total_visits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}