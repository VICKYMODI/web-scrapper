"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const macSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    Mac_id: { type: String, required: true },
    Office_name: { type: String, required: true },
    Office_island: { type: String, required: true },
    Computer_no: { type: String, required: true },
    Status: { type: String, required: true },
    Last_Download: { type: String, required: false },
});
exports.default = mongoose_1.model('Mac', macSchema);
