"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const customerProfileSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    customer_id: { type: String, required: false },
    first_Name: { type: String, required: true },
    middle_Name: { type: String, required: false },
    last_Name: { type: String, required: true },
    suffix: { type: String, required: false },
    Date_of_Birth: { type: String, required: false },
    Policies: [{
            Policy: { type: String, required: false },
            Notes: [{
                    created_at: { type: String, required: false },
                    updated_at: { type: String, required: false },
                    created_by: { type: String, required: false },
                    User_Id: { type: String, required: false },
                    Note: { type: String, required: false }
                }]
        }],
    GLobal_Notes: {
        created_at: { type: String, required: false },
        updated_at: { type: String, required: false },
        created_by: { type: String, required: false },
        User_Id: { type: String, required: false },
        Note: { type: String, required: false }
    },
    Email_Address: { type: String, required: false },
    Mobile_No: { type: String, required: true },
    Office_Name: { type: String, required: true },
    Office_Code: { type: String, required: true },
    Office_City: { type: String, required: true },
    Island_Name: { type: String, required: true },
    How_Did_You_Hear_About_Us: { type: String, required: false },
    Quoted_By: { type: String, required: false },
    Card_Details: [{
            Card_Number: { type: String, required: false },
            Card_Expiry: { type: String, required: false },
            Name_On_Card: { type: String, required: false }
        }],
    Receipts: [
        {
            ReceiptID: { type: mongoose.Types.ObjectId, ref: 'receipts' }
        }
    ],
});
exports.default = mongoose_1.model('Customer', customerProfileSchema);
