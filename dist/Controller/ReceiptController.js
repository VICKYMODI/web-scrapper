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
exports.receiptController = void 0;
const Receipt_1 = require("../models/Receipt");
const Customer_1 = require("../models/Customer");
const csv = require('csv-parser');
const fs = require('fs');
class receiptController {
    static createPolicyReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const agent = req.agent;
                const customer = req.customer;
                console.log("test", agent);
                console.log("test2", customer);
                const addReceipt = yield new Receipt_1.default({
                    suffix: req.body.suffix,
                    first_Name: req.body.first_Name,
                    middle_Name: req.body.middle_Name,
                    last_Name: req.body.last_Name,
                    created_at: new Date(),
                    updated_at: new Date(),
                    Date_of_Birth: req.body.Date_of_Birth,
                    Billing_Address: {
                        Address: req.body.Billing_Address.Address,
                        Apt: req.body.Billing_Address.Apt,
                        Zip_Code: req.body.Billing_Address.Zip_Code,
                        City: req.body.Billing_Address.City,
                        State: req.body.Billing_Address.State,
                    },
                    Email_Address: req.body.Email_Address,
                    Mobile_No: req.body.Mobile_No,
                    Notification_Method: req.body.Notification_Method,
                    Agent_Name: req.body.Agent_Name,
                    Agent_Code: req.body.Agent_Code,
                    Producer_Code: req.body.Producer_Code,
                    Status: req.body.Status,
                    Policy: req.body.Policy,
                    customer_id: req.body.customer_id,
                    Product: req.body.Product,
                    Trans_Type: req.body.Trans_Type,
                    Office_Name: req.body.Office_Name,
                    Office_Code: req.body.Office_Code,
                    Office_City: req.body.Office_City,
                    Island_Name: req.body.Island_Name,
                    Date: req.body.Date,
                    Time: req.body.Time,
                    CustomerAvailability: req.body.CustomerAvailability,
                    CC: req.body.CC,
                    MO: req.body.MO,
                    Cash: req.body.Cash,
                    Premium: req.body.Cash,
                    Fee: req.body.Premium_Fee,
                    Total: req.body.Total,
                    Agent_Notes: req.body.Agent_Notes,
                    card_details: req.body.card_details,
                    How_Did_You_Hear_About_Us: req.body.How_Did_You_Hear_About_Us,
                    Quoted_By: req.body.Quoted_By,
                    Binded_By: req.body.Binded_By,
                });
                agent.Receipts.push(addReceipt);
                customer.Receipts.push(addReceipt);
                yield Promise.all([addReceipt.save(), agent.save()]);
                res.send({
                    status_code: 200,
                    data: addReceipt
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editPolicyReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            try {
                const updateReceipt = yield Receipt_1.default.findOneAndUpdate({ _id: ID }, {
                    suffix: req.body.suffix,
                    first_Name: req.body.first_Name,
                    middle_Name: req.body.middle_Name,
                    last_Name: req.body.last_Name,
                    updated_at: new Date(),
                    Date_of_Birth: req.body.Date_of_Birth,
                    Billing_Address: {
                        Address: req.body.Billing_Address.Address,
                        Apt: req.body.Billing_Address.Apt,
                        Zip_Code: req.body.Billing_Address.Zip_Code,
                        City: req.body.Billing_Address.City,
                        State: req.body.Billing_Address.State,
                    },
                    customer_id: req.body.customer_id,
                    Email_Address: req.body.Email_Address,
                    Mobile_No: req.body.Mobile_No,
                    Notification_Method: req.body.Notification_Method,
                    Agent_Code: req.body.Agent_Code,
                    Status: req.body.Status,
                    Agent_Name: req.body.Agent_Name,
                    Producer_Code: req.body.Producer_Code,
                    Policy: req.body.Policy,
                    Product: req.body.Product,
                    Trans_Type: req.body.Trans_Type,
                    Office_Name: req.body.Office_Name,
                    Office_Code: req.body.Office_Code,
                    Office_City: req.body.Office_City,
                    Island_Name: req.body.Island_Name,
                    Date: req.body.Date,
                    Time: req.body.Time,
                    CustomerAvailability: req.body.CustomerAvailability,
                    CC: req.body.CC,
                    MO: req.body.MO,
                    Cash: req.body.Cash,
                    Premium: req.body.Cash,
                    Fee: req.body.Premium_Fee,
                    Total: req.body.Total,
                    Agent_Notes: req.body.Agent_Notes,
                    How_Did_You_Hear_About_Us: req.body.How_Did_You_Hear_About_Us,
                    Quoted_By: req.body.Quoted_By,
                    Binded_By: req.body.Binded_By,
                }, { new: true });
                if (updateReceipt) {
                    res.send({
                        status_code: 200,
                        data: updateReceipt
                    });
                    //res.send(updateMac)
                }
                else {
                    throw new Error("MAC ID Doesnt exist");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
    static getReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.query.ID;
            res.send(req.receipt);
        });
    }
    static getAllReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllReceipts = yield Receipt_1.default.find();
                if (getAllReceipts) {
                    res.send(getAllReceipts);
                }
                else {
                    throw new Error("No Receipt found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getfilterreceipts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //const cutomerId = req.customer.customer_id
            const page = parseInt(req.query.page || 1);
            const officeName = req.query.OfficeName;
            const officeIsland = req.query.OfficeIsland;
            const policy = req.query.Policy;
            let receipts;
            let currentPage = page;
            let prevPage = page === 1 ? null : page - 1;
            let pageToken = page + 1;
            let totalPages;
            let receiptsCount;
            const perPage = parseInt(req.query.limit || 10);
            console.log("officeName", officeName);
            console.log('officeIsland', officeIsland);
            try {
                if (officeName) {
                    receiptsCount = yield Receipt_1.default.countDocuments({ Office_Name: officeName });
                    console.log("dataCount", receiptsCount);
                    totalPages = Math.ceil(receiptsCount / perPage);
                    if (totalPages === page || totalPages === 0) {
                        pageToken = null;
                    }
                    if (page > totalPages) {
                        throw Error('No More Receipt to show');
                    }
                    receipts = yield Receipt_1.default.aggregate([
                        { $match: { 'Office_Name': officeName } },
                        { $group: { _id: '$Policy', "doc": { "$first": "$$ROOT" } } },
                        { "$replaceRoot": { "newRoot": "$doc" } },
                        { $sort: { updated_at: -1 } },
                    ]).skip((perPage * page) - perPage).limit(perPage);
                    console.log("filterReceipts by OfficeName called");
                }
                if (officeIsland) {
                    receiptsCount = yield Receipt_1.default.countDocuments({ Island_Name: officeIsland });
                    totalPages = Math.ceil(receiptsCount / perPage);
                    if (totalPages === page || totalPages === 0) {
                        pageToken = null;
                    }
                    if (page > totalPages) {
                        throw Error('No More Receipt to show');
                    }
                    receipts = yield Receipt_1.default.aggregate([
                        { $match: { 'Island_Name': officeIsland } },
                        { $group: { _id: '$Policy', "doc": { "$first": "$$ROOT" } } },
                        { "$replaceRoot": { "newRoot": "$doc" } },
                        { $sort: { updated_at: -1 } },
                    ]).skip((perPage * page) - perPage).limit(perPage);
                }
                else if (officeName == undefined && officeIsland == undefined) {
                    receiptsCount = yield Receipt_1.default.estimatedDocumentCount();
                    totalPages = Math.ceil(receiptsCount / perPage);
                    if (totalPages === page || totalPages === 0) {
                        pageToken = null;
                    }
                    if (page > totalPages) {
                        throw Error('No More Receipt to show');
                    }
                    receipts = yield Receipt_1.default.find({}).
                        populate('receipts').sort({ 'updated_at': -1 }).skip((perPage * page) - perPage).limit(perPage);
                }
                res.json({
                    receipt: receipts,
                    pageToken: pageToken,
                    itemsCount: receiptsCount,
                    totalPages: totalPages,
                    currentPage: currentPage,
                    prevPage: prevPage
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static syncCustomerandReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let allReceipts = [];
                let AllCustomer = [];
                allReceipts = yield Receipt_1.default.find();
                console.log("test", allReceipts[0].first_Name);
                // Declare a new array 
                let newArray = [];
                // Declare an empty object 
                let uniqueObject = {};
                let customerObj = {};
                let objTitle;
                for (let i in allReceipts) {
                    // Extract the title 
                    objTitle = allReceipts[i]['Mobile_No'];
                    // Use the title as the index 
                    uniqueObject[objTitle] = allReceipts[i];
                }
                //     // Loop to push unique object into array 
                for (let i in uniqueObject) {
                    newArray.push(uniqueObject[i]);
                }
                console.log("length of customers", newArray.length);
                console.log("length of allReceipts", allReceipts.length);
                let user;
                for (let i = 0; i < newArray.length; i++) {
                    customerObj = {
                        first_Name: newArray[i].first_Name,
                        created_at: new Date(),
                        updated_at: new Date(),
                        middle_Name: newArray[i].middle_Name,
                        last_Name: newArray[i].last_Name,
                        suffix: newArray[i].suffix,
                        Date_of_Birth: newArray[i].Date_of_Birth,
                        Email_Address: newArray[i].Email_Address,
                        Mobile_No: newArray[i].Mobile_No,
                        Policies: [],
                        Office_Name: newArray[i].Office_Name,
                        Office_Code: newArray[i].Office_Code,
                        Office_City: newArray[i].Office_City,
                        Island_Name: newArray[i].Island_Name,
                        How_Did_You_Hear_About_Us: newArray[i].How_Did_You_Hear_About_Us,
                        Quoted_By: newArray[i].Quoted_By,
                        Card_Details: [{}]
                    };
                    user = yield new Customer_1.default(customerObj).save();
                    console.log("Processed Records", i);
                }
                res.send({
                    Customers: user
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static mappolicy(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const receitpfromDB = yield Receipt_1.default.find();
            const customerfromDB = yield Customer_1.default.find();
            var allReceipts = receitpfromDB;
            var unique_mobile_no = [];
            var mobile_receipts = [];
            allReceipts.filter((item, index) => __awaiter(this, void 0, void 0, function* () {
                if (index == 0) {
                    unique_mobile_no.push(item.Mobile_No);
                    mobile_receipts.push([{ Policy: item.Policy }]);
                }
                else {
                    let matched_mobile_no = false;
                    unique_mobile_no.filter((mobile_no, indx) => {
                        if (mobile_no == item.Mobile_No) {
                            matched_mobile_no = true;
                            let policy_exists = false;
                            mobile_receipts[indx].filter(policy => {
                                if (policy == item.Policy) {
                                    policy_exists = true;
                                }
                            });
                            if (!policy_exists) {
                                mobile_receipts[indx].push({ Policy: item.Policy });
                            }
                        }
                    });
                    if (!matched_mobile_no) {
                        yield unique_mobile_no.push(item.Mobile_No);
                        yield mobile_receipts.push([{ Policy: item.Policy }]);
                    }
                }
            }));
            console.log('unique_mobile_no', unique_mobile_no);
            console.log('mobile_receipts', mobile_receipts);
            for (let j = 0; j < unique_mobile_no.length; j++) {
                try {
                    const agent = yield Customer_1.default.findOneAndUpdate({ "Mobile_No": unique_mobile_no[j] }, {
                        Policies: mobile_receipts[j]
                    }, { new: true });
                }
                catch (e) {
                    next(e);
                }
                console.log("Processed Customers", j);
            }
            res.send({
                Success: true
            });
        });
    }
    static curtomertoreports(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const allReceipts = yield Receipt_1.default.find();
            const allCustomer = yield Customer_1.default.find();
            try {
                for (let i = 0; i < allReceipts.length; i++) {
                    for (let j = 0; j < allCustomer.length; j++) {
                        if (allReceipts[i].Mobile_No == allCustomer[j].Mobile_No) {
                            allReceipts[i].customer_id = allCustomer[j]._id;
                            console.log("receiptData", allReceipts[i]);
                            yield new Receipt_1.default(allReceipts[i]).save();
                            console.log("Processed Customers", j);
                        }
                    }
                    console.log("Processed Receipts", i);
                }
                res.send({ data: allReceipts });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllPolicyReceipts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            let Policy = req.query.Policy;
            try {
                const getCustomerAllReceipts = yield Receipt_1.default.find({ 'Policy': Policy });
                if (getCustomerAllReceipts) {
                    res.send({ status_code: 200, data: getCustomerAllReceipts });
                }
                else {
                    throw new Error("No receipts found");
                }
            }
            catch (e) {
            }
        });
    }
}
exports.receiptController = receiptController;
