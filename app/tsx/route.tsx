import { renderToStaticMarkup } from'react-dom/server';
import type { FC } from 'react';
import type { RouteHandler } from "~/types/route";

const ServerComponent: FC = () => {
    return <h1>Hello World, from server component</h1>;
}

export const GET: RouteHandler = (req) => {
    const html = renderToStaticMarkup(<ServerComponent />);
    return new Response(html, {
        headers: {
            'Content-Type': 'text/html'
        }
    });
};