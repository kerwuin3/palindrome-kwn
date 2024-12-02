/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next/static/sounds/',
            outputPath: `${isServer ? '../' : ''}static/sounds/`,
            name: '[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;