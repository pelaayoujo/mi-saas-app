// Función para generar el prompt personalizado para OpenAI
import { buildExamplesSection } from './promptTemplates.js'

export const createPrompt = async (formData) => {
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

INSTRUCCIONES CRÍTICAS DE FORMATO:
1. USA EXACTAMENTE ESTE FORMATO MARKDOWN:
   - # para título principal (UNA sola vez al inicio)
   - ## para subtítulos de secciones
   - **texto** para negritas
   - - para listas con viñetas
   - Línea en blanco entre cada párrafo
   - Hashtags al final en línea separada

2. ESTRUCTURA OBLIGATORIA:
   - # Título Principal (solo uno, al inicio)
   - Párrafo inicial (sin subtítulo)
   - ## Subtítulo 1
   - Párrafo del subtítulo 1
   - ## Subtítulo 2  
   - Párrafo del subtítulo 2
   - ## Conclusión
   - Párrafo de conclusión
   - Línea en blanco
   - #hashtag1 #hashtag2 #hashtag3

3. NO INCLUIR:
   - Etiquetas como "Título:", "Gancho inicial:", etc.
   - Múltiples # en títulos (solo # o ##)
   - Hashtags mezclados con texto

EJEMPLO PERFECTO:
# Cómo Dominar el Marketing Digital en 2024

El marketing digital está evolucionando rápidamente. Aquí te comparto las estrategias que realmente funcionan.

## 1. Personalización con IA

La inteligencia artificial permite crear experiencias únicas para cada cliente.

## 2. Contenido de Valor

El contenido educativo sigue siendo la clave del éxito.

## Conclusión

Implementa estas estrategias y verás resultados inmediatos.

#MarketingDigital #IA #Contenido`

  // Agregar ejemplos personalizados si están disponibles
  try {
    const examplesSection = await buildExamplesSection('articles', formData)
    prompt += examplesSection
  } catch (error) {
    console.error('Error agregando ejemplos personalizados:', error)
    // Continuar sin ejemplos si hay error
  }

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
