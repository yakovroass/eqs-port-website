/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  async headers() {
    const out = [];
    /* בפיתוח על http://localhost — upgrade-insecure-requests עלול לשבור טעינת SVG/משאבים */
    if (process.env.NODE_ENV === "production") {
      out.push({
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "upgrade-insecure-requests",
          },
        ],
      });
    }
    return [
      ...out,
      // דף הבית — must-revalidate כדי שעדכונים אחרי deploy יופיעו מהר (לא cache ישן)
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      // SVG אוניות — CDN/דפדפן לא יאחזו גרסה ישנה שבועות; ?v= בקוד + כאן revalidate
      {
        source: "/ship-refs/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
      {
        source: "/bg-demos",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
