/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/micro-app/:path*",
        destination: "http://localhost:3001/micro-app/:path*",
      },
      // Add a specific rewrite for the API endpoint
      {
        source: "/api/micro-app/:path*",
        destination: "http://localhost:3001/micro-app/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
