/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
      return [
        {
          source: "/api/:path*", // Proxy all requests starting with /api
          destination: "http://127.0.0.1:5555/:path*", // Replace with your Flask API base URL
        },
      ];
    },
  };
  
  export default nextConfig;
  