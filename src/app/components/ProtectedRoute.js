"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "../lib/auth";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verifyAccess() {
      const user = await checkSession();

      if (!user) {
        router.replace("/login"); 
        return;
      }

      if (adminOnly && user.role !== "admin") {
        router.replace("/memberhomepage"); 
        return;
      }

      setAuthorized(true);
    }

    verifyAccess().finally(() => setLoading(false));
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

  return authorized ? children : null;
}
