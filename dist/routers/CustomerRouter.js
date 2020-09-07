"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customerController_1 = require("../Controller/customerController");
const customerValidators_1 = require("../validators/customerValidators");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
class customerRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/getAllCustomer', Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, customerController_1.customerController.getAllCustomer);
        this.router.get('/customer', Globalmiddleware_1.GlobalMiddleWare.authenticate, customerValidators_1.customerValidators.getCustomer(), Globalmiddleware_1.GlobalMiddleWare.checkError, customerController_1.customerController.getCustomer);
    }
    postRoutes() {
        this.router.post('/customer/add', Globalmiddleware_1.GlobalMiddleWare.authenticate, customerValidators_1.customerValidators.createCustomer(), Globalmiddleware_1.GlobalMiddleWare.checkError, customerController_1.customerController.createCustomerProfile);
    }
    patchRoutes() {
        this.router.patch('/customer/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, Globalmiddleware_1.GlobalMiddleWare.checkError, customerController_1.customerController.editCustomerProfile);
    }
    deleteRoutes() {
    }
}
exports.default = new customerRouter().router;
