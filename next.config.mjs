/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
            port: '',
            pathname: '/**', // This allows all paths from Google Drive
          },
        ],
      },
};

export default nextConfig;
