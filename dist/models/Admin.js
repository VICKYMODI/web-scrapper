"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin_Type: { type: String, required: true }
});
exports.default = mongoose_1.model('Admin', adminSchema);
