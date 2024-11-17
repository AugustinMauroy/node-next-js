import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { cwd } from 'node:process';
import { styleText } from 'node:util';

const routes_ext = ['js', 'jsx', 'ts', 'tsx'];

const APP_FS_PATH = path.resolve(cwd(), 'app');

try {
    await fs.access(APP_FS_PATH);
    const stat = await fs.stat(APP_FS_PATH);
    if (!stat.isDirectory()) {
        throw new Error('app is not a directory');
    }
} catch  {
    console.log(`${styleText(["bold", "red"], "Error:")} app directory not found`);
}

const glob_Routes = fs.glob(routes_ext.map(ext => `${APP_FS_PATH}/**/route.${ext}`));
let routes: { url: string, modulePath: string }[] = [];

for await (const route of glob_Routes) 
    // route have this pattern: /path/to/route.{js,jsx,ts,tsx}
    // need to have something like: /path/to/
    routes.push({
        url: route.replace(/\/route\.(js|jsx|ts|tsx)$/, '/').replace(APP_FS_PATH, ''),
        modulePath: route
    });

const server = http.createServer();

server.listen(3000, () => {
    console.log(`${styleText(["bold", "green"], "Server started at http://localhost:3000")}`);
});

server.addListener('request', async (req, res) => {
    // @todo: fix trailing slash
    const url = req.url;

    if (!url) {
        res.writeHead(404);
        res.write('Not Found (no url)');
        res.end();
        return;
    }
    let route = routes.find(route => route.url === url);

    if (!route) {
        res.writeHead(404);
        res.write('Not Found (no route)');
        res.end();
        return;
    }

    const routeModule = await import(route.modulePath);    

    switch (req.method) {
        case 'GET':
            if (routeModule.GET) {
                routeModule.GET(req, res);
                return;
            } else {
                res.writeHead(405);
                res.write('Not Found (GET method not found)');
                res.end();
            }
            break;
        case 'POST':
            if (routeModule.POST) {
                routeModule.POST(req, res);
                return;
            } else {
                res.writeHead(405);
                res.write('Not Found (POST method not found)');
                res.end();
            }
            break;
        default:
            res.writeHead(405);
            res.write('Not Found (method not found)');
            res.end();
            break;
    }
    
    res.writeHead(404);
    res.write('Not Found');
    res.end();
});
