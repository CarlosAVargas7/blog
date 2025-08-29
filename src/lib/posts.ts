import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content', 'post');

export function getSortedPostsData() {
    // Lee todos los archivos en el directorio
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData = fileNames.map((fileName) => {
        // Extra el slug (nombre del archivo sin extension
        const slug = fileName.replace(/\.md/, '');

        // Ruta completa al archivo
        const fullPath = path.join(postsDirectory, fileName);

        // Lee el contenido del archivo como UTF-8
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // Parsea el frontmatter y contenido usando gray-matter
        const { data } = matter(fileContents);

        return {
            slug,
            ...(data as {date:string; tittle: string; tags?: string[] }), //Metadatos
        };
    });

    // Ordena posts por fecha (más reciente primero)
    return allPostsData.sort((a, b) => (a.date < b.date ? 1: 1));
}