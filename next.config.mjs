/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/v1/:path*',
				destination:
					'https://h5fivex-api-f483cf4d7ab3.herokuapp.com/api/v1/:path*',
			},
		];
	},
};

export default nextConfig;
