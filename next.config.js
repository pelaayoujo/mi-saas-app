/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuración mínima para máxima estabilidad
  experimental: {
    memoryBasedWorkersCount: false,
  },
  // Configuración de imágenes
  images: {
    unoptimized: true,
  },
  // Configuración de webpack mínima
  webpack: (config, { dev }) => {
    if (dev) {
      // Configuración ultra simple
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
      // Deshabilitar optimizaciones que consumen memoria
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
        minimize: false,
      }
    }
    return config
  },
}

module.exports = nextConfig

