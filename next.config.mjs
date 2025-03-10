/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  //   reactStrictMode: false,
  //   ignoreDuringBuilds: true,
}

export default nextConfig
