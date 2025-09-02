// src/app/blog/[slug]/page.tsx
// Esta página muestra un post individual del blog
// [slug] significa que es una ruta dinámica - el slug viene de la URL

// Importamos las funciones para obtener datos de posts
import { getPostData, getAllPostSlugs, formatDate, type PostData } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Props que recibe este componente desde Next.js
type PageProps = {
    params: {
        slug: string        // el slug viene de la URL /blog/[slug]
    }
}

// Esta función le dice a Next.js qué rutas generar en build time
export async function generateStaticParams() {
    const posts = getAllPostSlugs()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

export default async function PostPage({ params }: PageProps) {
    let post: PostData

    try {
        // Intentamos obtener el post basado en el slug de la URL
        post = await getPostData(params.slug)
    } catch (error) {
        // Si el post no existe, mostramos página 404
        notFound()
    }

    // Función helper para obtener categoría de tags
    const getCategory = (tags?: string[]): string => {
        if (!tags || tags.length === 0) return 'General'
        return tags[0].charAt(0).toUpperCase() + tags[0].slice(1)
    }

    return (
        <article className="max-w-3xl mx-auto">
            {/* Breadcrumb/navegación */}
            <nav className="mb-8">
                <Link href="/blog" className="text-blue-600 hover:text-blue-800 text-sm">
                    ← Volver al blog
                </Link>
            </nav>

            {/* Header del post */}
            <header className="mb-8">
                {/* Categoría */}
                <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 text-sm 
                        px-3 py-1 rounded-full font-medium">
                        {getCategory(post.tags)}
                    </span>
                </div>

                {/* Título principal */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {post.title}
                </h1>

                {/* Metadata del post */}
                <div className="flex items-center space-x-6 text-gray-600 text-sm">
                    <time>📅 {formatDate(post.date)}</time>
                    <span>⏱️ 5 min</span>
                    <span>👤 Tu nombre</span>
                </div>

                {/* Tags del post */}
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map(tag => (
                            <span
                                key={tag}
                                className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>

            {/* Contenido principal del post */}
            <div className="prose prose-lg max-w-none">
                {/* Renderizamos el HTML convertido desde markdown */}
                <div
                    className="prose-content"
                    dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                />
            </div>

            {/* Footer del post */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
                <div className="text-center">
                    <p className="text-gray-600 mb-4">
                        ¿Te gustó este post? ¡Sígueme para más contenido sobre TypeScript!
                    </p>
                    <a
                        href="/blog"
                        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg 
                            hover:bg-blue-700 transition-colors duration-200"
                    >
                        Ver más posts →
                    </a>
                </div>
            </footer>
        </article>
    )
}