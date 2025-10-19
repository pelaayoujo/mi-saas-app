// Sistema de plantillas y ejemplos personalizados para prompts
import clientPromise from './mongodb'

// Ejemplos por defecto (backup si no hay ejemplos en DB)
const DEFAULT_EXAMPLES = {
  articles: [
    {
      title: "Cómo Dominar el Marketing Digital en 2024",
      content: `# Cómo Dominar el Marketing Digital en 2024

El marketing digital está evolucionando rápidamente. Aquí te comparto las estrategias que realmente funcionan.

## 1. Personalización con IA

La inteligencia artificial permite crear experiencias únicas para cada cliente.

## 2. Contenido de Valor

El contenido educativo sigue siendo la clave del éxito.

## Conclusión

Implementa estas estrategias y verás resultados inmediatos.

#MarketingDigital #IA #Contenido`,
      tone: "profesional",
      length: "medio",
      category: "marketing"
    }
  ]
}

// Función para obtener ejemplos personalizados desde MongoDB
export async function getCustomExamples(category = 'articles', limit = 3) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const examplesCollection = db.collection('prompt_examples')
    
    // Buscar ejemplos activos, ordenados por fecha de creación
    const examples = await examplesCollection
      .find({ 
        category: category,
        isActive: true 
      })
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray()
    
    // Si no hay ejemplos en DB, usar los por defecto
    if (examples.length === 0) {
      return DEFAULT_EXAMPLES[category] || []
    }
    
    return examples
  } catch (error) {
    console.error('Error obteniendo ejemplos personalizados:', error)
    // Fallback a ejemplos por defecto
    return DEFAULT_EXAMPLES[category] || []
  }
}

// Función para agregar un nuevo ejemplo
export async function addCustomExample(exampleData) {
  try {
    const client = await clientPromise
    const db = client.db(process.env.MONGODB_DB || 'miSaaS')
    const examplesCollection = db.collection('prompt_examples')
    
    const example = {
      ...exampleData,
      createdAt: new Date(),
      isActive: true,
      addedBy: exampleData.addedBy || 'admin'
    }
    
    const result = await examplesCollection.insertOne(example)
    return { success: true, id: result.insertedId }
  } catch (error) {
    console.error('Error agregando ejemplo personalizado:', error)
    return { success: false, error: error.message }
  }
}

// Función para construir la sección de ejemplos del prompt
export async function buildExamplesSection(category = 'articles', formData = {}) {
  const examples = await getCustomExamples(category, 2) // Máximo 2 ejemplos
  
  if (examples.length === 0) {
    return ''
  }
  
  let examplesSection = '\n\nEJEMPLOS DE REFERENCIA (Sigue este estilo y formato):\n\n'
  
  examples.forEach((example, index) => {
    examplesSection += `EJEMPLO ${index + 1}:\n${example.content}\n\n---\n\n`
  })
  
  examplesSection += `IMPORTANTE: Usa estos ejemplos como referencia para el estilo, estructura y tono, pero crea contenido original basado en: ${formData.topic || 'el tema proporcionado'}.\n`
  
  return examplesSection
}
