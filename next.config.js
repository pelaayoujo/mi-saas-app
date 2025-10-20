/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración simple para evitar problemas de deployment
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig

