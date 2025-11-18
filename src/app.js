import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import {resolve} from 'node:path';



import routes from './routes.js';
import './database/index.js';


class App {
    constructor () {
        this.app = express();

        this.app.use(cors());
        this.middlewares();

        this.routes();
    }

    middlewares() {
        this.app.use(express.json());

        this.app.use(
            '/product-file',
            express.static(resolve(__dirname, '..',  'uploads'))
        );

        this.app.use(
            '/category-file',
            express.static(resolve(__dirname, '..',  'uploads'))
        );
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app