/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true, // Errors ආවත් අනිවාර්යයෙන් Build කරයි
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};
export default nextConfig;
