import * as express from 'express';

import {baseRoute} from './routes/base.route';

// get express router
export const router: express.Router = express.Router();

// routes assignment
router.get('/encode', baseRoute.encodeAction);
