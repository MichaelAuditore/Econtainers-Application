import 'zone.js/dist/zone-node';

import * as cors from "cors"
import * as express from 'express';
import { json, urlencoded } from 'body-parser'
import * as morgan from 'morgan'
import * as request from "request"




// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
    const server = express();

    server.disable('x-powered-by')
    server.use(cors())
    server.use(json())
    server.use(urlencoded({ extended: true }))
    server.use(morgan('dev'))

    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)

    // All regular routes use the Universal engine
    server.get('/api/getHeroes', (req, res) => {
        request.get('https://akabab.github.io/superhero-api/api/all.json', (err, httpResponse, body) => {
            let heroes = [];
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener los heroes',
                    err
                })
            }
            let bodyRes = JSON.parse(body);
            let randomNumber = Math.floor(Math.random() * bodyRes.length)
            const limit = randomNumber + 20;
            for (; randomNumber < limit; randomNumber++) {
                heroes.push(bodyRes[randomNumber]);
            }
            return res.status(200).json({ response: heroes })
        })
    });

    server.get('/api/getHeroeById/:id', (req, res) => {
        const URL = `https://akabab.github.io/superhero-api/api/id/${req.params.id}.json`
        request.get(URL, (err, httpResponse, body) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener los heroes',
                    err
                })
            }
            return res.status(200).json({ response: body })
        })
    });

    server.get('/api/getHeroesByName/:name', (req, res) => {
        const URL = `https://akabab.github.io/superhero-api/api/all.json`
        request.get(URL, (err, httpResponse, body) => {
            let heroes = [];
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'No se pudo obtener los heroes',
                    err
                })
            }
            let bodyRes = JSON.parse(body);
            const { name } = req.params;
            if (!name) {
                return res.status(200).json({ response: bodyRes });
            } else {
                bodyRes.forEach((resp) => {
                    const name = resp["name"];
                    if (name.toLowerCase().startsWith(name.trim().toLowerCase())) {
                        heroes.push(resp);
                    }
                });
            }
            return res.status(200).json({ response: heroes });
        })
    });
    return server;
}

function run(): void {
    const port = process.env.PORT || 4000;

    // Start up the Node server
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}

export * from './src/main.server';