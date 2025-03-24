/** @type {import('next').NextConfig} */
const nextConfig = {
 
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 's3-alpha-sig.figma.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'www.ravishly.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'cdn2.psychologytoday.com',
            pathname: '**',
          },
           {
            protocol: 'https',
            hostname: 'www.shutterstock.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'media.istockphoto.com',
            pathname: '**',
          },
          {
            protocol: 'https',
            hostname: 'res.cloudinary.com',
            pathname: '**',
          },
        ],
      },
};

export default nextConfig;
