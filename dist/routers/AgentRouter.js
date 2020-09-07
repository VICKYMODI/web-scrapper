"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agentController_1 = require("../Controller/agentController");
const AgentValidators_1 = require("../validators/AgentValidators");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
class agentRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/send/varification/email', Globalmiddleware_1.GlobalMiddleWare.authenticate, agentController_1.agentController.resendVerification);
        this.router.get('/login', AgentValidators_1.agentValidators.login(), Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.login2);
        this.router.get('/getAllAgents', Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.getAllAgents);
        this.router.get('/agent', AgentValidators_1.agentValidators.getByid(), Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.getByid);
    }
    postRoutes() {
        this.router.post('/signup', AgentValidators_1.agentValidators.signup(), Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.signup);
    }
    patchRoutes() {
        this.router.patch('/verify', AgentValidators_1.agentValidators.verifyAgent(), Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.verify);
        this.router.patch('/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, AgentValidators_1.agentValidators.editAgent(), Globalmiddleware_1.GlobalMiddleWare.checkError, agentController_1.agentController.editAgent);
    }
    deleteRoutes() {
    }
}
exports.default = new agentRouter().router;
