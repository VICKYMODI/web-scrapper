"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const agentSchema = new mongoose.Schema({
    verification_token_time: { type: Date, required: true },
    varification_token: { type: Number, required: true },
    varified: { type: Boolean, default: false },
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    Status: { type: String, required: true },
    isLoggedIn: { type: Boolean, required: true, default: false },
    Name: {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        middle_name: { type: String, required: false }
    },
    Receipts: [
        {
            ReceiptID: { type: mongoose.Types.ObjectId, ref: 'receipts' }
        }
    ],
    Username: { type: String, required: true, index: { background: true } },
    Password: { type: String, required: true },
    PersonalEmail: { type: String, required: true },
    LoginType: { type: String, required: true },
    DOB: { type: String, required: true },
    Phone_No: { type: String, required: true },
    Gender: { type: String, required: true },
    ID: { type: Number, required: true },
    JoiningDate: { type: Date, required: true },
    Role: { type: String, required: true },
    OfficeName: { type: String, required: false },
    OfficeIsland: { type: String, required: false },
    OfficeEmail: { type: String, required: true },
    Permission: {
        Update_fees_for_individual_policy_version: { type: Boolean, required: false, default: false },
        Fetch_all_office_reports: { type: Boolean, required: false, default: false },
        Permission_to_generate_CSV_report: { type: Boolean, required: false, default: false },
        Permission_to_generate_all_date_report: { type: Boolean, required: false, default: false },
        Permission_to_access_payment_transaction: { type: Boolean, required: false, default: false },
        Permission_to_edit_or_delete_notes: { type: Boolean, required: false, default: false },
        Permission_to_allow_edit_customer_profile_details: { type: Boolean, required: false, default: false }
    },
    FeeStructure: {
        progressive: {
            liability: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            },
            Full_Coverage: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            },
            Split_Covergae: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            }
        },
        Other: {
            liability: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            },
            Full_Coverage: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            },
            Split_Covergae: {
                vehicle_1: { type: Number, required: false },
                vehicle_2: { type: Number, required: false },
                vehicle_3: { type: Number, required: false },
                vehicle_4: { type: Number, required: false },
                vehicle_5: { type: Number, required: false }
            }
        },
        Transactional_Fee: {
            Installment_late_fee_for_other_site: { type: Number, required: false },
            Installment_late_fee_for_AAAA_site: { type: Number, required: false },
            CASH: { type: Number, required: false },
            MO: { type: Number, required: false },
            CARD: { type: Number, required: false },
            CASH_MO: { type: Number, required: false },
            CARD_CASH: { type: Number, required: false },
            CARD_MO: { type: Number, required: false },
            Renewal_fee: { type: Number, required: false }
        },
        Miscellaneous_Fee: {
            SR_22: { type: Number, required: false },
            UM_UIM_PIP: { type: Number, required: false },
            Customized_Equipment: { type: Number, required: false },
            NON_OWNERS_FEE: { type: Number, required: false },
            SR_22_Non_Owners: { type: Number, required: false }
        }
    }
}, {
    collation: { locale: 'en', strength: 2 }
});
exports.default = mongoose_1.model('Agent', agentSchema);
