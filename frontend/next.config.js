/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5432/api/:path*'
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
