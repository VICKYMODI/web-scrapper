"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const officeController_1 = require("../Controller/officeController");
const OfficeValidators_1 = require("../validators/OfficeValidators");
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
        this.router.get('/getAllOffices', Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.getAllOffice);
        this.router.get('/getAllMac', Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.getAllMac);
        this.router.get('/adminLogin', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.loginAdmin(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.loginAdmin);
        this.router.get('/office', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.getOffice(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.getOffice);
        this.router.get('/mac', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.getMac(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.getMac);
    }
    postRoutes() {
        this.router.post('/office', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.office(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.office);
        this.router.post('/macID', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.macID(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.macID);
        this.router.post('/admin', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.createAdmin(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.createAdmin);
    }
    patchRoutes() {
        this.router.patch('/office/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.editOffice(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.editOffice);
        this.router.patch('/macID/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, OfficeValidators_1.officeValidators.editmac(), Globalmiddleware_1.GlobalMiddleWare.checkError, officeController_1.officeController.editMac);
    }
    deleteRoutes() {
    }
}
exports.default = new agentRouter().router;
