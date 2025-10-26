'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PricingPage() {
  const [selectedWords, setSelectedWords] = useState(1); // 0=20k, 1=50k, 2=100k, 3=300k, 4=enterprise
  const [billingCycle, setBillingCycle] = useState('mensual');

  // Precios mensuales y anuales
  const pricingData = {
    mensual: [12, 20, 35, 60, 'Contactar'],
    anual: [10, 16, 28, 48, 'Contactar']
  };

  const wordOptions = [
    { value: 0, label: '20.000', short: '20k' },
    { value: 1, label: '50.000', short: '50k' },
    { value: 2, label: '100.000', short: '100k' },
    { value: 3, label: '300.000', short: '300k' },
    { value: 4, label: '+350.000', short: '+350k' }
  ];

  const currentPrice = pricingData[billingCycle][selectedWords];
  const savings = billingCycle === 'anual' && selectedWords < 4 
    ? Math.round((pricingData.mensual[selectedWords] * 12) - (pricingData.anual[selectedWords] * 12))
    : 0;

  const teamMembers = [1, 3, 6, 12, 'Personalizado'];

  const features = [
    {
      title: `${wordOptions[selectedWords].label} tokens mensuales`,
      description: `Podrás generar hasta ${wordOptions[selectedWords].label} tokens, y si generas menos se guardarán para el siguiente mes de tu suscripción.`,
      show: selectedWords < 4
    },
    {
      title: `Hasta ${teamMembers[selectedWords]} miembros en equipo`,
      description: `Añade hasta ${teamMembers[selectedWords]} personas en tu equipo de trabajo.`,
      show: selectedWords < 4
    },
    {
      title: '5 tonos de escritura',
      description: 'Elige entre tono profesional, educativo, inspiracional, disruptivo y conversacional para tus posts de LinkedIn.',
      show: true
    },
    {
      title: 'Generador de artículos optimizados',
      description: 'Crea contenido específicamente optimizado para LinkedIn con nuestra IA especializada.',
      show: true
    },
    {
      title: 'Generador de biografías',
      description: 'Optimiza tu perfil de LinkedIn con biografías profesionales generadas por IA.',
      show: true
    },
    {
      title: 'Análisis de rendimiento',
      description: 'Obtén insights sobre el rendimiento de tus posts y optimiza tu estrategia de contenido.',
      show: selectedWords >= 1
    },
    {
      title: 'Programación de contenido',
      description: 'Planifica y programa tus posts de LinkedIn para mantener una presencia constante.',
      show: selectedWords >= 2
    },
    {
      title: 'Tokens acumulables',
      description: 'No te preocupes si no gastas todos los tokens del mes, se acumulan para el siguiente período.',
      show: selectedWords < 4
    }
  ];

  const enterpriseFeatures = [
    {
      title: 'Precio personalizado',
      description: 'Tendrás un precio por las necesidades personalizadas que tengas.'
    },
    {
      title: 'Tokens personalizados',
      description: 'Elige la cantidad de tokens que necesitas cada mes (a partir de 500.000 tokens).'
    },
    {
      title: 'Miembros de equipo personalizados',
      description: 'Elige cuántas personas usarán la herramienta en tu organización.'
    },
    {
      title: 'Herramientas personalizadas',
      description: 'Podemos desarrollar funcionalidades específicas para tu caso de uso empresarial.'
    },
    {
      title: 'Acceso a la API',
      description: 'Tendrás acceso completo a la API de LinkedAI para integraciones personalizadas.'
    }
  ];

  const testimonials = [
    {
      name: 'María González',
      text: 'LinkedAI ha revolucionado mi estrategia de LinkedIn. En solo 2 meses he aumentado mis conexiones en un 300% y mis posts tienen 5 veces más engagement.'
    },
    {
      name: 'Carlos Ruiz',
      text: 'La calidad del contenido que genera LinkedAI es impresionante. Mis posts ahora son mucho más profesionales y atractivos para mi audiencia objetivo.'
    },
    {
      name: 'Ana Martín',
      text: 'Como emprendedora, el tiempo que me ahorra LinkedAI es invaluable. Puedo enfocarme en mi negocio mientras mantengo una presencia activa en LinkedIn.'
    },
    {
      name: 'David López',
      text: 'Los diferentes tonos de escritura me permiten adaptar mi mensaje según la audiencia. Es como tener un copywriter profesional 24/7.'
    },
    {
      name: 'Laura Sánchez',
      text: 'La función de programación de contenido es perfecta. Puedo planificar toda mi estrategia de contenido semanal en minutos.'
    },
    {
      name: 'Roberto García',
      text: 'El análisis de rendimiento me ha ayudado a entender qué tipo de contenido funciona mejor con mi audiencia. Mis métricas han mejorado significativamente.'
    }
  ];

  const faqs = [
    {
      question: '¿En qué me puede ayudar LinkedAI?',
      answer: 'LinkedAI te ayuda a crear contenido optimizado para LinkedIn, desde posts individuales hasta biografías profesionales, todo generado por IA especializada en esta plataforma.'
    },
    {
      question: '¿Puedo probar la herramienta antes de suscribirme?',
      answer: 'Sí, ofrecemos un plan de prueba gratuito con 3 artículos para que puedas experimentar todas las funcionalidades antes de decidirte por un plan de pago.'
    },
    {
      question: '¿Qué son los tokens y cómo se calculan?',
      answer: 'Los tokens son la unidad de medida que usa nuestra IA para generar contenido. Un post típico de LinkedIn consume entre 200-500 tokens dependiendo de la longitud.'
    },
    {
      question: '¿Puedo cambiar de plan en cualquier momento?',
      answer: 'Sí, puedes cambiar de plan en cualquier momento. Los tokens no utilizados se transferirán al nuevo plan, y si necesitas más tokens, se facturarán proporcionalmente.'
    },
    {
      question: '¿El contenido generado es único y original?',
      answer: 'Absolutamente. LinkedAI genera contenido 100% original y único para cada usuario. Nunca reutilizamos contenido entre usuarios.'
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, ofrecemos soporte técnico por email para todos nuestros usuarios. Los usuarios de planes superiores tienen prioridad en el soporte.'
    }
  ];

  const handleWordChange = (value) => {
    setSelectedWords(value);
  };

  const handleBillingChange = (cycle) => {
    setBillingCycle(cycle);
  };

  const handleCTAClick = () => {
    if (selectedWords === 4) {
      window.location.href = 'mailto:soporte@linkedai.com';
    } else {
      window.location.href = '/register';
    }
  };

  return (
    <div className="pricing-page">
      {/* Navegación */}
      <nav className="pricing-nav">
        <div className="nav-container">
          <Link href="/" className="nav-logo">
            <span className="logo-text">LinkedAI</span>
          </Link>
          <div className="nav-links">
            <Link href="/">Inicio</Link>
            <Link href="#trial">Prueba Gratis</Link>
            <Link href="/login">Acceder</Link>
          </div>
        </div>
      </nav>

      {/* Formas de fondo animadas */}
      <div className="shapes-wrap">
        <div className="shapes-scale">
          <div className="price-shapes shape-1"></div>
          <div className="price-shapes shape-2"></div>
          <div className="price-shapes shape-3"></div>
        </div>
      </div>

      {/* Sección principal de precios */}
      <section className="price-select center">
        <div className="select-price">
          <h1 className="white medium">Precios</h1>
          <h4 className="white mov-pr">Selecciona la cantidad de tokens mensuales</h4>
          
          {/* Selector de palabras */}
          <div className="range-input">
            <input 
              className="wpm-range" 
              type="range" 
              min="0" 
              max="4" 
              value={selectedWords} 
              step="1"
              onChange={(e) => handleWordChange(parseInt(e.target.value))}
            />
            <div className="range-tip range-full">
              {wordOptions.map((option, index) => (
                <p key={index}>{option.label}</p>
              ))}
            </div>
            <div className="range-tip range-abbrv">
              {wordOptions.map((option, index) => (
                <p key={index}>{option.short}</p>
              ))}
            </div>
          </div>

          {/* Toggle de facturación */}
          <div className="swap-billing">
            <div 
              className={`billing-type mensual-bill ${billingCycle === 'mensual' ? 'green-bg' : ''}`}
              onClick={() => handleBillingChange('mensual')}
            >
              <h4 className="white medium">Mensual</h4>
            </div>
            <div 
              className={`billing-type anual-bill ${billingCycle === 'anual' ? 'green-bg' : ''}`}
              onClick={() => handleBillingChange('anual')}
            >
              <h4 className="white medium">Anual</h4>
              <h6 className="save-y inline white bold">¡20% de descuento!</h6>
            </div>
          </div>
        </div>

        {/* Detalles del plan */}
        <div className="plan-details left">
          <div className="in-grid">
            <div className="in-grid-wrap">
              <div className="price-wrap inline">
                <div className="star p-1 bl-star">⭐</div>
                <div className="star p-2 bl-star">⭐</div>
                <div className="star p-3 bl-star">⭐</div>
                <h1 className="white bold inline bottom-line pri-num">
                  {selectedWords === 4 ? 'Contactar' : `${currentPrice}€`}
                </h1>
                {selectedWords < 4 && (
                  <h1 className="inline bottom-line pri-model">/mes</h1>
                )}
                {billingCycle === 'anual' && selectedWords < 4 && (
                  <h4 className="gray show-if-y line-3">
                    Facturado anualmente (Ahorra <span id="save-am">{savings}€</span>/año)
                  </h4>
                )}
              </div>
              <h2 className="white medium line-3 m-b price-title">
                {selectedWords === 4 
                  ? 'Ideal para empresas' 
                  : selectedWords === 0 
                    ? 'Ideal para profesionales independientes'
                    : selectedWords === 1
                      ? 'Ideal para profesionales del marketing'
                      : selectedWords === 2
                        ? 'Ideal para equipos pequeños'
                        : 'Ideal para equipos medianos'
                }
              </h2>
              <h5 className="white line-3 price-description">
                {selectedWords === 4 
                  ? 'Podrás apoyarte en LinkedAI para optimizar los procesos de tu empresa, mejorar la calidad de tus posts de LinkedIn y aumentar la productividad de tu equipo.'
                  : 'Podrás apoyarte de LinkedAI para crear contenido profesional, atractivo y optimizado para LinkedIn que impulse tu presencia profesional.'
                }
              </h5>

              <div className="cta-price">
                <button className="b-1 gradient" onClick={handleCTAClick}>
                  <h2 className="white bold">
                    {selectedWords === 4 ? 'Agendar reunión' : 'Empezar ahora'}
                  </h2>
                </button>
              </div>
            </div>
          </div>

          {/* Características del plan */}
          <div className="in-grid">
            <div className="in-grid-wrap plan-features">
              {(selectedWords === 4 ? enterpriseFeatures : features).map((feature, index) => (
                <div key={index} className="ch-in extra-inf-trigger" style={{display: feature.show ? 'block' : 'none'}}>
                  <h6 className="extra-inf black line-3">{feature.description}</h6>
                  <img className="inline" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTkgMTJMMTEgMTRMMTUgMTAiIHN0cm9rZT0iIzAwNzdCNiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIHN0cm9rZT0iIzAwNzdCNiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPgo=" alt=""/>
                  <h4 className="white inline line-2">{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sección CEO */}
      <section className="ceo">
        <div className="ceo-box grid">
          <div className="in-grid">
            <div className="in-grid-wrap">
              <img 
                className="ceo-pfp" 
                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiByeD0iNTAiIGZpbGw9IiMwMDc3QjUiLz4KPHN2ZyB4PSIyNSIgeT0iMjUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI1MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+Cg==" 
                alt="CEO LinkedAI"
              />
            </div>
          </div>
          <div className="in-grid">
            <div className="in-grid-wrap">
              <h3 className="white line-3 ceo-quo" style={{marginTop: 0}}>
                Si durante los próximos 5 días sientes que LinkedAI no es para ti, sin haber superado los 10 mil tokens generados, simplemente envíame un email a mi correo personal: <a href="mailto:ceo@linkedai.com" className="__cf_email__">ceo@linkedai.com</a> y te devolveré el 100% de tu dinero.<br/><br/>Sí, sin preguntas. Estoy completamente seguro de que te enamorarás de LinkedAI y será un aliado inseparable para tu crecimiento profesional en LinkedIn. Nuestra garantía de devolución es 100% segura y sin riesgos.
              </h3><br/>
              <h3 className="white medium">CEO de LinkedAI</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="reviews">
        <div className="reviews-grid">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="in-grid">
              <div className="in-grid-wrap">
                <div className="rating-wrap" animation="from-left" delay={`${0.3 + index * 0.2}`}>
                  <div className="rating-in grid">
                    <div className="in-grid">
                      <div className="in-grid-wrap">
                        <div className="pfp">
                          <img 
                            src={`data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMwMDc3QjUiLz4KPHN2ZyB4PSIxNSIgeT0iMTUiIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSJ3aGl0ZSIvPgo8cGF0aCBkPSJNMTIgMTRDOC42ODYyOSAxNCA2IDE2LjY4NjMgNiAyMEgxOEMxOCAxNi42ODYzIDE1LjMxMzcgMTQgMTIgMTRaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4KPC9zdmc+Cg=="`}
                            alt={testimonial.name}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="in-grid">
                      <div className="in-grid-wrap">
                        <h3 className="white medium rat-name">{testimonial.name}</h3>
                        <div className="star-rating">
                          {[...Array(5)].map((_, i) => (
                            <img key={i} className="star-in inline" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwIDEuNUwxMi4zNTkgNi4xM0wxOCA3LjE0NUwxNCAxMC44N0wxNC43MTggMTYuNUwxMCAxNC4yN0w1LjI4MiAxNi41TDYgMTAuODdMMiA3LjE0NUw3LjY0MSA2LjEzTDEwIDEuNVoiIGZpbGw9IiNGRkQ3MDAiLz4KPC9zdmc+Cg==" alt=""/>
                          ))}
                        </div>
                        <h5 className="gray line-2">{testimonial.text}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="faq">
        <div className="title-wrap center">
          <h1 className="extra-title white medium">Preguntas frecuentes</h1>
        </div>

        {faqs.map((faq, index) => (
          <details key={index}>
            <summary><h3 className="white medium inline">{faq.question}</h3></summary>
            <article><h4 className="white line-3">{faq.answer}</h4></article>
          </details>
        ))}
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div className="in-grid">
            <div className="in-grid-wrap">
              <span className="footer-logo inline">LinkedAI</span>
            </div>
          </div>
          <div className="in-grid">
            <div className="in-grid-wrap">
              <div className="list-url">
                <h3 className="white medium footer-sect-title">Producto</h3>
                <Link href="/pricing"><h5 className="white">Precios</h5></Link>
                <Link href="/register"><h5 className="white">Registro</h5></Link>
                <Link href="/login"><h5 className="white">Acceso</h5></Link>
              </div>
              <br/>
              <div className="list-url">
                <h3 className="white medium footer-sect-title">Soporte</h3>
                <a href="mailto:soporte@linkedai.com"><h5 className="white">Email: soporte@linkedai.com</h5></a>
              </div>
            </div>
          </div>
          <div className="in-grid">
            <div className="in-grid-wrap">
              <div className="list-url">
                <h3 className="white medium footer-sect-title">Políticas</h3>
                <Link href="/terms"><h5 className="white">Términos y condiciones</h5></Link>
                <Link href="/privacy"><h5 className="white">Política de privacidad</h5></Link>
                <Link href="/cookies"><h5 className="white">Cookies</h5></Link>
              </div>
            </div>
          </div>
          <div className="in-grid">
            <div className="in-grid-wrap">
              <form className="newsl form-newsletter" method="POST">
                <h3 className="white medium footer-sect-title">¡Suscríbete a nuestro newsletter!</h3>
                <div className="input-box">
                  <input type="text" name="name" placeholder="Nombre" required/>
                </div>
                <div className="input-box">
                  <input type="email" name="email" placeholder="Email" required/>
                </div>
                <div className="input-box submit-box">
                  <button className="b-1 gradient" type="submit"><h4 className="white bold">Suscribirse Gratis</h4></button>
                </div><br/><br/>
                <h6 className="gray line-3">Únete a nuestro newsletter donde te daremos tips de LinkedIn, IA y crecimiento profesional.</h6>
              </form>
            </div>
          </div>
        </div>
        <hr/>
        <div className="footer-below center">
          <a href="https://linkedin.com/company/linkedai" target="_blank" className="social-ico-a inline">
            <img className="social-ico" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwLjQ0NyA0SDE5LjUzNEMxOC4zNzcgNCAxNy43MzggNC44OTcgMTcuNzM4IDUuOTQ5VjcuOTQ5SDIwLjQ0N1YxMS4wNDdIMTcuNzM4VjIwSDE0LjYzM1YxMS4wNDdIMTEuOTI0VjcuOTQ5SDE0LjYzM1Y1LjYzNEMxNC42MzMgMy4yMTYgMTUuOTU0IDIgMTguMzY5IDJIMjAuNDQ3VjRaIiBmaWxsPSIjMDA3N0I1Ii8+CjxjaXJjbGUgY3g9IjUuMzM3IiBjeT0iNS4zMzciIHI9IjEuMzM3IiBmaWxsPSIjMDA3N0I1Ii8+CjxwYXRoIGQ9Ik01LjMzNyA4LjY2N0g4LjY2N1YyMEg1LjMzN1Y4LjY2N1oiIGZpbGw9IiMwMDc3QjUiLz4KPC9zdmc+Cg==" alt=""/>
          </a>
          <a href="mailto:soporte@linkedai.com" target="_blank" className="social-ico-a inline">
            <img className="social-ico" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTQgNEgyMEMyMS4xIDQgMjIgNC45IDIyIDZWMThDMjIgMTkuMSAyMS4xIDIwIDIwIDIwSDRDMi45IDIwIDIgMTkuMSAyIDE4VjZDMiA0LjkgMi45IDQgNCA0WiIgc3Ryb2tlPSIjMDA3N0I1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8cG9seWxpbmUgcG9pbnRzPSIyMiw2IDEyLDEzIDIsNiIgc3Ryb2tlPSIjMDA3N0I1IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K" alt=""/>
          </a>
        </div>
      </footer>
    </div>
  );
}
