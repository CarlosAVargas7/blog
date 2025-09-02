// src/app/blog/page.tsx
// Esta página muestra la lista completa de todos los posts del blog
// Se accede mediante la URL "/blog"

// Importamos las funciones para obtener posts desde archivos markdown
import { getSortedPostsData, formatDate, type PostMetadata } from '@/lib/posts'

export default function BlogPage() {
  // Obtenemos los posts reales desde los archivos markdown
  const posts: PostMetadata[] = getSortedPostsData()

  // Función helper para obtener las primeras palabras como excerpt
  function getExcerpt(title?: string | null) {
    const safe = String(title ?? 'conceptos clave').toLowerCase();
    return `Explorando ${safe} con ejemplos prácticos y casos de uso.`;
  }


  // Función helper para generar categoría basada en tags
  const getCategory = (tags?: string[]): string => {
    if (!tags || tags.length === 0) return 'General'
    return tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
  }

  return (
    <div className="space-y-8">
      {/* Header de la página del blog */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Todos mis posts sobre TypeScript
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Una colección de artículos donde documento mi aprendizaje,
          desde conceptos básicos hasta temas más avanzados.
        </p>
      </div>

      {/* Stats simples del blog */}
      <div className="flex justify-center space-x-8 text-center">
        <div>
          <div className="text-2xl font-bold text-blue-600">{posts.length}</div>
          <div className="text-sm text-gray-600">Posts</div>
        </div>
        <div>
          <div className="text-2xl font-bold text-green-600">
            {new Set(posts.flatMap(post => post.tags || [])).size}
          </div>
          <div className="text-sm text-gray-600">Tags</div>
        </div>
      </div>

      {/* Lista de posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          // Cada post es un card clickeable
          <article
            key={post.slug}
            className="border border-gray-200 rounded-lg p-6 hover:shadow-lg 
                    transition-shadow duration-200 bg-white"
          >
            {/* Header del post con categoría y tiempo de lectura */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-block bg-blue-100 text-blue-800 text-xs 
                            px-2 py-1 rounded-full font-medium">
                {getCategory(post.tags)}
              </span>
              <span className="text-sm text-gray-500">⏱️ 5 min</span>
            </div>

            {/* Título del post - es un link */}
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              <a
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 transition-colors duration-200"
              >
                {post.title}
              </a>
            </h2>

            {/* Excerpt/resumen del post */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {getExcerpt(post.title)}
            </p>

            {/* Tags del post */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Footer con fecha y botón de leer más */}
            <div className="flex items-center justify-between">
              <time className="text-sm text-gray-500">
                📅 {formatDate(post.date)}
              </time>

              <a
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium 
                        transition-colors duration-200"
              >
                Leer más →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Mensaje cuando no hay posts (por si borras todos) */}
      {posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            Aún no hay posts publicados. ¡El primero está en camino! 🚀
          </p>
        </div>
      )}
    </div>
  )
}

































