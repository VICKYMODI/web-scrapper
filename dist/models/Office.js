"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const officeSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    office_name: { type: String, required: true },
    office_no: { type: Number, required: true },
    Address: { type: String, required: true },
    city_name: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    contact_person_name: { type: String, required: true },
    contact_no: { type: String, required: true },
    Email: { type: String, required: true },
    office_island: { type: String, required: true },
    Status: { type: String, required: true },
    insurance_site_credentials: {
        aggressive: {
            producer_code: { type: String, required: true },
            login: { type: String, required: true },
            password: { type: String, required: true }
        },
        AAAA: {
            producer_code: { type: String, required: true },
            login: { type: String, required: true },
            password: { type: String, required: true }
        }
    }
});
exports.default = mongoose_1.model('Office', officeSchema);
