// Función para generar el prompt personalizado para OpenAI
export const createPrompt = (formData) => {
  let prompt = `Quiero que actúes como un experto en marketing de contenidos para LinkedIn, con un profundo conocimiento en copywriting, storytelling y estrategias de engagement en redes sociales.

Tu tarea es crear ${formData.resultsCount} artículos optimizados para LinkedIn con las siguientes características:

🔹 Información Base

Enfoque profesional (desde qué área hablarás): ${formData.professionalFocus}

Tema central: ${formData.topic}

Tono del artículo: ${formData.tone}

Extensión aproximada: ${formData.length}

Objetivo del artículo: ${formData.objective}`

  // Solo agregar audiencia si se especifica
  if (formData.audience && formData.audience.trim()) {
    prompt += `\n\nAudiencia objetivo: ${formData.audience}`
  }

  prompt += `

Aspectos clave a desarrollar: [LISTA DE SUBTEMAS, IDEAS O ARGUMENTOS QUE SE DEBAN TOCAR]

🔹 Requisitos de Estructura y Estilo

Título: debe ser llamativo, concreto y despertar curiosidad.

Gancho inicial (primeras 2-3 líneas): diseñado para detener el scroll y atrapar la atención de la audiencia.

Cuerpo: organizado en subtítulos, párrafos cortos, viñetas y ejemplos prácticos.

Valor añadido: incluir insights, datos relevantes, tendencias o experiencias reales (si aplica).

Cierre: una conclusión poderosa con llamada a la acción clara, alineada al objetivo definido (ej: invitar a comentar, seguir, reflexionar, descargar algo, etc.).

Optimización para LinkedIn: estilo ágil, frases cortas, espacio en blanco para mejorar la legibilidad y preguntas abiertas para fomentar la interacción.

🔹 Extras para potenciar el impacto

Añadir storytelling o ejemplos personales/profesionales cuando sea relevante.

Sugerir hashtags estratégicos relacionados con el tema.`

  return prompt
}

// Función helper para mapear los valores del formulario a los del prompt
export const mapFormDataToPrompt = (formData) => {
  return {
    resultsCount: formData.resultsCount === 1 ? 'uno' : 
                  formData.resultsCount === 2 ? 'dos' : 'tres',
    professionalFocus: formData.professionalFocus,
    topic: formData.topic,
    tone: formData.tone,
    length: formData.length,
    objective: formData.objective,
    audience: formData.audience || '' // Campo opcional
  }
}
