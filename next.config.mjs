/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/arqdev-site',
  assetPrefix: '/arqdev-site/',
  images: { unoptimized: true },
  trailingSlash: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
