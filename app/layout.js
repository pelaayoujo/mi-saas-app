import './globals.css'
import Providers from './providers'

export const metadata = {
  title: 'LinkedAI · La IA que Revoluciona tu LinkedIn',
  description: 'Convierte tu perfil en una máquina de oportunidades. LinkedAI genera contenido viral, imágenes impactantes y estrategias que multiplican conexiones, visibilidad y oportunidades laborales.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

