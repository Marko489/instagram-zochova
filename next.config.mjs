/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ["picsum.photos", "loremflickr.com"], // Add both external domains here
    },
  };

  export default nextConfig;




// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "picsum.photos",
//       },
//       {
//         protocol: "https",
//         hostname: "loremflickr.com",
//       },
//     ],
//   },
// };

// export default nextConfig;