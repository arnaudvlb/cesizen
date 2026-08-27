/** @type {import('next').NextConfig} */
const apiUrl = process.env.API_URL ?? "http://localhost:8000";

const nextConfig: import('next').NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;