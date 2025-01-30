// "use client";
// import Link from "next/link";

// export default function AdminHomepage() {
//   return (
//     <div className="flex min-h-screen bg-[#800020] text-white">
//       {/* Sidebar */}
//       <aside className="w-64 bg-red-900 p-6 shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h2>
//         <nav className="space-y-4">
//           <Link href="/admin-homepage/services" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             Manage Services
//           </Link>
//           <Link href="/admin-homepage/addservice" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             Add Service
//           </Link>
//           <Link href="/admin-homepage/staff" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             Manage Staff
//           </Link>
//           <Link href="/admin-homepage/reviews" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             View Reviews & Ratings
//           </Link>
//           <Link href="/admin-homepage/transactions" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             Manage Transactions
//           </Link>
//           <Link href="/admin-homepage/reports" className="block p-2 bg-[#a52a2a] rounded hover:bg-red-700 transition">
//             Generate Reports
//           </Link>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-bold">Welcome, Admin</h1>
//         <p className="text-gray-200 mt-2">Manage your beauty shop with ease.</p>

//         {/* Admin Actions */}
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
//           <Link href="/admin-homepage/services" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             📋 View All Services
//           </Link>
//           <Link href="/admin-homepage/addservice" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             ➕ Add a Service
//           </Link>
//           <Link href="/admin-homepage/staff" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             👨‍💼 Manage Staff
//           </Link>
//           <Link href="/admin-homepage/reviews" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             ⭐ View Reviews
//           </Link>
//           <Link href="/admin-homepage/transactions" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             💳 Manage Transactions
//           </Link>
//           <Link href="/admin-homepage/reports" className="p-4 bg-[#a52a2a] rounded-lg shadow hover:bg-red-700 transition">
//             📊 Generate Reports
//           </Link>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminHomePage() {
  const router = useRouter();
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Fetch the admin's username from localStorage (Replace with API check later)
    const username = localStorage.getItem("username");
    const role = localStorage.getItem("role"); // Assuming role is stored

    if (!username || role !== "admin") {
      router.push("/login"); // Redirect non-admin users
    } else {
      setAdminName(username);
    }
  }, [router]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-1/4 bg-[#800020] text-white p-6">
        <h1 className="text-2xl font-bold text-center mb-6">⚙️ Admin Panel</h1>
        <ul className="space-y-4">
          <li>
            <a href="/adminhomepage/servicess" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              📋 Manage Services
            </a>
          </li>
          <li>
            <a href="/adminhomepage/addservice" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ➕ Add Service
            </a>
          </li>
          <li>
            <a href="/adminhomepage/deleteservice" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ❌ Delete Service
            </a>
          </li>
          <li>
            <a href="/adminhomepage/staff" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              👨‍💼 Manage Staff
            </a>
          </li>
          <li>
            <a href="/adminhomepage/addstaff" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ➕ Add Staff
            </a>
          </li>
          <li>
            <a href="/adminhomepage/deletestaff" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ❌ Delete Staff
            </a>
          </li>
          <li>
            <a href="/adminhomepage/reviews" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ⭐ View Reviews
            </a>
          </li>
          <li>
            <a href="/adminhomepage/transactions" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              💳 Manage Transactions
            </a>
          </li>
          <li>
            <a href="/adminhomepage/addtransaction" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              ➕ Add Transaction
            </a>
          </li>
          <li>
            <a href="/adminhomepage/reports" className="block py-2 px-4 bg-red-700 rounded hover:bg-red-600">
              📊 Generate Reports
            </a>
          </li>
          <li>
            <button 
              className="w-full py-2 px-4 bg-gray-800 rounded hover:bg-gray-700 mt-6"
              onClick={() => {
                localStorage.removeItem("username");
                localStorage.removeItem("role");
                router.push("/login");
              }}
            >
              🚪 Logout
            </button>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-[#816b70]">
        <h2 className="text-3xl font-bold text-[#800020]">👋 Welcome, {adminName}!</h2>
        <p className="mt-2 text-lg">Manage the beauty shop efficiently.</p>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-bold text-[#800020]">💆 Total Services</h3>
            <p className="text-2xl">12</p> {/* Dynamic later */}
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-bold text-[#800020]">👨‍💼 Total Staff</h3>
            <p className="text-2xl">8</p> {/* Dynamic later */}
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="text-xl font-bold text-[#800020]">💰 Today's Transactions</h3>
            <p className="text-2xl">$250</p> {/* Dynamic later */}
          </div>
        </div>
      </main>
    </div>
  );
}
