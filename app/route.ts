import type { RouteHandler } from "~/types/route";

export const GET: RouteHandler = (req) => {
    return new Response('Hello World', {
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}