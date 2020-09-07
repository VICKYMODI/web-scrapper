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
exports.officeController = void 0;
const Office_1 = require("../models/Office");
const Admin_1 = require("../models/Admin");
const Mac_1 = require("../models/Mac");
const Mac_2 = require("../models/Mac");
class officeController {
    static office(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //office start
            const newOfficeData = {
                office_name: req.body.office_name,
                office_no: req.body.office_no,
                city_name: req.body.city_name,
                Address: req.body.address,
                state: req.body.state,
                Status: "Active",
                zip_code: req.body.zip_code,
                contact_person_name: req.body.contact_person_name,
                contact_no: req.body.contact_no,
                Email: req.body.Email,
                office_location: req.body.office_location,
                office_island: req.body.office_island,
                created_at: new Date(),
                updated_at: new Date(),
                insurance_site_credentials: {
                    aggressive: {
                        producer_code: req.body.insurance_site_credentials.aggressive.producer_code,
                        login: req.body.insurance_site_credentials.aggressive.login,
                        password: req.body.insurance_site_credentials.aggressive.password
                    },
                    AAAA: {
                        producer_code: req.body.insurance_site_credentials.AAAA.producer_code,
                        login: req.body.insurance_site_credentials.AAAA.login,
                        password: req.body.insurance_site_credentials.AAAA.password
                    }
                }
            };
            try {
                console.log("test1", newOfficeData);
                let addOffice = yield new Office_1.default(newOfficeData).save();
                console.log("test2", addOffice);
                res.send({
                    status_code: 200,
                    data: addOffice
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static macID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMacData = {
                Mac_id: req.body.Mac_id,
                Office_name: req.body.Office_name,
                Office_island: req.body.Office_island,
                Computer_no: req.body.Computer_no,
                Status: "Active",
            };
            try {
                let mac = yield new Mac_1.default(newMacData).save();
                res.send({
                    status_code: 200,
                    data: mac
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editOffice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            console.log("test123");
            try {
                const updateOffice = yield Office_1.default.findOneAndUpdate({ _id: ID }, {
                    office_name: req.body.office_name,
                    Office_no: req.body.Office_no,
                    city_name: req.body.city_name,
                    Address: req.body.address,
                    Status: req.body.Status,
                    state: req.body.state,
                    zip_code: req.body.zip_code,
                    contact_person_name: req.body.contact_person_name,
                    contact_no: req.body.contact_no,
                    Email: req.body.Email,
                    office_location: req.body.office_location,
                    office_island: req.body.office_island,
                    updated_at: new Date(),
                    insurance_site_credentials: {
                        aggressive: {
                            producer_code: req.body.insurance_site_credentials.aggressive.producer_code,
                            login: req.body.insurance_site_credentials.aggressive.login,
                            password: req.body.insurance_site_credentials.aggressive.password
                        },
                        AAAA: {
                            producer_code: req.body.insurance_site_credentials.AAAA.producer_code,
                            login: req.body.insurance_site_credentials.AAAA.login,
                            password: req.body.insurance_site_credentials.AAAA.password
                        }
                    }
                }, { new: true });
                if (updateOffice) {
                    res.send({
                        status_code: 200,
                        data: updateOffice
                    });
                }
                else {
                    throw new Error("Office Doesnt exist");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editMac(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            try {
                const updateMac = yield Mac_2.default.findOneAndUpdate({ _id: ID }, {
                    Mac_id: req.body.Mac_id,
                    Office_no: req.body.Office_no,
                    Status: req.body.Status,
                    Office_island: req.body.Office_island,
                    Computer_no: req.body.Computer_no,
                    updated_at: new Date(),
                }, { new: true });
                if (updateMac) {
                    res.send({
                        status_code: 200,
                        data: updateMac
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
    static getAllMac(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllMac = yield Mac_1.default.find();
                if (getAllMac) {
                    res.send(getAllMac);
                }
                else {
                    throw new Error("No MAC found");
                }
            }
            catch (e) {
                next(e);
            }
        });
    }
    static getAllOffice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getAllOffice = yield Office_1.default.find();
                if (getAllOffice) {
                    res.send(getAllOffice);
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
    //create admin
    static createAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAdminData = {
                username: req.body.username,
                password: req.body.password,
                admin_Type: "SupderAdmin"
            };
            try {
                let mac = yield new Admin_1.default(newAdminData).save();
                res.send(mac);
            }
            catch (e) {
                next(e);
            }
        });
    }
    static loginAdmin(req, res, next) {
        const username = req.query.username;
        const password = req.query.password;
        res.send({
            status_code: 200,
            data: req.admin
        });
        // Bcrypt.compare(password,req.agent.password,((err,isValid)=>{
        //      if(err){
        //         next(new Error(err.message))
        //      }else if(!isValid){
        //         next(new Error('Username & Password doesnt match'))
        //      } else{
        //         const data={
        //         }
        //         //Jwt.sign()
        //         //res.send(req.agent)
        //      }
        // }))
    }
    static getOffice(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.query.ID;
            res.send(req.office);
        });
    }
    static getMac(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const macID = req.query.macID;
            res.send(req.mac);
        });
    }
}
exports.officeController = officeController;
