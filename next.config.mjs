/** @type {import('next').NextConfig} */
<<<<<<< Updated upstream
const nextConfig = {};

export default nextConfig;
=======
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
  
>>>>>>> Stashed changes
