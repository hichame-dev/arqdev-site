/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/arqdev-site',
    assetPrefix: '/arqdev-site/',
    images: { unoptimized: true },
    trailingSlash: true,
};

export default nextConfig;
