// components/BlogManager.tsx
import React, { useState, useEffect } from 'react';

// Interfaces TypeScript
interface BlogPost {
    id: string | number;
    title: string;
    content?: string;
    tags: string[];
    date: string | Date;
    slug?: string;
}

interface BlogManagerProps {
    initialPosts?: BlogPost[];
}

const BlogManager: React.FC<BlogManagerProps> = ({ initialPosts = [] }) => {
    const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
    const [otherPosts, setOtherPosts] = useState<BlogPost[]>([]);

    // Función para formatear fecha
    const formatDate = (dateString: string | Date): string => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Inicializar posts al cargar el componente
    useEffect(() => {
        if (initialPosts.length > 0) {
            setFeaturedPost(initialPosts[0]);
            setOtherPosts(initialPosts.slice(1));
        }
    }, [initialPosts]);

    // Función para intercambiar posts
    const swapPosts = (selectedPost: BlogPost): void => {
        if (!featuredPost || !selectedPost) return;

        // Crear nuevos arrays sin mutar los originales
        const newOtherPosts = otherPosts.map(post =>
            post.id === selectedPost.id ? featuredPost : post
        );

        // Actualizar estados
        setFeaturedPost(selectedPost);
        setOtherPosts(newOtherPosts);
    };

    // Función para limpiar HTML tags del contenido
    const stripHtml = (html: string): string => {
        if (typeof document === 'undefined') return html; // SSR safety

        const tmp = document.createElement("div");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    };

    // Función para obtener preview del contenido
    const getContentPreview = (content: string | undefined, maxLength: number = 100): string => {
        if (!content) return "";

        const cleanContent = stripHtml(content);
        return cleanContent.length > maxLength
            ? `${cleanContent.substring(0, maxLength)}...`
            : cleanContent;
    };

    if (!featuredPost) {
        return (
            <div style={{
                color: 'white',
                textAlign: 'center',
                padding: '20px',
                fontFamily: 'SF Pro Text'
            }}>
                Cargando posts...
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            fontFamily: 'SF Pro Text'
        }}>
            {/* Header del Blog */}
            <h2 style={{ fontFamily: 'SF Pro' }} className="blog">Blog</h2>

            {/* Sección de Última Entrada */}
            <div className="content-block">
                <h2 className="section-title">Última entrada ⇂</h2>
            </div>

            <nav className="last">
                <article>
                    <h1>{featuredPost.title}</h1>

                    {/* Contenido del post */}
                    {featuredPost.content && (
                        <div dangerouslySetInnerHTML={{ __html: featuredPost.content }} />
                    )}

                    {/* Tags */}
                    <div className="tags">
                        <p>Tags:</p>
                        {featuredPost.tags.map((tag: string, index: number) => (
                            <span key={index} className="tag">{tag}</span>
                        ))}
                    </div>

                    {/* Fecha */}
                    <div className="date">
                        <p>{formatDate(featuredPost.date)}</p>
                    </div>
                </article>
            </nav>

            {/* Sección de Otras Entradas */}
            <div className="content-block section-spacing">
                <h2 className="section-title">Otras entradas ⇂</h2>
            </div>

            <section className="content-block entries-grid">
                {otherPosts.map((post: BlogPost) => (
                    <div
                        key={post.id}
                        className="entry-card interactive"
                        onClick={() => swapPosts(post)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                swapPosts(post);
                            }
                        }}
                        aria-label={`Destacar entrada: ${post.title}`}
                    >
                        <h3>{post.title}</h3>

                        {/* Preview del contenido */}
                        {post.content && (
                            <p className="post-preview">
                                {getContentPreview(post.content, 100)}
                            </p>
                        )}

                        {/* Tags */}
                        <div className="tags">
                            {post.tags.map((tag: string, index: number) => (
                                <span key={index} className="tag">{tag}</span>
                            ))}
                        </div>

                        {/* Fecha */}
                        <div className="date">
                            <p>{formatDate(post.date)}</p>
                        </div>
                    </div>
                ))}
            </section>

            <div className="content-block"></div>

            {/* Footer */}
            <footer className="footer">
                <p>© {new Date().getFullYear()} Blog — CarlosAVargas7</p>
                <a
                    href="https://github.com/carlosavargas7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                    aria-label="GitHub"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                    >
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56A10.99 10.99 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z"></path>
                    </svg>
                </a>
            </footer>
        </div>
    );
};

export default BlogManager;