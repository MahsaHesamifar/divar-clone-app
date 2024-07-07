module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "divar-apis.liara.run",
        pathname: "**",
      },
    ],
  },
};
