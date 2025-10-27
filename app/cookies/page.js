'use client';

import Link from 'next/link';
import '../legal.css';

export default function CookiesPage() {
  return (
    <div className="legal-page">
      {/* Navigation */}
      <nav className="legal-nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">LinkedAI</span>
          </Link>
          <div className="nav-links">
            <Link href="/login">Iniciar Sesión</Link>
            <Link href="/#trial">Comenzar Gratis</Link>
          </div>
        </div>
      </nav>

      <div className="legal-content">
        <div className="container">
          <h1>Política de Cookies</h1>
          <p className="last-updated">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

          <section>
            <h2>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita 
              nuestro sitio web. Estas cookies nos permiten reconocer su dispositivo y recordar información 
              sobre su visita, como sus preferencias de idioma y otras configuraciones.
            </p>
          </section>

          <section>
            <h2>2. ¿Cómo Utilizamos las Cookies?</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia en nuestro sitio web, analizar cómo utiliza 
              nuestros servicios y personalizar el contenido. Las cookies nos ayudan a:
            </p>
            <ul>
              <li>Recordar sus preferencias y configuraciones</li>
              <li>Mantener su sesión activa</li>
              <li>Analizar el tráfico y uso del sitio web</li>
              <li>Mejorar la funcionalidad y rendimiento</li>
              <li>Proporcionar contenido personalizado</li>
            </ul>
          </section>

          <section>
            <h2>3. Tipos de Cookies que Utilizamos</h2>
            
            <h3>3.1 Cookies Estrictamente Necesarias</h3>
            <p>
              Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar. 
              Incluyen cookies de sesión, autenticación y seguridad.
            </p>
            <table className="cookies-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>session_id</td>
                  <td>Mantener su sesión activa</td>
                  <td>Sesión</td>
                </tr>
                <tr>
                  <td>auth_token</td>
                  <td>Autenticación de usuario</td>
                  <td>30 días</td>
                </tr>
                <tr>
                  <td>csrf_token</td>
                  <td>Protección contra ataques CSRF</td>
                  <td>Sesión</td>
                </tr>
              </tbody>
            </table>

            <h3>3.2 Cookies de Rendimiento</h3>
            <p>
              Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web, 
              proporcionando información sobre las páginas visitadas, el tiempo de permanencia y cualquier 
              mensaje de error.
            </p>
            <table className="cookies-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_ga</td>
                  <td>Google Analytics - Distinguir usuarios</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>_ga_*</td>
                  <td>Google Analytics - Estado de la sesión</td>
                  <td>2 años</td>
                </tr>
                <tr>
                  <td>_gid</td>
                  <td>Google Analytics - Distinguir usuarios</td>
                  <td>24 horas</td>
                </tr>
              </tbody>
            </table>

            <h3>3.3 Cookies de Funcionalidad</h3>
            <p>
              Estas cookies permiten que el sitio web recuerde las elecciones que hace (como su nombre de usuario, 
              idioma o región) y proporcionan características mejoradas y más personales.
            </p>
            <table className="cookies-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>user_preferences</td>
                  <td>Recordar preferencias del usuario</td>
                  <td>1 año</td>
                </tr>
                <tr>
                  <td>language</td>
                  <td>Idioma preferido</td>
                  <td>1 año</td>
                </tr>
                <tr>
                  <td>theme</td>
                  <td>Tema visual preferido</td>
                  <td>1 año</td>
                </tr>
              </tbody>
            </table>

            <h3>3.4 Cookies de Marketing</h3>
            <p>
              Estas cookies se utilizan para hacer que los mensajes publicitarios sean más relevantes para usted. 
              Realizan funciones como evitar que el mismo anuncio aparezca continuamente, asegurar que los anuncios 
              se muestren correctamente y, en algunos casos, seleccionar anuncios que se basan en sus intereses.
            </p>
            <table className="cookies-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Propósito</th>
                  <th>Duración</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>_fbp</td>
                  <td>Facebook Pixel - Seguimiento de conversiones</td>
                  <td>3 meses</td>
                </tr>
                <tr>
                  <td>_gcl_au</td>
                  <td>Google Ads - Seguimiento de conversiones</td>
                  <td>3 meses</td>
                </tr>
              </tbody>
            </table>
          </section>

          <section>
            <h2>4. Cookies de Terceros</h2>
            <p>
              Algunas cookies en nuestro sitio web son establecidas por servicios de terceros que aparecen en nuestras páginas:
            </p>
            
            <h3>4.1 Google Analytics</h3>
            <p>
              Utilizamos Google Analytics para analizar el uso de nuestro sitio web. Google Analytics genera 
              cookies estadísticas que nos ayudan a entender cómo los visitantes interactúan con el sitio web.
            </p>

            <h3>4.2 Redes Sociales</h3>
            <p>
              Nuestro sitio web puede contener botones de redes sociales que establecen cookies cuando hace clic en ellos. 
              Estas cookies son controladas por las respectivas redes sociales.
            </p>
          </section>

          <section>
            <h2>5. Gestión de Cookies</h2>
            
            <h3>5.1 Configuración del Navegador</h3>
            <p>
              Puede controlar y/o eliminar las cookies como desee. Puede eliminar todas las cookies que ya están 
              en su dispositivo y puede configurar la mayoría de los navegadores para que no las acepten.
            </p>

            <h3>5.2 Enlaces de Configuración por Navegador</h3>
            <ul>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener">Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
              <li><a href="https://support.microsoft.com/es-es/help/17442/windows-internet-explorer-delete-manage-cookies" target="_blank" rel="noopener">Internet Explorer</a></li>
              <li><a href="https://support.microsoft.com/es-es/help/4027947/microsoft-edge-delete-cookies" target="_blank" rel="noopener">Microsoft Edge</a></li>
            </ul>

            <h3>5.3 Herramientas de Opt-out</h3>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener">Google Analytics Opt-out</a></li>
              <li><a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener">Facebook Ad Preferences</a></li>
            </ul>
          </section>

          <section>
            <h2>6. Cookies en Dispositivos Móviles</h2>
            <p>
              Si accede a nuestro sitio web desde un dispositivo móvil, también puede configurar su navegador 
              para rechazar cookies. Sin embargo, esto puede afectar la funcionalidad de nuestro sitio web.
            </p>
          </section>

          <section>
            <h2>7. Actualizaciones de esta Política</h2>
            <p>
              Podemos actualizar esta Política de Cookies ocasionalmente para reflejar cambios en las cookies 
              que utilizamos o por otras razones operativas, legales o regulatorias.
            </p>
          </section>

          <section>
            <h2>8. Contacto</h2>
            <p>
              Si tiene preguntas sobre nuestra Política de Cookies, puede contactarnos en:
            </p>
            <ul>
              <li>Email: privacy@linkedai.com</li>
              <li>Dirección: [Dirección de la empresa]</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="legal-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/terms">Términos y Condiciones</Link>
            <Link href="/privacy">Política de Privacidad</Link>
            <Link href="/contact">Contacto</Link>
          </div>
          <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
