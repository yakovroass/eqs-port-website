/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "upgrade-insecure-requests" },
        ],
      },
      // רק דף הבית — לא לשמור במטמון, כדי שלחיצה על הקישור תציג תמיד גרסה עדכנית
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
