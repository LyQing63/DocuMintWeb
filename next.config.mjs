/** @type {import('next').NextConfig} */
const nextConfig = {
    // ...其他配置
    output: "standalone",
    images: {
        unoptimized: true,
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },

    async headers() {
        return [
            {
                // Apply these headers to all routes in your application.
                source: "/:path*",
                headers: [
                    { key: "Access-Control-Allow-Origin", value: "*" },
                ],
            },
        ];
    },

    async rewrites() {
        return [
            {
                source: '/user/:slug*',
                destination: `http://47.116.168.31:8080/api/:slug*`,
            }
        ]
    },
};

export default nextConfig;
