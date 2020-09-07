"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.officeValidators = void 0;
const express_validator_1 = require("express-validator");
const Office_1 = require("../models/Office");
const Mac_1 = require("../models/Mac");
const Admin_1 = require("../models/Admin");
class officeValidators {
    static office() {
        return [express_validator_1.body('Email', 'Office Email is required').isEmail().custom((email, { req }) => {
                return Office_1.default.findOne({ 'Email': email }).then(office => {
                    if (office) {
                        throw new Error('Office already exist');
                    }
                    else {
                        return;
                    }
                });
            }),
            express_validator_1.body('office_no', 'Office Number is required').isNumeric(),
            express_validator_1.body('address', 'Office Address is required').isString(),
            express_validator_1.body('city_name', 'city_name is required').isString(),
            express_validator_1.body('state', 'state is required').isString(),
            express_validator_1.body('zip_code', 'zip_code is required').isNumeric(),
            express_validator_1.body('contact_person_name', 'contact_person_name is required').isString(),
            express_validator_1.body('contact_no', 'contact_no is required').isString(),
            express_validator_1.body('office_island', 'office_island is required').isString(),
            express_validator_1.body('office_name', 'Office Name is required').isString(),
        ];
    }
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
    static editOffice() {
        console.log("tyt");
        return [express_validator_1.body('Email', 'Email is required').isEmail()];
    }
    static editmac() {
        return [express_validator_1.body('Mac_id', 'MAC ID is required').isString()];
    }
    static createAdmin() {
        return [express_validator_1.body('username', 'username is Required').isString()
                .custom((username, { req }) => {
                return Admin_1.default.findOne({ 'Username': username }).then(admin => {
                    if (admin) {
                        throw new Error('Admin already exist');
                    }
                    else {
                        return;
                    }
                });
            }), express_validator_1.body('password', 'Password is Required').isAlphanumeric()
        ];
    }
    static loginAdmin() {
        return [express_validator_1.query('username', 'username is Required').isString()
                .custom((username, { req }) => {
                return Admin_1.default.findOne({ 'Username': username }).then(admin => {
                    if (admin) {
                        req.admin = admin;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric(),
            express_validator_1.query('macid', 'MACID is required').isString()
        ];
    }
    static getOffice() {
        return [express_validator_1.query('id', 'id is required').isString().custom((id, { req }) => {
                return Office_1.default.findOne({ "_id": id }).then(office => {
                    if (office) {
                        req.office = office;
                        return true;
                    }
                    else {
                        throw new Error("REceipt Doesnt exist");
                    }
                });
            })
        ];
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
exports.officeValidators = officeValidators;
