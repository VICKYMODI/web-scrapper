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
exports.quoteController = void 0;
const Quote_1 = require("../models/Quote");
class quoteController {
    static createReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            //office start
            const newQuoteData = {
                suffix: req.body.suffix,
                first_Name: req.body.first_Name,
                middle_Name: req.body.middle_Name,
                last_Name: req.body.last_Name,
                created_at: new Date(),
                updated_at: new Date(),
                Date_of_Birth: req.body.Date_of_Birth,
                Gender: req.body.Gender,
                Marital_Status: req.body.Marital_Status,
                Mailing_Address: req.body.Mailing_Address,
                Address: req.body.Address,
                Apt_Unit: req.body.Apt_Unit,
                City: req.body.City,
                State: req.body.State,
                ZipCode: req.body.ZipCode,
                Mobile_No: req.body.Mobile_No,
                Home_Phone_No: req.body.Home_Phone_No,
                Email_Address: req.body.Email_Address,
                Notification_Method: {
                    Email: req.body.Notification_Method.Email,
                    Text: req.body.Notification_Method.Text,
                    Both: req.body.Notification_Method.Both,
                },
                How_did_you_hear_about_us: req.body.How_did_you_hear_about_us,
                Driver_Informations: [
                    {
                        License_Type: req.body.Driver_Informations.License_Type,
                        Country_State_Licensed: req.body.Driver_Informations.Country_State_Licensed,
                        Drivers_License_Texas_Id: req.body.Driver_Informations.Drivers_License_Texas_Id,
                        First_Name: req.body.Driver_Informations.First_Name,
                        Middle_Name: req.body.Driver_Informations.Middle_Name,
                        Last_Name: req.body.Driver_Informations.Last_Name,
                        Suffix: req.body.Driver_Informations.Suffix,
                        Date_of_Birth: req.body.Driver_Informations.Date_of_Birth,
                        Gender: req.body.Driver_Informations.Gender,
                        Marital_Status: req.body.Driver_Informations.Marital_Status,
                        Relationship_to_Applicant: req.body.Driver_Informations.Relationship_to_Applicant,
                        SR22: req.body.Driver_Informations.SR22,
                        Bodily_Injury_Limits: req.body.Driver_Informations.Bodily_Injury_Limits,
                        Property_Damage_Limits: req.body.Driver_Informations.Property_Damage_Limits,
                        UMBI_Limits: req.body.Driver_Informations.UMBI_Limits,
                        UMPD_Limits: req.body.Driver_Informations.UMPD_Limits,
                        Personal_Injury_Protection: req.body.Driver_Informations.Personal_Injury_Protection,
                        Medical_Payments: req.body.Driver_Informations.Medical_Payments,
                        Accidents_Claims_or_other_damages_you_had_to_a_vehicle_in_last_3_years: req.body.Driver_Informations.Accidents_Claims_or_other_damages_you_had_to_a_vehicle_in_last_3_years,
                        Tickets_Violations_or_DUI_in_last_3_years: req.body.Driver_Informations.Tickets_Violations_or_DUI_in_last_3_years,
                        Non_Owners: req.body.Driver_Informations.Non_Owners,
                    }
                ],
                Vehicle_Information: [
                    {
                        VIN: req.body.Vehicle_Information.VIN,
                        Year: req.body.Vehicle_Information.Year,
                        Make: req.body.Vehicle_Information.Make,
                        Model: req.body.Vehicle_Information.Model,
                        Garage_Address: req.body.Vehicle_Information.Garage_Address,
                        Garage_City: req.body.Vehicle_Information.Garage_City,
                        Garage_State: req.body.Vehicle_Information.Garage_State,
                        Garage_Zipcode: req.body.Vehicle_Information.Garage_Zipcode,
                        Vehicle_used_for_business: req.body.Vehicle_Information.Vehicle_used_for_business,
                        Special_Equipment: req.body.Vehicle_Information.Special_Equipment,
                        Custom_Van: req.body.Vehicle_Information.Custom_Van,
                        Lien_Holder: req.body.Vehicle_Information.Lien_Holder,
                        Coverage: req.body.Vehicle_Information.Coverage,
                        Comprehensive_Deductible: req.body.Vehicle_Information.Comprehensive_Deductible,
                        Collision_Deductible: req.body.Vehicle_Information.Collision_Deductible,
                        Rental_Reimbursement: req.body.Vehicle_Information.Rental_Reimbursement,
                        Towing_Labor: req.body.Vehicle_Information.Towing_Labor,
                    }
                ],
                Discounts: {
                    Primary_Residence: req.body.Discounts.Primary_Residence,
                    Go_PaperLess: req.body.Discounts.Go_PaperLess,
                    Yes_Send_By_Email: req.body.Discounts.Yes_Send_By_Email,
                    Autopay_EFT_Enrollement: req.body.Discounts.Autopay_EFT_Enrollement,
                    Prior_insurance: {
                        Do_you_have_auto_insurance_today: req.body.Discounts.Prior_insurance.Do_you_have_auto_insurance_today,
                        If_Yes_tenure_most_recent_company: req.body.Discounts.If_Yes_tenure_most_recent_company,
                    },
                    had_auto_insurance_last_30days: req.body.Discounts.had_auto_insurance_last_30days,
                    Duration_been_with_your_most_recent_company: req.body.Discounts.Duration_been_with_your_most_recent_company,
                    In_Agency_Transfer: req.body.Discounts.In_Agency_Transfer
                },
                Partner_Rates: [
                    {
                        com1: req.body.Partner_Rates.com1,
                        price: req.body.Partner_Rates.com1
                    }
                ]
            };
            try {
                console.log("test1", newQuoteData);
                let newQuote = yield new Quote_1.default(newQuoteData).save();
                console.log("test2", newQuote);
                res.send({
                    status_code: 200,
                    data: newQuote
                });
            }
            catch (e) {
                next(e);
            }
        });
    }
    static editReceipt(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const ID = req.params.id;
            try {
                const updateReceipt = yield Quote_1.default.findOneAndUpdate({ _id: ID }, {
                    suffix: req.body.suffix,
                    first_Name: req.body.first_Name,
                    middle_Name: req.body.middle_Name,
                    last_Name: req.body.last_Name,
                    updated_at: new Date(),
                    Date_of_Birth: req.body.Date_of_Birth,
                    Gender: req.body.Gender,
                    Marital_Status: req.body.Marital_Status,
                    Mailing_Address: req.body.Mailing_Address,
                    Address: req.body.Address,
                    Apt_Unit: req.body.Apt_Unit,
                    City: req.body.City,
                    State: req.body.State,
                    ZipCode: req.body.ZipCode,
                    Mobile_No: req.body.Mobile_No,
                    Home_Phone_No: req.body.Home_Phone_No,
                    Email_Address: req.body.Email_Address,
                    Notification_Method: {
                        Email: req.body.Notification_Method.Email,
                        Text: req.body.Notification_Method.Text,
                        Both: req.body.Notification_Method.Both,
                    },
                    How_did_you_hear_about_us: req.body.How_did_you_hear_about_us,
                    Driver_Informations: [
                        {
                            License_Type: req.body.Driver_Informations.License_Type,
                            Country_State_Licensed: req.body.Driver_Informations.Country_State_Licensed,
                            Drivers_License_Texas_Id: req.body.Driver_Informations.Drivers_License_Texas_Id,
                            First_Name: req.body.Driver_Informations.First_Name,
                            Middle_Name: req.body.Driver_Informations.Middle_Name,
                            Last_Name: req.body.Driver_Informations.Last_Name,
                            Suffix: req.body.Driver_Informations.Suffix,
                            Date_of_Birth: req.body.Driver_Informations.Date_of_Birth,
                            Gender: req.body.Driver_Informations.Gender,
                            Marital_Status: req.body.Driver_Informations.Marital_Status,
                            Relationship_to_Applicant: req.body.Driver_Informations.Relationship_to_Applicant,
                            SR22: req.body.Driver_Informations.SR22,
                            Bodily_Injury_Limits: req.body.Driver_Informations.Bodily_Injury_Limits,
                            Property_Damage_Limits: req.body.Driver_Informations.Property_Damage_Limits,
                            UMBI_Limits: req.body.Driver_Informations.UMBI_Limits,
                            UMPD_Limits: req.body.Driver_Informations.UMPD_Limits,
                            Personal_Injury_Protection: req.body.Driver_Informations.Personal_Injury_Protection,
                            Medical_Payments: req.body.Driver_Informations.Medical_Payments,
                            Accidents_Claims_or_other_damages_you_had_to_a_vehicle_in_last_3_years: req.body.Driver_Informations.Accidents_Claims_or_other_damages_you_had_to_a_vehicle_in_last_3_years,
                            Tickets_Violations_or_DUI_in_last_3_years: req.body.Driver_Informations.Tickets_Violations_or_DUI_in_last_3_years,
                            Non_Owners: req.body.Driver_Informations.Non_Owners,
                        }
                    ],
                    Vehicle_Information: [
                        {
                            VIN: req.body.Vehicle_Information.VIN,
                            Year: req.body.Vehicle_Information.Year,
                            Make: req.body.Vehicle_Information.Make,
                            Model: req.body.Vehicle_Information.Model,
                            Garage_Address: req.body.Vehicle_Information.Garage_Address,
                            Garage_City: req.body.Vehicle_Information.Garage_City,
                            Garage_State: req.body.Vehicle_Information.Garage_State,
                            Garage_Zipcode: req.body.Vehicle_Information.Garage_Zipcode,
                            Vehicle_used_for_business: req.body.Vehicle_Information.Vehicle_used_for_business,
                            Special_Equipment: req.body.Vehicle_Information.Special_Equipment,
                            Custom_Van: req.body.Vehicle_Information.Custom_Van,
                            Lien_Holder: req.body.Vehicle_Information.Lien_Holder,
                            Coverage: req.body.Vehicle_Information.Coverage,
                            Comprehensive_Deductible: req.body.Vehicle_Information.Comprehensive_Deductible,
                            Collision_Deductible: req.body.Vehicle_Information.Collision_Deductible,
                            Rental_Reimbursement: req.body.Vehicle_Information.Rental_Reimbursement,
                            Towing_Labor: req.body.Vehicle_Information.Towing_Labor,
                        }
                    ],
                    Discounts: {
                        Primary_Residence: req.body.Discounts.Primary_Residence,
                        Go_PaperLess: req.body.Discounts.Go_PaperLess,
                        Yes_Send_By_Email: req.body.Discounts.Yes_Send_By_Email,
                        Autopay_EFT_Enrollement: req.body.Discounts.Autopay_EFT_Enrollement,
                        Prior_insurance: {
                            Do_you_have_auto_insurance_today: req.body.Discounts.Prior_insurance.Do_you_have_auto_insurance_today,
                            If_Yes_tenure_most_recent_company: req.body.Discounts.If_Yes_tenure_most_recent_company,
                        },
                        had_auto_insurance_last_30days: req.body.Discounts.had_auto_insurance_last_30days,
                        Duration_been_with_your_most_recent_company: req.body.Discounts.Duration_been_with_your_most_recent_company,
                        In_Agency_Transfer: req.body.Discounts.In_Agency_Transfer
                    },
                    Partner_Rates: [
                        {
                            com1: req.body.Partner_Rates.com1,
                            price: req.body.Partner_Rates.com1
                        }
                    ]
                }, { new: true });
                if (updateReceipt) {
                    res.send({
                        status_code: 200,
                        data: updateReceipt
                    });
                    //res.send(updateMac)
                }
                else {
                    throw new Error("MAC ID Doesnt exist");
                }
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.quoteController = quoteController;
