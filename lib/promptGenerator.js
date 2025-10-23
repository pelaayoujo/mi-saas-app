// Función para generar el prompt para el modelo fine-tuned (solo tono)
export const createFineTunePrompt = (tone) => {
  return `TONO: ${tone}`
}

// Función para generar el prompt completo con contexto adicional
export const createContextualPrompt = (formData, baseContent) => {
  const audienceText = (formData.targetAudience || formData.audience) ? `\n- Audiencia: ${formData.targetAudience || formData.audience}` : ''
  
  return `EJEMPLO DE TONO Y ESTILO (generado por modelo fine-tuned):
${baseContent}

---

INFORMACIÓN ESPECÍFICA PARA ESTE ARTÍCULO:
- Enfoque profesional: ${formData.professionalFocus}
- Tema: ${formData.topic}
- Extensión: ${formData.length}
${audienceText}

INSTRUCCIONES CRÍTICAS:
1. MANTÉN EXACTAMENTE el mismo tono y estilo del ejemplo mostrado arriba
2. USA TEXTO PLANO (sin símbolos markdown: #, ##, **, etc.)
3. ESTRUCTURA: Título, párrafo inicial, desarrollo, conclusión, hashtags al final
4. El contenido debe ser sobre: ${formData.topic}
5. Enfócate en: ${formData.professionalFocus}

Genera UN SOLO artículo usando el tono del ejemplo y la información específica proporcionada. NO incluyas etiquetas como "Título:" o "Gancho inicial:" - solo el contenido en texto plano limpio.`
}

// Función legacy mantenida para compatibilidad
export const createPrompt = (formData) => {
  let prompt = `Eres un experto en marketing de contenidos para LinkedIn. Crea un artículo profesional listo para publicar.

INFORMACIÓN DEL ARTÍCULO:
- Enfoque profesional: ${formData.professionalFocus}
- Tema: ${formData.topic}
- Tono: ${formData.tone}
- Extensión: ${formData.length}
`

  // Solo agregar audiencia si se especifica
  if (formData.audience && formData.audience.trim()) {
    prompt += `\n- Audiencia: ${formData.audience}`
  }

  prompt += `

INSTRUCCIONES CRÍTICAS DE FORMATO:
1. USA TEXTO PLANO (sin símbolos markdown):
   - NO uses #, ##, **, etc.
   - Solo texto normal y limpio
   - Línea en blanco entre cada párrafo
   - Hashtags al final en línea separada

2. ESTRUCTURA OBLIGATORIA:
   - TÍTULO PRINCIPAL: Debe ser específico sobre "${formData.topic}" y NO sobre "${formData.professionalFocus}" (sin hashtags)
   - Párrafo inicial
   - Desarrollo del contenido
   - Conclusión
   - Línea en blanco
   - #hashtag1 #hashtag2 #hashtag3

3. NO INCLUIR:
   - Etiquetas como "Título:", "Gancho inicial:", etc.
   - Símbolos markdown (#, ##, **, etc.)
   - Hashtags en el título (SOLO al final)
   - Títulos genéricos que no mencionen "${formData.topic}"
   - Títulos que usen "${formData.professionalFocus}" en lugar de "${formData.topic}"

EJEMPLO PERFECTO:
Cómo Automatizar Procesos Financieros en tu Empresa

La automatización financiera está revolucionando cómo las empresas gestionan sus procesos. Aquí te comparto las estrategias que realmente funcionan.

La personalización con IA permite crear experiencias únicas para cada cliente. Las herramientas actuales nos permiten segmentar y personalizar como nunca antes.

El contenido educativo sigue siendo la clave del éxito. Los usuarios buscan valor real, no solo promociones.

Implementa estas estrategias y verás resultados inmediatos en tu engagement y conversiones.

#AutomatizacionFinanciera #IA #Finanzas`

  return prompt
}

// Función helper para mapear los valores del formulario a los del prompt
export const mapFormDataToPrompt = (formData) => {
  return {
    professionalFocus: formData.professionalFocus,
    topic: formData.topic,
    tone: formData.tone,
    length: formData.length,
    audience: formData.targetAudience || formData.audience || '' // Campo opcional
  }
}
