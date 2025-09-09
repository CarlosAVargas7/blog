import { defineCollection, z } from "astro:content";

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        date: z.coerce.date(),    // convierte strings/fechas a Date
        tags: z.array(z.string()).optional()
    })
});

export const collections = { blog };
