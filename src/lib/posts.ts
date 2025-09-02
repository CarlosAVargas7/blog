// src/lib/posts.ts
// Funciones para manejar los posts del blog desde archivos markdown

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

// Directorio donde están los archivos markdown de los posts
const postsDirectory = path.join(process.cwd(),'src' , 'content', 'post');

// Tipo para definir la estructura de un post
export type PostMetadata = {
    slug: string
    date: string
    title: string      // Corregido
    tags?: string[]
}

export type PostData = PostMetadata & {
    contentHtml: string
}

/**
 * Obtiene todos los posts y los ordena por fecha (más reciente primero)
 * Esta función se usa en la página /blog para mostrar la lista de posts
 */
export function getSortedPostsData(): PostMetadata[] {
    // Lee todos los archivos en el directorio
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames
        .filter(fileName => fileName.endsWith('.md')) // Solo archivos .md
        .map((fileName) => {
            // Extrae el slug (nombre del archivo sin extensión)
            const slug = fileName.replace(/\.md$/, '');

            // Ruta completa al archivo
            const fullPath = path.join(postsDirectory, fileName);

            // Lee el contenido del archivo como UTF-8
            const fileContents = fs.readFileSync(fullPath, 'utf-8');

            // Parsea el frontmatter usando gray-matter
            const { data } = matter(fileContents);

            return {
                slug,
                ...(data as { date: string; title: string; tags?: string[] }), // Metadatos
            };
        });

    // Ordena posts por fecha (más reciente primero)
    // CORREGIDO: el bug estaba aquí (tenías 1 en lugar de -1)
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Obtiene todos los slugs de posts disponibles
 * Next.js usa esto para generar las rutas dinámicas [slug]
 */
export function getAllPostSlugs(): { slug: string }[] {
    const fileNames = fs.readdirSync(postsDirectory);

    return fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .map((fileName) => ({
            slug: fileName.replace(/\.md$/, ''), // Elimina la extensión .md
        }));
}

/**
 * Obtiene los datos completos de un post específico (incluyendo el HTML)
 * Se usa en las páginas individuales de posts /blog/[slug]
 */
export async function getPostData(slug: string): Promise<PostData> {
    // Construye la ruta al archivo usando el slug
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Extrae frontmatter y contenido
        const { data, content } = matter(fileContents);

        // Convierte Markdown a HTML usando remark
        const processedContent = await remark()
            .use(html, { sanitize: false }) // sanitize: false permite HTML crudo
            .process(content);
        const contentHtml = processedContent.toString();

        return {
            slug,
            contentHtml, // Contenido convertido a HTML
            ...(data as { date: string; title: string; tags?: string[] }), // Metadatos
        };
    } catch (error) {
        // Si el archivo no existe, lanza un error más descriptivo
        throw new Error(`No se pudo encontrar el post: ${slug}`);
    }
}

/**
 * Función helper para formatear fechas de manera consistente
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

/**
 * Función helper para calcular tiempo de lectura estimado
 * Asume ~200 palabras por minuto de lectura
 */
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);

    return `${readTime} min`;
}