"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ReceiptController_1 = require("../Controller/ReceiptController");
const ReceiptValidators_1 = require("../validators/ReceiptValidators");
const Globalmiddleware_1 = require("../middleware/Globalmiddleware");
class receiptRouter {
    constructor() {
        this.router = express_1.Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }
    getRoutes() {
        this.router.get('/get', ReceiptValidators_1.receiptValidators.getReceipt(), Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.getReceipt);
        this.router.get('/getallreceipts', Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.getAllReceipt);
        this.router.get('/syncCustomerandReceipt', ReceiptController_1.receiptController.syncCustomerandReceipt);
        this.router.get('/mapPolicy', ReceiptController_1.receiptController.mappolicy);
        this.router.get('/getfilterreceipts', Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.getfilterreceipts);
        this.router.get('/curtomertoreports', Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.curtomertoreports);
        this.router.get('/policyReceipts', ReceiptValidators_1.receiptValidators.getAllPolicyReceipts(), Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.getAllPolicyReceipts);
    }
    postRoutes() {
        this.router.post('/add/:id', ReceiptValidators_1.receiptValidators.createPolicyReceipt(), Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.createPolicyReceipt);
    }
    patchRoutes() {
        this.router.patch('/edit/:id', ReceiptValidators_1.receiptValidators.editPolicyReceipt(), Globalmiddleware_1.GlobalMiddleWare.checkError, ReceiptController_1.receiptController.editPolicyReceipt);
    }
    deleteRoutes() {
    }
}
exports.default = new receiptRouter().router;
