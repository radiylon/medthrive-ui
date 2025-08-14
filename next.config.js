/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/patients',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
