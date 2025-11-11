/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
    ],
    unoptimized: false,
  },
  // ISR 默认重新验证时间（秒）
  revalidate: 3600,
};

module.exports = nextConfig;

