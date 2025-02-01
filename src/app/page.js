"use client";
import { useState, useEffect } from "react";
import Services from "./servicess/services";

export default function HomePage() {
  const [services, setServices] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    fetch("/api/services") // Replace with actual backend API
      .then((response) => response.json())
      .then((data) => setServices(data))
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-red-900 text-white py-4 px-6 flex justify-between items-center fixed top-0 w-full z-50">
        <div className="flex items-center space-x-4">
          <img
            src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737978615/Screenshot_from_2025-01-27_14-49-01_slb5ux.png"
            alt="Logo"
            className="h-16"
          />
          <span className="text-4xl font-extrabold" style={{ fontFamily: "'Dancing Script', cursive", letterSpacing: "2px" }}>
            Angelic BeautyShop & Spa
          </span>
        </div>
        <div className="flex space-x-4">
          <a href="#services" className="hover:text-gray-300 transition duration-300">Services</a>
          <a href="#about" className="hover:text-gray-300 transition duration-300">About Us</a>
          <a href="#contact" className="hover:text-gray-300 transition duration-300">Contact Us</a>
          <a href="/login" className="hover:text-gray-300 transition duration-300">Login</a>
        </div>
      </nav>

      {/* Hero Section with Image Slider */}
      <section className="relative w-full h-screen bg-gray-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="w-full h-full flex animate-slide">
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738382544/pony-styles-2_1600x_kibadz.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738382544/61qkKnEFNlL._AC_UF1000_1000_QL80__juhd85.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975640/stunning-waves-and-curls-on-a-black-pixie-cut_sn1crq.jpg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738380250/bde111270e5104f7bc12a71f361c54f0_p0ljkn.jpg"
              alt="Slide 4"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737975636/IMG_8943_jmmldw.jpg"
              alt="Slide 5"
              className="w-full h-full object-cover"
            />
            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1737993063/WhatsApp_Image_2025-01-27_at_6.41.36_PM_torohr.jpg"
              alt="Slide 6"
              className="w-full h-full object-cover"

            />



            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738380251/85e4c3348828f78df779b9b38235b7d8_zykbnj.jpg"
              alt="Slide 6"
              className="w-full h-full object-cover"

            />
             <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738379980/hot-rocks-massage-horz-1024x768_dd3dlk.jpg"
              alt="Slide 6"
              className="w-full h-full object-cover"

            />

            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738382544/pony-styles-2_1600x_kibadz.jpg"
              alt="Slide 6"
              className="w-full h-full object-cover"

            />

            <img
              src="https://res.cloudinary.com/dmnytetf0/image/upload/v1738380260/a67ae21c-efce-4376-a918-e9f3c7dc19b6.26b29763eb02a860b8404439c520fe08_ljvjpz.jpg"
              alt="Slide 6"
              className="w-full h-full object-cover"

            />


          
          







          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-6xl font-bold mb-4 text-red-700">Welcome to Angelic BeautyShop & Spa</h1>
          <h3 className="text-4xl text-red-700">Be The Angel You Are!</h3>
        </div>
      </section>

      {/* Services Section with "View More" Feature */}
      <section id="services" className="py-16 bg-red-900 text-center">
        <div className="bg-[#800020] p-6 text-white">
          <h2 className="text-3xl font-bold mb-4 text-red-700">Our Services</h2>

          {/* Show only 3 services initially */}
          <Services services={showAll ? services : services.slice(0, 3)} />

          {/* View More / View Less Button */}
          {services.length > 3 && (
            <button
              className="mt-4 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less" : "View More"}
            </button>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-[#800020] text-center text-white">
        <h2 className="text-3xl font-bold mb-4 text-red-700">About Us</h2>
        <p className="text-red-300 max-w-4xl mx-auto text-2xl">
          At BeautyShop, we offer a variety of salon and spa services, including hair plaiting, barber shop features, and more.
          Our experienced staff ensures you have the best experience.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-red-900 text-center text-white">
        <h2 className="text-3xl font-bold mb-4 text-red-700">Contact Us</h2>
        <p className="text-gray-300 text-2xl">Phone: +2547 7940 588 588</p>
        <p className="text-gray-300 text-2xl">Email: info@angelicbeautyshop.com</p>
        <p className="text-gray-300 text-2xl">Location: Eastern Bypass</p>
      </section>

      {/* Info Button for Membership Popup */}
      <button
        onClick={() => setShowPopup(true)}
        className="fixed bottom-6 right-6 px-4 py-2 bg-red-700 text-white rounded-md hover:bg-red-800"
      >
        Click for Info
      </button>

      {/* Membership Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-red-900">
              Want to be a member? Contact us at <br />
              <span className="font-bold">+2547 7940 588 588</span> <br />
              or email <span className="font-bold">info@angelicbeautyshop.com</span> <br />
              to register and enjoy faster bookings & membership offers.
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-900 text-white px-4 py-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
