"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const policyReceiptSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    first_Name: { type: String, required: true },
    middle_Name: { type: String, required: false },
    last_Name: { type: String, required: false },
    suffix: { type: String, required: false },
    Date_of_Birth: { type: String, required: false },
    customer_id: { type: String, required: false },
    Email_Address: { type: String, required: false },
    Mobile_No: { type: String, required: true },
    Notification_Method: { type: String, required: true },
    Agent_Name: { type: String, required: true },
    Agent_Code: { type: String, required: true },
    Producer_Code: { type: String, required: false },
    Status: { type: String, required: false },
    Policy: { type: String, required: true },
    Product: { type: String, required: true },
    Trans_Type: { type: String, required: true },
    Office_Name: { type: String, required: true },
    Office_Code: { type: String, required: true },
    Office_City: { type: String, required: true },
    Island_Name: { type: String, required: true },
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    CustomerAvailability: { type: String, required: false },
    CC: { type: String, required: false },
    MO: { type: String, required: false },
    Cash: { type: String, required: false },
    Premium: { type: String, required: false },
    Fee: { type: String, required: false },
    Total: { type: String, required: false },
    Agent_Notes: { type: String, required: false },
    Billing_Address: {
        Address: { type: String, required: false },
        Apt: { type: String, required: false },
        Zip_Code: { type: String, required: false },
        City: { type: String, required: false },
        State: { type: String, required: false },
    },
    How_Did_You_Hear_About_Us: { type: String, required: false },
    Quoted_By: { type: String, required: false },
    Binded_By: { type: String, required: false },
    card_details: [{
            card_number: { type: String, required: false },
            card_expiry: { type: String, required: false },
            name_on_card: { type: String, required: false }
        }]
});
exports.default = mongoose_1.model('Receipts', policyReceiptSchema);
