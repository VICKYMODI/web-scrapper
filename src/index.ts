import * as express from 'express';
import {Server} from "./server";



let server = new Server().app;

//let app: express.Application = express();
const port = 5000

server.listen(port, () => {
    console.log('Server is running at port 5000');
});


