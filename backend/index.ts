import { fastify } from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
    reply.send("Hello via Bun!");
});

app.listen({ port: 3333 });