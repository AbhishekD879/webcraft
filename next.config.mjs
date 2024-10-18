/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: [
        {
          source: "/",
          destination: "/dashboard",
          permanent: true,
        },
      ],
};

export default nextConfig;
