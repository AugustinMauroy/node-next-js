import type { IncomingMessage, OutgoingMessage } from 'node:http';

export const GET = async (req: IncomingMessage, res: OutgoingMessage) => {
    res.end('Hello World');
}