"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const QuoteController_1 = require("../Controller/QuoteController");
const QuoteValidator_1 = require("../validators/QuoteValidator");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
class quoteRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        //this.router.post('/office/:id',quoteValidators.viewReceipt(),GlobalMiddleWare.checkError,quoteController.viewReceipt);
    }
    postRoutes() {
        this.router.post('/receipt', Globalmiddleware_1.GlobalMiddleWare.authenticate, QuoteValidator_1.quoteValidators.createReceipt(), Globalmiddleware_1.GlobalMiddleWare.checkError, QuoteController_1.quoteController.createReceipt);
    }
    patchRoutes() {
        this.router.patch('/office/edit/:id', Globalmiddleware_1.GlobalMiddleWare.authenticate, QuoteValidator_1.quoteValidators.editReceipt(), Globalmiddleware_1.GlobalMiddleWare.checkError, QuoteController_1.quoteController.editReceipt);
    }
    deleteRoutes() {
    }
}
exports.default = new quoteRouter().router;
