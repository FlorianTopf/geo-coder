import * as express from 'express';
import * as nodeGeoCoder from 'node-geocoder';
import {geoCoderConfig} from '../configs/geo-coder.config';

class BaseRoute {
    public static getInstance (): BaseRoute {
        return new this();
    }

    public encodeAction (req: express.Request, res: express.Response, next: express.NextFunction): any {
        const query: string = req.query.search;

        if (!query) {
            res.sendStatus(400);
            return;
        }

        const geoCoderInstance: any = nodeGeoCoder(geoCoderConfig);
        geoCoderInstance.geocode(query)
            .then((response: any) => {
                res.json(response);
            })
            .catch((error: any) => {
                console.error(error);
                res.json(error);
            });
    }
}

export const baseRoute: BaseRoute = BaseRoute.getInstance();
