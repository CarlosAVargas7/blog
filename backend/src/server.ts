import Fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const app = Fastify();
const prisma = new PrismaClient();

app.get("/api/posts", async () => {
    return prisma.post.findMany();
});

await app.listen({ port: 3001, host: "0.0.0.0" });
console.log("Backend en http://localhost:3001");
