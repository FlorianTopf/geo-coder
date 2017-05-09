const DEVELOPMENT_ENV: string = 'development';
const PRODUCTION_ENV: string = 'production';

const environment: string = process.env.NODE_ENV || DEVELOPMENT_ENV;

export function isProduction (): boolean {
    return environment === PRODUCTION_ENV;
}
