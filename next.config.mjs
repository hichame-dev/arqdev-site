/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/projets", destination: "/#projets", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/a-propos", destination: "/#projets", permanent: true },
    ];
  },
};

export default nextConfig;
