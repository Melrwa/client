"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import icons for menu

export default function MemberHomepage() {
  const images = ["/images/spa1.jpg", "/images/spa2.jpg", "/images/spa3.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Controls sidebar visibility
  const router = useRouter(); // Next.js navigation

  useEffect(() => {
    // Check if user is logged in
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username);

    // Auto image slider
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Logout successful");

        // Remove user details from local storage
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        // Redirect to login page
        setIsLoggedIn(false);
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#800020] text-white relative">
      {/* Sidebar */}
      <aside className={`bg-red-900 p-6 h-screen fixed ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden transition-all duration-300`}>
        <h1 className="text-2xl font-bold mb-6">Angelic Beauty & Spa</h1>
        <ul className="space-y-4">
          <li><Link href="/memberhomepage" className="block hover:text-gray-300">🏠 Home</Link></li>
          <li><Link href="/memberhomepage/bookservice" className="block hover:text-gray-300">📅 Book Service</Link></li>
          <li><Link href="/memberhomepage/staffs" className="block hover:text-gray-300">👨‍⚕️ Our Staffs</Link></li>
        </ul>
        <div className="mt-auto">
          {isLoggedIn ? (
            <button
              className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 w-full mt-6"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          ) : (
            <Link href="/login" className="bg-gray-800 px-4 py-2 rounded block text-center mt-6">🔑 Login</Link>
          )}
        </div>
      </aside>

      {/* Hamburger Icon (Fixed at top left) */}
      <button
        className="absolute top-4 left-4 bg-gray-800 p-2 rounded z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex justify-center items-center ml-20">
        <motion.img 
          key={images[currentImage]} 
          src={images[currentImage]} 
          alt="Spa" 
          className="w-[600px] h-[400px] rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </div>
    </div>
  );
}
