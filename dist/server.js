"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express = require("express");
const mongoose = require("mongoose");
const env_1 = require("./environment/env");
const AgentRouter_1 = require("./routers/AgentRouter");
const MacRouter_1 = require("./routers/MacRouter");
const OfficeRouter_1 = require("./routers/OfficeRouter");
const bodyParser = require("body-parser");
const QuoteRouter_1 = require("./routers/QuoteRouter");
const ReceiptRouter_1 = require("./routers/ReceiptRouter");
const cors = require("cors");
const CustomerRouter_1 = require("./routers/CustomerRouter");
const AmWinsRouter_1 = require("./scrapper/amWins/AmWinsRouter");
class Server {
    constructor() {
        this.app = express();
        this.setConfiguration();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfiguration() {
        this.setMongoDB();
        this.configureBodyParser();
        this.enableCORS();
    }
    setMongoDB() {
        mongoose.connect(env_1.getEnvironmentVariable().db_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
            console.log("MongoDB is connected");
        }).catch((error) => {
            console.log(error);
        });
    }
    configureBodyParser() {
        this.app.use(bodyParser.json());
    }
    enableCORS() {
        const options = {
            allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token", "Authorization"],
            credentials: true,
            methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
            origin: '*',
            preflightContinue: false
        };
        this.app.use(cors(options));
    }
    setRoutes() {
        this.app.use('/api/user', AgentRouter_1.default);
        this.app.use('/api/office-management', OfficeRouter_1.default);
        this.app.use('/api/mac-management', MacRouter_1.default);
        this.app.use('/api/customer-management', CustomerRouter_1.default);
        this.app.use('/api/quote', QuoteRouter_1.default);
        this.app.use('/api/receipt', ReceiptRouter_1.default);
        this.app.use('/api/amWinsRouter', AmWinsRouter_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: "Invalid endpoint",
                status_code: "404"
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message: error.message || 'Something went wrong',
                status_code: errorStatus
            });
        });
    }
}
exports.Server = Server;
