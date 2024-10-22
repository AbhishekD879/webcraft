/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: [
        {
          source: "/",
          destination: "/dashboard",
          permanent: true,
        },
      ],
      images:{
        remotePatterns:[
          {
            hostname:'utfs.io'
          }
        ]
      }
};

export default nextConfig;
