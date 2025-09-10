// types/blog.ts
export interface BlogPost {
    id: string | number;
    title: string;
    content?: string;
    tags: string[];
    date: string | Date;
    slug?: string;
}

export interface BlogManagerProps {
    initialPosts?: BlogPost[];
}

// Utilidades de tipo para transformar datos
export type AstroPost = {
    slug: string;
    data: BlogPost;
    body: string;
    rendered?: {
        html: string;
    };
};