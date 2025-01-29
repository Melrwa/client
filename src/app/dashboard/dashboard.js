"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [message, setMessage] = useState("Checking session...");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/check_session", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          console.warn("User not authenticated. Redirecting...");
          throw new Error("Not authenticated");
        }

        const data = await res.json();
        setMessage(`Welcome, ${data.username || "User"}!`);
      } catch (error) {
        console.error("Session check failed:", error);
        handleRedirect();
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleRedirect = () => {
    setMessage("Session expired. Redirecting...");
    setTimeout(() => router.push("/homepage"), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl text-gray-600 animate-pulse">{message}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800">{message}</h1>
      <div className="flex space-x-4">
        {[
          { label: "View Profile", route: "/profile", color: "blue" },
          { label: "Settings", route: "/settings", color: "green" },
          { label: "Logout", route: "/logout", color: "red" },
        ].map(({ label, route, color }) => (
          <button
            key={route}
            onClick={() => router.push(route)}
            className={`bg-${color}-600 text-white px-4 py-2 rounded-lg hover:bg-${color}-700 transition`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
