/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? `${process.env.NEXT_PUBLIC_DB_BASE_URL}/api/:path*`
            : '/api/',
      },
    ]
  },
  output: `standalone`,
  webpack: (config) => {
    // Add loader for video files
    config.module.rules.push({
      test: /\.(mp4)$/,
      type: 'asset/resource',
    });
    return config;
  },
};

module.exports = nextConfig;
