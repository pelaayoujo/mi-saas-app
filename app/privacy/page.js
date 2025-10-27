'use client';

import Link from 'next/link';
import '../legal.css';

export default function PrivacyPage() {
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
          <h1>Política de Privacidad</h1>
          <p className="last-updated">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

          <section>
            <h2>1. Información que Recopilamos</h2>
            
            <h3>1.1 Información que nos proporciona directamente</h3>
            <ul>
              <li><strong>Información de cuenta:</strong> Nombre, dirección de email, contraseña</li>
              <li><strong>Información de perfil:</strong> Datos profesionales, industria, objetivos</li>
              <li><strong>Contenido:</strong> Artículos, biografías y otros contenidos que crea</li>
              <li><strong>Comunicaciones:</strong> Mensajes que nos envía a través de formularios de contacto</li>
            </ul>

            <h3>1.2 Información que recopilamos automáticamente</h3>
            <ul>
              <li><strong>Datos de uso:</strong> Cómo utiliza nuestro servicio, funciones que usa, tiempo de sesión</li>
              <li><strong>Información del dispositivo:</strong> Tipo de dispositivo, sistema operativo, navegador</li>
              <li><strong>Datos de ubicación:</strong> País y región (basado en su dirección IP)</li>
              <li><strong>Cookies y tecnologías similares:</strong> Para mejorar su experiencia y analizar el uso</li>
            </ul>
          </section>

          <section>
            <h2>2. Cómo Utilizamos su Información</h2>
            
            <h3>2.1 Para proporcionar el servicio</h3>
            <ul>
              <li>Crear y mantener su cuenta</li>
              <li>Procesar sus solicitudes de contenido</li>
              <li>Generar artículos y biografías personalizadas</li>
              <li>Proporcionar soporte técnico</li>
            </ul>

            <h3>2.2 Para mejorar nuestro servicio</h3>
            <ul>
              <li>Analizar patrones de uso para mejorar la funcionalidad</li>
              <li>Desarrollar nuevas características</li>
              <li>Optimizar el rendimiento de la plataforma</li>
              <li>Realizar investigaciones y análisis</li>
            </ul>

            <h3>2.3 Para comunicarnos con usted</h3>
            <ul>
              <li>Enviar actualizaciones del servicio</li>
              <li>Proporcionar soporte al cliente</li>
              <li>Enviar newsletters y contenido educativo (con su consentimiento)</li>
              <li>Notificar cambios en nuestros términos o políticas</li>
            </ul>
          </section>

          <section>
            <h2>3. Compartir Información</h2>
            
            <h3>3.1 No vendemos su información</h3>
            <p>
              No vendemos, alquilamos ni compartimos su información personal con terceros para fines comerciales.
            </p>

            <h3>3.2 Cuándo compartimos información</h3>
            <ul>
              <li><strong>Proveedores de servicios:</strong> Empresas que nos ayudan a operar nuestro servicio (hosting, análisis, email)</li>
              <li><strong>Cumplimiento legal:</strong> Cuando la ley lo requiera o para proteger nuestros derechos</li>
              <li><strong>Protección de seguridad:</strong> Para prevenir fraudes, abusos o actividades ilegales</li>
              <li><strong>Consentimiento:</strong> Cuando usted nos dé permiso explícito</li>
            </ul>
          </section>

          <section>
            <h2>4. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger su información:
            </p>
            <ul>
              <li>Encriptación de datos en tránsito y en reposo</li>
              <li>Acceso restringido a información personal</li>
              <li>Monitoreo regular de seguridad</li>
              <li>Capacitación del personal en privacidad</li>
              <li>Auditorías de seguridad regulares</li>
            </ul>
          </section>

          <section>
            <h2>5. Retención de Datos</h2>
            <p>
              Conservamos su información personal durante el tiempo necesario para:
            </p>
            <ul>
              <li>Proporcionar nuestros servicios</li>
              <li>Cumplir con obligaciones legales</li>
              <li>Resolver disputas</li>
              <li>Hacer cumplir nuestros acuerdos</li>
            </ul>
            <p>
              Generalmente, eliminamos su información personal 30 días después de que cierre su cuenta, 
              a menos que la ley requiera un período de retención más largo.
            </p>
          </section>

          <section>
            <h2>6. Sus Derechos</h2>
            <p>Bajo el RGPD, usted tiene los siguientes derechos:</p>
            
            <h3>6.1 Derecho de acceso</h3>
            <p>Puede solicitar una copia de la información personal que tenemos sobre usted.</p>

            <h3>6.2 Derecho de rectificación</h3>
            <p>Puede solicitar que corrijamos información inexacta o incompleta.</p>

            <h3>6.3 Derecho de supresión</h3>
            <p>Puede solicitar que eliminemos su información personal en ciertas circunstancias.</p>

            <h3>6.4 Derecho de portabilidad</h3>
            <p>Puede solicitar que le proporcionemos su información en un formato estructurado.</p>

            <h3>6.5 Derecho de oposición</h3>
            <p>Puede oponerse al procesamiento de su información para ciertos fines.</p>

            <h3>6.6 Derecho de limitación</h3>
            <p>Puede solicitar que limitemos el procesamiento de su información.</p>
          </section>

          <section>
            <h2>7. Cookies y Tecnologías de Seguimiento</h2>
            <p>
              Utilizamos cookies y tecnologías similares para mejorar su experiencia. 
              Para más información, consulte nuestra <Link href="/cookies">Política de Cookies</Link>.
            </p>
          </section>

          <section>
            <h2>8. Transferencias Internacionales</h2>
            <p>
              Su información puede ser transferida y procesada en países fuera del Espacio Económico Europeo. 
              Cuando esto ocurra, nos aseguraremos de que existan salvaguardas adecuadas para proteger su información.
            </p>
          </section>

          <section>
            <h2>9. Menores de Edad</h2>
            <p>
              Nuestro servicio no está dirigido a menores de 18 años. No recopilamos conscientemente 
              información personal de menores de 18 años.
            </p>
          </section>

          <section>
            <h2>10. Cambios a esta Política</h2>
            <p>
              Podemos actualizar esta Política de Privacidad ocasionalmente. Le notificaremos sobre 
              cambios significativos a través de nuestro servicio o por email.
            </p>
          </section>

          <section>
            <h2>11. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta Política de Privacidad o desea ejercer sus derechos, 
              puede contactarnos en:
            </p>
            <ul>
              <li>Email: privacy@linkedai.com</li>
              <li>Dirección: [Dirección de la empresa]</li>
              <li>Teléfono: [Número de teléfono]</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="legal-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/terms">Términos y Condiciones</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/contact">Contacto</Link>
          </div>
          <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
