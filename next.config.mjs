/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rfq6gnewacrjsrcy.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
