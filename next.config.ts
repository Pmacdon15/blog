/** @type {import('next').NextConfig} */
const nextConfig = {
	cacheComponents: true,
	typedRoutes: true,
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
}

export default nextConfig
