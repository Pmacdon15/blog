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
  };
  
  export default nextConfig;
  