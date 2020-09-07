"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const receiptSchema = new mongoose.Schema({
    created_at: { type: Date, required: true, default: new Date() },
    updated_at: { type: Date, required: true, default: new Date() },
    first_Name: { type: String, required: true },
    middle_Name: { type: String, required: false },
    last_Name: { type: String, required: true },
    suffix: { type: String, required: false },
    Date_of_Birth: { type: String, required: true },
    Gender: { type: String, required: true },
    Marital_Status: { type: String, required: true },
    Mailing_Address: { type: String, required: true },
    Address: { type: String, required: true },
    Apt_Unit: { type: String, required: true },
    City: { type: String, required: true },
    State: { type: String, required: true },
    ZipCode: { type: String, required: true },
    Mobile_No: { type: String, required: true },
    Home_Phone_No: { type: String, required: true },
    Email_Address: { type: String, required: true },
    Notification_Method: {
        Email: { type: Boolean, default: false, required: false },
        Text: { type: Boolean, default: false, required: false },
        Both: { type: Boolean, default: false, required: false },
    },
    How_did_you_hear_about_us: { type: String, required: true },
    Driver_Informations: [
        {
            License_Type: { type: String, required: true },
            Country_State_Licensed: { type: String, required: true },
            Drivers_License_Texas_Id: { type: String, required: true },
            First_Name: { type: String, required: true },
            Middle_Name: { type: String, required: true },
            Last_Name: { type: String, required: true },
            Suffix: { type: String, required: true },
            Date_of_Birth: { type: String, required: true },
            Gender: { type: String, required: true },
            Marital_Status: { type: String, required: true },
            Relationship_to_Applicant: { type: String, required: true },
            SR22: { type: String, required: true },
            Bodily_Injury_Limits: { type: String, required: true },
            Property_Damage_Limits: { type: String, required: true },
            UMBI_Limits: { type: String, required: true },
            UMPD_Limits: { type: String, required: true },
            Personal_Injury_Protection: { type: String, required: true },
            Medical_Payments: { type: String, required: true },
            Accidents_Claims_or_other_damages_you_had_to_a_vehicle_in_last_3_years: { type: String, required: true },
            Tickets_Violations_or_DUI_in_last_3_years: { type: String, required: true },
            Non_Owners: { type: String, required: true },
        }
    ],
    Vehicle_Information: [
        {
            VIN: { type: String, required: true },
            Year: { type: String, required: true },
            Make: { type: String, required: true },
            Model: { type: String, required: true },
            Garage_Address: { type: String, required: true },
            Garage_City: { type: String, required: true },
            Garage_State: { type: String, required: true },
            Garage_Zipcode: { type: String, required: true },
            Vehicle_used_for_business: { type: String, required: true },
            Special_Equipment: { type: String, required: true },
            Custom_Van: { type: String, required: true },
            Lien_Holder: { type: String, required: true },
            Coverage: { type: String, required: true },
            Comprehensive_Deductible: { type: String, required: true },
            Collision_Deductible: { type: String, required: true },
            Rental_Reimbursement: { type: String, required: true },
            Towing_Labor: { type: String, required: true }
        }
    ],
    Discounts: {
        Primary_Residence: { type: String, required: true },
        Go_PaperLess: { type: String, required: true },
        Yes_Send_By_Email: { type: String, required: true },
        Autopay_EFT_Enrollement: { type: String, required: true },
        Prior_insurance: {
            Do_you_have_auto_insurance_today: { type: String, required: true },
            If_Yes_tenure_most_recent_company: { type: String, required: true },
        },
        had_auto_insurance_last_30days: { type: String, required: true },
        Duration_been_with_your_most_recent_company: { type: String, required: true },
        In_Agency_Transfer: { type: String, required: true }
    },
    Partner_Rates: [
        {
            com1: { type: String, required: true },
            price: { type: String, required: true }
        }
    ]
});
exports.default = mongoose_1.model('Quotation', receiptSchema);
