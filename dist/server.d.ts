import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfiguration(): void;
    setMongoDB(): void;
    configureBodyParser(): void;
    enableCORS(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
