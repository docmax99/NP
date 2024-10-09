/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'evapvrkechtafxfxpkvn.supabase.co',  // Korrigierte Domain
      },
    ],
  },
};

export default nextConfig;
