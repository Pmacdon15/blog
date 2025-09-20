/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_BLOB_STORE}`,
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tanstack.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    ppr: "incremental",
  }
};

export default nextConfig;
