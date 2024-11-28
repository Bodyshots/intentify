import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.jsx'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
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

export default withNextra(nextConfig);