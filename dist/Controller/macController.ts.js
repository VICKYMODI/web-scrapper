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
exports.macController = void 0;
const Mac_1 = require("../models/Mac");
const Mac_2 = require("../models/Mac");
class macController {
    static macID(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMacData = {
                Mac_id: req.body.Mac_id,
                Office_name: req.body.Office_name,
                Office_island: req.body.Office_island,
                Computer_no: req.body.Computer_no,
                Status: "Active",
                Last_Download: "null"
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
    static getMac(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const macID = req.query.macID;
            res.send(req.mac);
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
                    Last_Download: req.body.Last_Download,
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
}
exports.macController = macController;
