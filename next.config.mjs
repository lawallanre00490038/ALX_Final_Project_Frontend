/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'res.cloudinary.com', 
      "moadunni.vercel.app",
      'assets.aceternity.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '', // No port for this domain
        pathname: '/**', // Allow all paths under this domain
      },
    ],
  },
};

export default nextConfig;
