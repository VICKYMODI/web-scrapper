import * as express from 'express';
import * as mongoose from 'mongoose';
import {getEnvironmentVariable} from './environment/env';
import agentRouter from './routers/AgentRouter';
import bodyParser = require('body-parser');
import cors = require('cors');
import AmWinsRouter from './routers/AmWinsRouter';
import connectRouter from './routers/connectRouter'

export class Server{

    public app : express.Application = express();

    constructor(){
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }

    setConfiguration(){

        this.setMongoDB();
        this.configureBodyParser();
        this.enableCORS();
        
    }

    setMongoDB(){

        
        mongoose.connect(getEnvironmentVariable().db_url,{useNewUrlParser:true, useUnifiedTopology: true}).then(
            ()=> {
                console.log("MongoDB is connected")
            }).catch((error)=>{
                console.log(error)
            })
    }

    configureBodyParser(){
        this.app.use(bodyParser.json())

        
    }

    enableCORS(){
        const options: cors.CorsOptions = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
            };
            
            this.app.use(cors(options));
    }

    setRoutes(){

        this.app.use('/api/amwins',AmWinsRouter);

    }

    error404Handler(){
        this.app.use((req, res)=>{
            res.status(404).json({
                message :"Invalid endpoint",
                status_code : "404"
            });
        })
    }

    handleErrors(){
        this.app.use((error,req,res,next)=>{
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message:error.message || 'Something went wrong',
                status_code:errorStatus
            })
        });
    }

}