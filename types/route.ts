import type { IncomingMessage } from 'node:http';

export type RouteHandler = (req: IncomingMessage) => Response | Promise<Response>;