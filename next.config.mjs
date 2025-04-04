/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 2678400, // 31 days
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'securea.mlb.com',
                port: '',
                pathname: '/mlb/images/players/head_shot/**',
            },
            {
                protocol: 'https',
                hostname: 'midfield.mlbstatic.com',
                port: '',
                pathname: '/v1/**',
            },
        ],
    },
};

export default nextConfig;
