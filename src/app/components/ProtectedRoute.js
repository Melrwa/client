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
        router.replace("/login"); // Redirect if not logged in
        return;
      }

      if (adminOnly && user.role !== "admin") {
        router.replace("/memberhomepage"); // FIXED: Redirect user (not "member")
        return;
      }

      setAuthorized(true);
    }

    verifyAccess().finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return authorized ? children : null;
}
