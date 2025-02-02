"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Next.js navigation
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // Import icons for menu

export default function MemberHomepage() {
  const images = [
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738382545/space-bun-and-bangs_ugfrzx.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738382544/61qkKnEFNlL._AC_UF1000_1000_QL80__juhd85.jpg", 
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738380259/2d4f9096e75d899bc596822f88f09d0b_wmezx7.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738380252/ff992ce09b188f889b6f4a89a504d23a_qlhdwc.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738379980/SNI_SpaServiceCategories_FACIALS-1024x768_aximgm.jpg", 
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738379980/hot-rocks-massage-horz-1024x768_dd3dlk.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1738382545/67ca27e22eda7b1b1199558655d6ac08_yeu0sn.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1737975635/Curly-Afro-Prom-Hairstylee_atjead.jpg", 
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1737975641/natural-hairstyles-for-black-girls-1920x1080_hjywx2.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1737975036/df39751429b14fc78a27cee0b21c2802_nxnd7y.jpg",
    "https://res.cloudinary.com/dmnytetf0/image/upload/v1737975640/stunning-waves-and-curls-on-a-black-pixie-cut_sn1crq.jpg"
    
  
  
  
  ];
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
      <aside className={`bg-red-900 h-screen fixed top-0 left-0 p-6 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <h1 className="text-xl font-bold mb-6 pl-8 transition-opacity duration-300">
          Angelic Beauty & Spa
        </h1>
        <ul className="space-y-4 pl-8">
          <li><Link href="/memberhomepage" className="block hover:text-gray-300">🏠 Home</Link></li>
          <li><Link href="/memberhomepage/bookservice" className="block hover:text-gray-300">📅 Book Service</Link></li>
          <li><Link href="/memberhomepage/staffs" className="block hover:text-gray-300">👨‍⚕️ Our Staffs</Link></li>
        </ul>
        <div className="mt-auto pl-8">
          {isLoggedIn ? (
            <button className="bg-gray-800 px-4 py-2 rounded hover:bg-gray-700 w-full mt-6" onClick={handleLogout}>
              🚪 Logout
            </button>
          ) : (
            <Link href="/login" className="bg-gray-800 px-4 py-2 rounded block text-center mt-6">🔑 Login</Link>
          )}
        </div>
      </aside>

      {/* Hamburger Icon (Fixed at top left) */}
      <button
        className="absolute top-1 left-4 bg-red-700 p-2 rounded z-50"
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
          transition={{ duration: 4 }}
        />
      </div>
    </div>
  );
}
