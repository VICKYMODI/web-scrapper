"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.macValidators = void 0;
const express_validator_1 = require("express-validator");
const Mac_1 = require("../models/Mac");
class macValidators {
    static macID() {
        return [express_validator_1.body('Mac_id', 'MacId is required').isString().custom((macid, { req }) => {
                return Mac_1.default.findOne({ 'Mac_id': macid }).then(mac => {
                    if (mac) {
                        throw new Error("This Mac is already registerted");
                    }
                    else {
                        return;
                    }
                });
            })];
    }
    static editmac() {
        return [express_validator_1.body('Mac_id', 'MAC ID is required').isString()];
    }
    static getMac() {
        return [express_validator_1.query('macId', 'macId is required').isString().custom((macId, { req }) => {
                return Mac_1.default.findOne({ "Mac_id": macId }).then(mac => {
                    if (mac) {
                        req.mac = mac;
                        return true;
                    }
                    else {
                        throw new Error("MAC Doesnt exist");
                    }
                });
            })
        ];
    }
}
exports.macValidators = macValidators;
