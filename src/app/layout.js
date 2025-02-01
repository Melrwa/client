"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { checkSession } from "./lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function fetchSession() {
      const user = await checkSession();
      if (user) setRole(user.role);
    }
    fetchSession();
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Angelic Beauty</title>
        <meta name="description" content="Salon & Spa service booking platform" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation */}
        <nav className="bg-[#800020] text-white p-4 flex justify-between">
          <div className="text-lg font-bold">
            <Link href="/">Angelic Beauty</Link>
          </div>
          <div className="space-x-4">
            {role === "admin" && <Link href="/adminhomepage">Admin Dashboard</Link>}
            {role === "user" && <Link href="/memberhomepage">Member Homepage</Link>}
            {!role && <Link href="/login">Login</Link>}
          </div>
        </nav>

        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
