/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com'],
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'bcrypt']
  //   return config
  // },
}

module.exports = nextConfig
