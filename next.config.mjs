/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: '**',
    //         port: '',
    //         pathname: '/**', // This allows all paths from Google Drive
    //       },
    //     ],
    //   },

    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'healthful-bb936.appspot.com',
    //         port: '',
    //         search:'',
    //       },
    //     ],
    //   },

    // images: {
    //     domains: ['healthful-bb936.appspot.com'],
    //   },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
