import { renderToStaticMarkup } from'react-dom/server';
import type { IncomingMessage, OutgoingMessage } from 'node:http';
import type { FC } from 'react';

const ServerComponent: FC = () => {
    return <h1>Hello World, from server component</h1>;
}

export const GET = async (req: IncomingMessage, res: OutgoingMessage) => {
    const html = renderToStaticMarkup(<ServerComponent />);
    res.setHeader('Content-Type', 'text/html');
    res.end(html);
};