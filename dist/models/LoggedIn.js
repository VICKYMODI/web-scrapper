"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const loggedin = new mongoose.Schema({
    token: { type: String, required: true },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    isLoggedIn: { type: Boolean, required: true, default: false },
    Username: { type: String, required: true },
    PersonalEmail: { type: String, required: true },
    LoginType: { type: String, required: true },
    OfficeName: { type: String, required: false },
    OfficeIsland: { type: String, required: false },
    OfficeEmail: { type: String, required: true },
}, {
    collation: { locale: 'en', strength: 2 }
});
exports.default = mongoose_1.model('LoggedIn', loggedin);
