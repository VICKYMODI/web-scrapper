"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const macController_ts_1 = require("../Controller/macController.ts");
const MacValidator_1 = require("../validators/MacValidator");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
class macRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/getAllMac', Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, macController_ts_1.macController.getAllMac);
        this.router.get('/mac', Globalmiddleware_1.GlobalMiddleWare.authenticate, MacValidator_1.macValidators.getMac(), Globalmiddleware_1.GlobalMiddleWare.checkError, macController_ts_1.macController.getMac);
    }
    postRoutes() {
        this.router.post('/macID', Globalmiddleware_1.GlobalMiddleWare.authenticate, MacValidator_1.macValidators.macID(), Globalmiddleware_1.GlobalMiddleWare.checkError, macController_ts_1.macController.macID);
    }
    patchRoutes() {
        this.router.patch('/macID/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, MacValidator_1.macValidators.editmac(), Globalmiddleware_1.GlobalMiddleWare.checkError, macController_ts_1.macController.editMac);
    }
    deleteRoutes() {
    }
}
exports.default = new macRouter().router;
