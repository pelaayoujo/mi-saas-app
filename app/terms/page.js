'use client';

import Link from 'next/link';
import '../legal.css';

export default function TermsPage() {
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
          <h1>Términos y Condiciones de Uso</h1>
          <p className="last-updated">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>

          <section>
            <h2>1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar LinkedAI ("el Servicio"), usted acepta estar sujeto a estos Términos y Condiciones de Uso ("Términos"). 
              Si no está de acuerdo con alguno de estos términos, no debe utilizar nuestro Servicio.
            </p>
          </section>

          <section>
            <h2>2. Descripción del Servicio</h2>
            <p>
              LinkedAI es una plataforma de inteligencia artificial que ayuda a los usuarios a crear y optimizar contenido profesional 
              para LinkedIn. Nuestro servicio incluye:
            </p>
            <ul>
              <li>Generación de artículos optimizados para LinkedIn</li>
              <li>Creación de biografías profesionales</li>
              <li>Análisis de contenido y métricas</li>
              <li>Programación de publicaciones</li>
              <li>Herramientas de optimización de perfil</li>
            </ul>
          </section>

          <section>
            <h2>3. Cuentas de Usuario</h2>
            <h3>3.1 Registro</h3>
            <p>
              Para utilizar nuestro Servicio, debe crear una cuenta proporcionando información precisa y actualizada. 
              Es responsable de mantener la confidencialidad de su cuenta y contraseña.
            </p>
            
            <h3>3.2 Elegibilidad</h3>
            <p>
              Debe tener al menos 18 años para utilizar este Servicio. Al registrarse, declara y garantiza que cumple con este requisito.
            </p>

            <h3>3.3 Responsabilidad de la Cuenta</h3>
            <p>
              Es responsable de todas las actividades que ocurran bajo su cuenta. Debe notificarnos inmediatamente 
              cualquier uso no autorizado de su cuenta.
            </p>
          </section>

          <section>
            <h2>4. Uso Aceptable</h2>
            <h3>4.1 Uso Permitido</h3>
            <p>Puede utilizar nuestro Servicio para:</p>
            <ul>
              <li>Crear contenido profesional para su perfil de LinkedIn</li>
              <li>Optimizar su presencia profesional en línea</li>
              <li>Mejorar su estrategia de networking</li>
              <li>Desarrollar su marca personal</li>
            </ul>

            <h3>4.2 Uso Prohibido</h3>
            <p>No puede utilizar nuestro Servicio para:</p>
            <ul>
              <li>Crear contenido ilegal, difamatorio, acosador o inapropiado</li>
              <li>Violar derechos de propiedad intelectual de terceros</li>
              <li>Spam o actividades comerciales no autorizadas</li>
              <li>Intentar acceder a sistemas o datos no autorizados</li>
              <li>Interferir con el funcionamiento del Servicio</li>
            </ul>
          </section>

          <section>
            <h2>5. Propiedad Intelectual</h2>
            <h3>5.1 Nuestro Contenido</h3>
            <p>
              El Servicio y su contenido original, características y funcionalidad son propiedad de LinkedAI y están 
              protegidos por leyes de derechos de autor, marcas comerciales y otras leyes de propiedad intelectual.
            </p>

            <h3>5.2 Su Contenido</h3>
            <p>
              Usted conserva todos los derechos sobre el contenido que crea utilizando nuestro Servicio. 
              Al utilizar el Servicio, nos otorga una licencia limitada para procesar y mejorar su contenido 
              según sea necesario para proporcionar el Servicio.
            </p>
          </section>

          <section>
            <h2>6. Planes de Suscripción y Pagos</h2>
            <h3>6.1 Planes Disponibles</h3>
            <p>
              Ofrecemos varios planes de suscripción con diferentes límites de uso y características. 
              Los detalles de cada plan están disponibles en nuestra página de precios.
            </p>

            <h3>6.2 Facturación</h3>
            <p>
              Los pagos se procesan mensualmente. Las suscripciones se renuevan automáticamente a menos que 
              se cancelen antes del final del período de facturación.
            </p>

            <h3>6.3 Reembolsos</h3>
            <p>
              Ofrecemos una garantía de reembolso de 5 días para nuevos usuarios. Los reembolsos se procesan 
              dentro de 5-10 días hábiles después de la solicitud.
            </p>
          </section>

          <section>
            <h2>7. Límites de Uso</h2>
            <p>
              Cada plan de suscripción incluye límites específicos de tokens y características. 
              El uso excesivo puede resultar en la suspensión temporal del servicio hasta el siguiente período de facturación.
            </p>
          </section>

          <section>
            <h2>8. Privacidad</h2>
            <p>
              Su privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo recopilamos, 
              usamos y protegemos su información cuando utiliza nuestro Servicio.
            </p>
          </section>

          <section>
            <h2>9. Modificaciones del Servicio</h2>
            <p>
              Nos reservamos el derecho de modificar o discontinuar el Servicio (o cualquier parte del mismo) 
              con o sin aviso previo. No seremos responsables ante usted o cualquier tercero por cualquier 
              modificación, suspensión o discontinuación del Servicio.
            </p>
          </section>

          <section>
            <h2>10. Terminación</h2>
            <p>
              Podemos terminar o suspender su cuenta inmediatamente, sin aviso previo, por cualquier motivo, 
              incluyendo sin limitación, si incumple estos Términos.
            </p>
          </section>

          <section>
            <h2>11. Limitación de Responsabilidad</h2>
            <p>
              En ningún caso LinkedAI será responsable por daños indirectos, incidentales, especiales, 
              consecuenciales o punitivos, incluyendo sin limitación, pérdida de beneficios, datos, uso, 
              goodwill u otras pérdidas intangibles.
            </p>
          </section>

          <section>
            <h2>12. Ley Aplicable</h2>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin considerar 
              sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          <section>
            <h2>13. Contacto</h2>
            <p>
              Si tiene preguntas sobre estos Términos, puede contactarnos en:
            </p>
            <ul>
              <li>Email: legal@linkedai.com</li>
              <li>Dirección: [Dirección de la empresa]</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className="legal-footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link href="/privacy">Política de Privacidad</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/contact">Contacto</Link>
          </div>
          <p>&copy; 2024 LinkedAI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
