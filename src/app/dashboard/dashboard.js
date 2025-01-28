"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          setMessage(data.message || `Welcome, User ID: ${data.user_id}!`);
        } else {
          // Redirect to home if not authenticated
          throw new Error("Not authenticated");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setMessage("Session expired or not authenticated. Redirecting to home...");
        setTimeout(() => router.push("/homepage"), 2000);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl text-gray-600 animate-pulse">
          Checking your session...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">{message}</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => router.push("/profile")}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          View Profile
        </button>
        <button
          onClick={() => router.push("/settings")}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          Settings
        </button>
        <button
          onClick={() => router.push("/logout")}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
