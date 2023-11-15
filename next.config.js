/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'tailwindui.com',
      'images.unsplash.com',
      'mye-commerce.storage.iran.liara.space',
    ],
  },
  // webpack: (config) => {
  //   config.externals = [...config.externals, 'bcrypt']
  //   return config
  // },
}

module.exports = nextConfig
