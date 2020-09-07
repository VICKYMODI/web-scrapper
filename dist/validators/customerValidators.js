"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerValidators = void 0;
const express_validator_1 = require("express-validator");
const Customer_1 = require("../models/Customer");
class customerValidators {
    static createCustomer() {
        return [express_validator_1.body('Mobile_No', 'Mobile_No is Required').isString().custom((Mobile_No, { req }) => {
                return Customer_1.default.findOne({ 'Mobile_No': Mobile_No }).then(customer => {
                    console.log(customer, "Customer found");
                    if (customer) {
                        throw new Error('Customer already exist');
                    }
                    else {
                        return;
                    }
                });
            })];
    }
    static editCustomer() {
        console.log("tyt");
        //
    }
    static getCustomer() {
        return [express_validator_1.query('id', 'id is required').isString().custom((id, { req }) => {
                return Customer_1.default.findOne({ "_id": id }).then(customer => {
                    if (customer) {
                        req.customer = customer;
                        return true;
                    }
                    else {
                        throw new Error("customer Doesnt exist");
                    }
                });
            })
        ];
    }
}
exports.customerValidators = customerValidators;
