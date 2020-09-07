"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerController = void 0;
const Customer_1 = require("../models/Customer");
class customerController {
    static createCustomerProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerProfile = {
                    suffix: req.body.suffix,
                    first_Name: req.body.first_Name,
                    middle_Name: req.body.middle_Name,
                    customer_id: req.body.customer_id,
                    last_Name: req.body.last_Name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    Date_of_Birth: req.body.Date_of_Birth,
                    Email_Address: req.body.Email_Address,
                    Mobile_No: req.body.Mobile_No,
                    Policies: req.body.Policies,
                    Office_Name: req.body.Office_Name,
                    Office_Code: req.body.Office_Code,
                    Office_City: req.body.Office_City,
                    Island_Name: req.body.Island_Name,
                    CustomerAvailability: req.body.CustomerAvailability,
                    How_Did_You_Hear_About_Us: req.body.How_Did_You_Hear_About_Us,
                    Quoted_By: req.body.Quoted_By,
                    Card_Details: [{
                            Card_Number: req.body.Card_Details.Card_Number,
                            Card_Expiry: req.body.Card_Details.Card_Expiry,
                            Name_On_Card: req.body.Card_Details.Name_On_Card
                        }],
                };
                let addCustomer = yield new Customer_1.default(customerProfile).save();
                res.send({
                    status_code: 200,
                    data: addCustomer
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editCustomerProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            let set = req.query.operation_mode;
            var ExisitingPolicy = [];
            let NewPolicies = [];
            try {
                if (set == 'update_policy_note') {
                    yield Customer_1.default.findOneAndUpdate({ _id: ID }, {
                        Policies: req.body.Policies
                    });
                    return res.send({
                        status_code: 200,
                        message: "Policy notes upated successfully"
                    });
                }
            }
            catch (e) {
                next();
            }
            try {
                if (set == 'update_global_note') {
                    yield Customer_1.default.findOneAndUpdate({ _id: ID }, {
                        GLobal_Notes: req.body.GLobal_Notes
                    });
                    return res.send({
                        status_code: 200,
                        message: "GLobal Policy notes upated successfully"
                    });
                }
            }
            catch (e) {
                next();
            }
            try {
                yield Customer_1.default.findOne({ _id: ID }).then((customer) => {
                    NewPolicies = customer.Policies;
                    console.log("policies", NewPolicies[0]);
                    for (let i = 0; i < NewPolicies.length; i++) {
                        if (NewPolicies[i].Policy == req.body.Policies[0].Policy) {
                            res.json({ message: "This policy already exist" });
                            return;
                        }
                    }
                    if (req.body.Policies.length > 1) {
                        NewPolicies = req.body.Policies;
                    }
                    else {
                        NewPolicies.push(req.body.Policies[0]);
                    }
                });
            }
            catch (e) {
                throw new Error("some error occured");
            }
            try {
                const updateCustomer = yield Customer_1.default.findOneAndUpdate({ _id: ID }, {
                    Policies: NewPolicies,
                    customer_id: req.body.customer_id,
                    suffix: req.body.suffix,
                    first_Name: req.body.first_Name,
                    middle_Name: req.body.middle_Name,
                    last_Name: req.body.last_Name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    Date_of_Birth: req.body.Date_of_Birth,
                    Email_Address: req.body.Email_Address,
                    Mobile_No: req.body.Mobile_No,
                    Mailing_Address: req.body.Mailing_Address,
                    Office_Name: req.body.Office_Name,
                    Office_Code: req.body.Office_Code,
                    Office_City: req.body.Office_City,
                    Island_Name: req.body.Island_Name,
                    Card_Details: req.body.Card_Details,
                    //  [{
                    //     Card_Number : req.body.Card_Details.Card_Number,
                    //     Card_Expiry : req.body.Card_Details.Card_Expiry,
                    //     Name_On_Card : req.body.Card_Details.Name_On_Card
                    // }],
                    How_Did_You_Hear_About_Us: req.body.How_Did_You_Hear_About_Us,
                }, { new: true });
                if (updateCustomer) {
                    res.send({
                        status_code: 200,
                        data: updateCustomer
                    });
                    //res.send(updateMac)
                }
                else {
                    throw new Error("Customer ID Doesnt exist");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.query.ID;
            res.send(req.customer);
        });
    }
    static getAllCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllCustomer = yield Customer_1.default.find();
                if (getAllCustomer) {
                    res.send(getAllCustomer);
                }
                else {
                    throw new Error("No Customer found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.customerController = customerController;
