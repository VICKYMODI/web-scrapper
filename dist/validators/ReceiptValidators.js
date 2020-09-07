"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.receiptValidators = void 0;
const express_validator_1 = require("express-validator");
const Agent_1 = require("../models/Agent");
const Customer_1 = require("../models/Customer");
class receiptValidators {
    static createPolicyReceipt() {
        return [express_validator_1.body('Policy', 'Policy is required').isString(), express_validator_1.param('id').custom((id, { req }) => {
                return Agent_1.default.findOne({ '_id': id }).then(agent => {
                    if (agent) {
                        req.agent = agent;
                        return true;
                    }
                    else {
                        throw new Error("Agent doesnt exist");
                    }
                });
            }),
            express_validator_1.body('customer_id', 'Customer ID is required').isString().custom((customer_id, { req }) => {
                return Customer_1.default.findOne({ '_id': customer_id }).then(customer => {
                    if (customer) {
                        req.customer = customer;
                        return true;
                    }
                    else {
                        throw new Error("Customer doesnt exisit");
                    }
                });
            })
        ];
    }
    static editPolicyReceipt() {
        return [express_validator_1.body('Policy', 'Policy is required').isString()];
    }
    static getReceipt() {
        return [express_validator_1.body('Email', 'Email is required').isEmail()];
    }
    static getAllPolicyReceipts() {
        return [express_validator_1.query('Policy', 'Policy is required').isString()];
    }
}
exports.receiptValidators = receiptValidators;
