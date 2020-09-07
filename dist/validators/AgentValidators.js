"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentValidators = void 0;
const express_validator_1 = require("express-validator");
const Agent_1 = require("../models/Agent");
class agentValidators {
    static login() {
        return [express_validator_1.query('username', 'username is Required').isString()
                .custom((username, { req }) => {
                return Agent_1.default.findOne({ 'Username': username }).then(agent => {
                    if (agent) {
                        req.agent = agent;
                        return true;
                    }
                    else {
                        throw new Error('User Does Not Exist');
                    }
                });
            }), express_validator_1.query('password', 'Password is Required').isAlphanumeric(),
        ];
    }
    static getByid() {
        return [express_validator_1.query('id', 'id is required').isString().custom((id, { req }) => {
                return Agent_1.default.findOne({ "_id": id }).then(agent => {
                    if (agent) {
                        req.agent = agent;
                        return true;
                    }
                    else {
                        throw new Error("Agent Doesnt exist");
                    }
                });
            })
        ];
    }
    static signup() {
        return [express_validator_1.body('PersonalEmail', 'PersonalEmail is Required').isEmail().custom((email, { req }) => {
                return Agent_1.default.findOne({ 'PersonalEmail': email }).then(agent => {
                    console.log(agent, "agent found");
                    if (agent) {
                        throw new Error('Agent already exist');
                    }
                    else {
                        return;
                    }
                });
            }),
            express_validator_1.body('Username', 'Username is Required').isString().custom((username, { req }) => {
                return Agent_1.default.findOne({ 'Username': username }).then(agent => {
                    if (agent) {
                        throw new Error("Agent with this Username already exist");
                    }
                    else {
                        return;
                    }
                });
            }),
            express_validator_1.body('Password', 'Password is Required').isAlphanumeric().isLength({ min: 5, max: 20 }).withMessage('Password can be from 8-20 Characters only'),
        ];
    }
    static verifyAgent() {
        return [express_validator_1.body('verification_token', 'Verifcation Token is required').isNumeric()];
    }
    static resendVerificationEmail() {
        return [express_validator_1.query('email', 'Email is Required').isEmail()];
    }
    static editAgent() {
        return [express_validator_1.body('Username', 'Username is Required').isString().custom((username, { req }) => {
                return Agent_1.default.findOne({ 'username': username }).then(agent => {
                    if (agent) {
                        throw new Error("Agent with this Username already exist");
                    }
                    else {
                        return;
                    }
                });
            }),
        ];
    }
}
exports.agentValidators = agentValidators;
