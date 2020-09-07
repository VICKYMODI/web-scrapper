"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quoteValidators = void 0;
const express_validator_1 = require("express-validator");
const Office_1 = require("../models/Office");
class quoteValidators {
    static createReceipt() {
        return [express_validator_1.body('first_Name', 'first_Name is required').isString().custom((first_Name, { req }) => {
                return Office_1.default.findOne({ 'first_Name': first_Name, 'last_name': req.body.last_name }).then(receipt => {
                    if (first_Name) {
                        throw new Error('Quotation already exisit');
                    }
                    else {
                        return;
                    }
                });
            })
        ];
    }
    static editReceipt() {
        return [express_validator_1.body('Email', 'Email is required').isEmail()];
    }
    static viewReceipt() {
        return [express_validator_1.body('macID', 'MAC ID is required').isString()];
    }
}
exports.quoteValidators = quoteValidators;
