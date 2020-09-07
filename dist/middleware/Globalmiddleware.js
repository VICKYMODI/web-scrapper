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
exports.GlobalMiddleWare = void 0;
const express_validator_1 = require("express-validator");
const Jwt = require("jsonwebtoken");
const env_1 = require("../environment/env");
const LoggedIn_1 = require("../models/LoggedIn");
class GlobalMiddleWare {
    static checkError(req, res, next) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            next(new Error(error.array()[0].msg));
        }
        else {
            next();
        }
    }
    static authenticate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const authHeader = req.headers.authorization;
            const isLoggedIn = req.header.isLoggedIn;
            const token = authHeader ? authHeader : null;
            try {
                console.log(token);
                req.errorStatus = 401;
                Jwt.verify(token, env_1.getEnvironmentVariable().jwt_secret, ((err, decoded) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        console.log("t1", err);
                        next(err);
                    }
                    else if (!decoded) {
                        console.log("t2", decoded);
                        next(new Error('User Not Authorised'));
                    }
                    else {
                        const userdata = yield LoggedIn_1.default.findOne({ 'token': token });
                        console.log("userdata", userdata);
                        console.log("decoded", decoded);
                        if (userdata.isLoggedIn == true) {
                            req.agent = decoded;
                            next();
                        }
                        else {
                            next(new Error('Token Expired'));
                        }
                    }
                })));
            }
            catch (e) {
                next(e);
            }
        });
    }
}
exports.GlobalMiddleWare = GlobalMiddleWare;
