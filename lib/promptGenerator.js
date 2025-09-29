// Función para generar el prompt personalizado para OpenAI
export const createPrompt = (formData) => {
  let prompt = `Eres un experto en marketing de contenidos para LinkedIn. Crea ${formData.resultsCount} artículo(s) profesional(es) listo(s) para publicar.

INFORMACIÓN DEL ARTÍCULO:
- Enfoque profesional: ${formData.professionalFocus}
- Tema: ${formData.topic}
- Tono: ${formData.tone}
- Extensión: ${formData.length}
- Objetivo: ${formData.objective}`

  // Solo agregar audiencia si se especifica
  if (formData.audience && formData.audience.trim()) {
    prompt += `\n- Audiencia: ${formData.audience}`
  }

  prompt += `

INSTRUCCIONES IMPORTANTES:
1. ESCRIBE SOLO EL CONTENIDO FINAL - NO incluyas etiquetas como "Título:", "Gancho inicial:", etc.
2. USA FORMATO MARKDOWN para títulos (## para subtítulos)
3. SEPARA párrafos con líneas en blanco
4. USA viñetas (-) para listas
5. INCLUYE hashtags al final
6. El contenido debe estar LISTO PARA PUBLICAR directamente

ESTRUCTURA REQUERIDA:
- Título atractivo (sin etiqueta "Título:")
- Párrafo inicial que enganche
- 3-5 puntos principales con subtítulos
- Conclusión con llamada a la acción
- Hashtags relevantes

FORMATO DE SALIDA:
Escribe cada artículo completo y bien formateado. Si son múltiples artículos, sepáralos claramente con "---" entre ellos.

EJEMPLO DE FORMATO CORRECTO:
## Título del Artículo

Párrafo inicial que engancha al lector...

## Punto Principal 1

Contenido del primer punto...

## Punto Principal 2

Contenido del segundo punto...

## Conclusión

Conclusión poderosa con llamada a la acción.

#hashtag1 #hashtag2 #hashtag3`

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
