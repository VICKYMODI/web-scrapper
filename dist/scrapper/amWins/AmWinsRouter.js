"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AmWinsController_1 = require("./AmWinsController");
class amWinsRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/getSrapperAmWins', AmWinsController_1.amWinsController.getScrapAmWins);
    }
    // postRoutes(){
    //     this.router.post('/macID',GlobalMiddleWare.authenticate,macValidators.macID(),GlobalMiddleWare.checkError,macController.macID);
    // }
    // patchRoutes(){
    //     this.router.patch('/macID/edit/:id',GlobalMiddleWare.authenticate,macValidators.editmac(), GlobalMiddleWare.checkError ,macController.editMac)
    // }
    deleteRoutes() {
    }
}
exports.default = new amWinsRouter().router;
