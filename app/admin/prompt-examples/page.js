"use client"
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function PromptExamplesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [examples, setExamples] = useState([])
  const [loading, setLoading] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newExample, setNewExample] = useState({
    title: '',
    content: '',
    tone: 'profesional',
    length: 'medio',
    category: 'articles',
    description: ''
  })

  // Verificar autenticación
  useEffect(() => {
    if (status === 'loading') return
    if (!session || (session.user.plan !== 'admin' && session.user.email !== 'user@test.com')) {
      router.push('/login')
    }
  }, [session, status, router])

  // Cargar ejemplos existentes
  const loadExamples = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/prompt-examples')
      const data = await response.json()
      
      if (data.success) {
        setExamples(data.examples)
      }
    } catch (error) {
      console.error('Error cargando ejemplos:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session && (session.user?.plan === 'admin' || session.user?.email === 'user@test.com')) {
      loadExamples()
    }
  }, [session])

  // Agregar nuevo ejemplo
  const handleAddExample = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await fetch('/api/admin/prompt-examples', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExample),
      })

      const data = await response.json()
      
      if (data.success) {
        setNewExample({
          title: '',
          content: '',
          tone: 'profesional',
          length: 'medio',
          category: 'articles',
          description: ''
        })
        setShowAddForm(false)
        loadExamples() // Recargar lista
        alert('Ejemplo agregado exitosamente!')
      } else {
        alert('Error: ' + data.error)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error agregando ejemplo')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading') {
    return <div className="p-8">Cargando...</div>
  }

  if (!session || (session.user.plan !== 'admin' && session.user.email !== 'user@test.com')) {
    return <div className="p-8">No autorizado</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Ejemplos para Prompts
          </h1>
          <p className="text-gray-600">
            Agrega tus artículos de ejemplo para que OpenAI genere contenido similar a tu estilo.
          </p>
        </div>

        {/* Botón para agregar */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {showAddForm ? 'Cancelar' : 'Agregar Nuevo Ejemplo'}
          </button>
        </div>

        {/* Formulario para agregar */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Ejemplo</h2>
            <form onSubmit={handleAddExample} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título del Artículo
                </label>
                <input
                  type="text"
                  value={newExample.title}
                  onChange={(e) => setNewExample({...newExample, title: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Ej: Cómo dominar el marketing digital"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido Completo (con formato Markdown)
                </label>
                <textarea
                  value={newExample.content}
                  onChange={(e) => setNewExample({...newExample, content: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 h-64"
                  placeholder={`# Título del Artículo

Párrafo inicial...

## Subtítulo 1

Contenido del subtítulo...

## Conclusión

Párrafo final.

#hashtag1 #hashtag2`}
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tono</label>
                  <select
                    value={newExample.tone}
                    onChange={(e) => setNewExample({...newExample, tone: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="profesional">Profesional</option>
                    <option value="conversacional">Conversacional</option>
                    <option value="autoridad">Autoridad</option>
                    <option value="motivacional">Motivacional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitud</label>
                  <select
                    value={newExample.length}
                    onChange={(e) => setNewExample({...newExample, length: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="corto">Corto</option>
                    <option value="medio">Medio</option>
                    <option value="largo">Largo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={newExample.category}
                    onChange={(e) => setNewExample({...newExample, category: e.target.value})}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  >
                    <option value="articles">Artículos</option>
                    <option value="posts">Posts</option>
                    <option value="biography">Biografías</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción (opcional)
                </label>
                <input
                  type="text"
                  value={newExample.description}
                  onChange={(e) => setNewExample({...newExample, description: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Breve descripción del ejemplo"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? 'Agregando...' : 'Agregar Ejemplo'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de ejemplos existentes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Ejemplos Actuales ({examples.length})</h2>
          </div>
          
          {loading ? (
            <div className="p-6 text-center">Cargando ejemplos...</div>
          ) : examples.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No hay ejemplos. Agrega el primero para empezar a personalizar los prompts.
            </div>
          ) : (
            <div className="divide-y">
              {examples.map((example, index) => (
                <div key={index} className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900">{example.title}</h3>
                    <div className="flex gap-2 text-sm text-gray-500">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {example.tone}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
                        {example.length}
                      </span>
                    </div>
                  </div>
                  
                  {example.description && (
                    <p className="text-gray-600 mb-3">{example.description}</p>
                  )}
                  
                  <div className="bg-gray-50 rounded p-4">
                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                      {example.content.substring(0, 300)}
                      {example.content.length > 300 && '...'}
                    </pre>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    Agregado: {new Date(example.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
