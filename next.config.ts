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
    ],
  },
  experimental: {
    ppr: "incremental",
  }
};

export default nextConfig;
