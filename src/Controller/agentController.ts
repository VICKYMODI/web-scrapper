import User from '../models/Agent';
import { validationResult } from 'express-validator';
import { Utils } from '../utils/Utils';
import Agent from '../models/Agent';
import { NodeMailer } from '../utils/nodemailer';
import * as Bcrypt from 'bcrypt';
import * as Jwt from 'jsonwebtoken';
import getMAC, { isMAC } from 'getmac'
import { getEnvironmentVariable } from '../environment/env';
import LoggedIn from '../models/LoggedIn';




export class agentController {


    static async login2(req,res,next){

        const password = req.query.password;
        const agent = req.agent;
        let token;

        try{
            const loginStatus = await LoggedIn.findOneAndUpdate({
                Username : agent.Username,
                isLoggedIn: 'true'
            },{isLoggedIn: 'false',updated_at : new Date()},{new: true});
            if(loginStatus){
                await Utils.comparePassword({
                    plainPassword : password,
                    encryptedPassword : agent.Password
                })
            
                token = Jwt.sign({Username:agent.Username,PersonalEmail:agent.PersonalEmail, agent_id: agent._id},
                    getEnvironmentVariable().jwt_secret,{expiresIn:'1d'})
                    await agentController.updateLoginTabel(agent,token)
                    res.send({message:"Previous session logged out",token:token,data:req.agent})
            }else{
                try{
                    await Utils.comparePassword({
                        plainPassword : password,
                        encryptedPassword : agent.Password
                    })
                
                    token = Jwt.sign({Username:agent.Username,PersonalEmail:agent.PersonalEmail, agent_id: agent._id},getEnvironmentVariable().jwt_secret,{expiresIn:'1d'})
                    await agentController.updateLoginTabel(agent,token)
                    res.send({token:token,data:req.agent})
                }catch(e){
                    next(e)
                }
            }
        }catch(e){
            next(e)
        }

        
    }

    

    static async signup(req, res, next) {

        //console.log(Utils.generateVarificationToken());

        const varificationOtp = Utils.generateVarificationToken()

        //agentdata start

        const first_name = req.body.Name.first_name;
        const last_name = req.body.Name.last_name;
        const middle_name = req.body.Name.middle_name;
        const dob = req.body.DOB;
        const Phone_No = req.body.Phone_No;
        const Gender = req.body.Gender;

        const empID = req.body.ID;
        const JoiningDate = req.body.JoiningDate;
        const Role = req.body.Role;
        const OfficeName = req.body.OfficeName;
        const OfficeIsland = req.body.OfficeIsland;
        const PersonalEmail = req.body.PersonalEmail;
        const OfficeEmail = req.body.OfficeEmail
        const LoginType = req.body.LoginType;

        const username = req.body.Username;
        const password = req.body.Password;


        const Update_fees_for_individual_policy_version = req.body.Permission.Update_fees_for_individual_policy_version;
        const Fetch_all_office_reports = req.body.Permission.Fetch_all_office_reports;
        const Permission_to_generate_CSV_report = req.body.Permission.Permission_to_generate_CSV_report;
        const Permission_to_generate_all_date_report = req.body.Permission.Permission_to_generate_all_date_report;
        const Permission_to_access_payment_transaction = req.body.Permission.Permission_to_access_payment_transaction;
        const Permission_to_allow_login_24X7 = req.body.Permission.Permission_to_allow_login_24X7;
        const Permission_to_edit_or_delete_notes = req.body.Permission.Permission_to_edit_or_delete_notes;
        const Permission_to_allow_edit_customer_profile_details = req.body.Permission.Permission_to_allow_edit_customer_profile_details;

        const progLiabilityVeh1 = req.body.FeeStructure.progressive.liability.vehicle_1;
        const progLiabilityVeh2 = req.body.FeeStructure.progressive.liability.vehicle_2;
        const progLiabilityVeh3 = req.body.FeeStructure.progressive.liability.vehicle_3;
        const progLiabilityVeh4 = req.body.FeeStructure.progressive.liability.vehicle_4;
        const progLiabilityVeh5 = req.body.FeeStructure.progressive.liability.vehicle_5;

        const progFullcoverageVeh1 = req.body.FeeStructure.progressive.Full_Coverage.vehicle_1;
        const progFullcoverageVeh2 = req.body.FeeStructure.progressive.Full_Coverage.vehicle_2;
        const progFullcoverageVeh3 = req.body.FeeStructure.progressive.Full_Coverage.vehicle_3;
        const progFullcoverageVeh4 = req.body.FeeStructure.progressive.Full_Coverage.vehicle_4;
        const progFullcoverageVeh5 = req.body.FeeStructure.progressive.Full_Coverage.vehicle_5;

        const progSplitcovergaeVeh1 = req.body.FeeStructure.progressive.Split_Covergae.vehicle_1;
        const progSplitcovergaeVeh2 = req.body.FeeStructure.progressive.Split_Covergae.vehicle_2;
        const progSplitcovergaeVeh3 = req.body.FeeStructure.progressive.Split_Covergae.vehicle_3;
        const progSplitcovergaeVeh4 = req.body.FeeStructure.progressive.Split_Covergae.vehicle_4;
        const progSplitcovergaeVeh5 = req.body.FeeStructure.progressive.Split_Covergae.vehicle_5;

        const otherLiabilityVeh1 = req.body.FeeStructure.Other.liability.vehicle_1;
        const otherLiabilityVeh2 = req.body.FeeStructure.Other.liability.vehicle_2;
        const otherLiabilityVeh3 = req.body.FeeStructure.Other.liability.vehicle_3;
        const otherLiabilityVeh4 = req.body.FeeStructure.Other.liability.vehicle_4;
        const otherLiabilityVeh5 = req.body.FeeStructure.Other.liability.vehicle_5;

        const otherFullCoverageVeh1 = req.body.FeeStructure.Other.Full_Coverage.vehicle_1;
        const otherFullCoverageVeh2 = req.body.FeeStructure.Other.Full_Coverage.vehicle_2;
        const otherFullCoverageVeh3 = req.body.FeeStructure.Other.Full_Coverage.vehicle_3;
        const otherFullCoverageVeh4 = req.body.FeeStructure.Other.Full_Coverage.vehicle_4;
        const otherFullCoverageVeh5 = req.body.FeeStructure.Other.Full_Coverage.vehicle_5;

        const otherSplitCoverageVeh1 = req.body.FeeStructure.Other.Split_Covergae.vehicle_1;
        const otherSplitCoverageVeh2 = req.body.FeeStructure.Other.Split_Covergae.vehicle_2;
        const otherSplitCoverageVeh3 = req.body.FeeStructure.Other.Split_Covergae.vehicle_3;
        const otherSplitCoverageVeh4 = req.body.FeeStructure.Other.Split_Covergae.vehicle_4;
        const otherSplitCoverageVeh5 = req.body.FeeStructure.Other.Split_Covergae.vehicle_5;


        const TransFeeInstalLateFeeAAAA = req.body.FeeStructure.Transactional_Fee.Installment_late_fee_for_AAAA_site;
        const TransFeeInstalLateFeeOther = req.body.FeeStructure.Transactional_Fee.Installment_late_fee_for_other_site;
        const Cash = req.body.FeeStructure.Transactional_Fee.CASH;
        const MO = req.body.FeeStructure.Transactional_Fee.MO;
        const CARD = req.body.FeeStructure.Transactional_Fee.CARD;
        const CASH_MO = req.body.FeeStructure.Transactional_Fee.CASH_MO;
        const CARD_CASH = req.body.FeeStructure.Transactional_Fee.CARD_CASH;
        const CARD_MO = req.body.FeeStructure.Transactional_Fee.CARD_MO;
        const Renewal_fee = req.body.FeeStructure.Transactional_Fee.Renewal_fee;

        const SR_22 = req.body.FeeStructure.Miscellaneous_Fee.SR_22;
        const UM_UIM_PIP = req.body.FeeStructure.Miscellaneous_Fee.UM_UIM_PIP;
        const Customized_Equipment = req.body.FeeStructure.Miscellaneous_Fee.Customized_Equipment;
        const NON_OWNERS_FEE = req.body.FeeStructure.Miscellaneous_Fee.NON_OWNERS_FEE;
        const SR_22_Non_Owners = req.body.FeeStructure.Miscellaneous_Fee.SR_22_Non_Owners;

        try {
            const hash = await Utils.encryptPassword(password);
            const newAgentData = {
                verification_token_time: Date.now() + new Utils().max_Token_Time,
                varification_token: varificationOtp,
                created_at: new Date(),
                updated_at: new Date(),
                ID: empID,
                Name: {
                    first_name: first_name,
                    last_name: last_name,
                    middle_name : middle_name,
                },
                Status : "Active",
                Username: username,
                Password: hash,
                PersonalEmail: PersonalEmail,
                LoginType : LoginType,
                OfficeEmail: OfficeEmail,
                OfficeIsland : OfficeIsland,
                JoiningDate: JoiningDate,
                Role: Role,
                OfficeName: OfficeName,
                DOB: dob,
                Phone_No: Phone_No,
                Gender: Gender,
                Permission: {
                    Update_fees_for_individual_policy_version: Update_fees_for_individual_policy_version,
                    Fetch_all_office_reports: Fetch_all_office_reports,
                    Permission_to_generate_CSV_report: Permission_to_generate_CSV_report,
                    Permission_to_generate_all_date_report: Permission_to_generate_all_date_report,
                    Permission_to_access_payment_transaction: Permission_to_access_payment_transaction,
                    Permission_to_edit_or_delete_notes: Permission_to_edit_or_delete_notes,
                    Permission_to_allow_edit_customer_profile_details: Permission_to_allow_edit_customer_profile_details
    
                },
    
                FeeStructure: {
                    progressive: {
                        liability: {
                            vehicle_1: progLiabilityVeh1,
                            vehicle_2: progLiabilityVeh2,
                            vehicle_3: progLiabilityVeh3,
                            vehicle_4: progLiabilityVeh4,
                            vehicle_5: progLiabilityVeh5
                        },
                        Full_Coverage: {
                            vehicle_1: progFullcoverageVeh1,
                            vehicle_2: progFullcoverageVeh2,
                            vehicle_3: progFullcoverageVeh3,
                            vehicle_4: progFullcoverageVeh4,
                            vehicle_5: progFullcoverageVeh5
                        },
                        Split_Covergae: {
                            vehicle_1: progSplitcovergaeVeh1,
                            vehicle_2: progSplitcovergaeVeh2,
                            vehicle_3: progSplitcovergaeVeh3,
                            vehicle_4: progSplitcovergaeVeh4,
                            vehicle_5: progSplitcovergaeVeh5
                        }
    
                    },
                    Other: {
                        liability: {
                            vehicle_1: otherLiabilityVeh1,
                            vehicle_2: otherLiabilityVeh2,
                            vehicle_3: otherLiabilityVeh3,
                            vehicle_4: otherLiabilityVeh4,
                            vehicle_5: otherLiabilityVeh5
                        },
                        Full_Coverage: {
                            vehicle_1: otherFullCoverageVeh1,
                            vehicle_2: otherFullCoverageVeh2,
                            vehicle_3: otherFullCoverageVeh3,
                            vehicle_4: otherFullCoverageVeh4,
                            vehicle_5: otherFullCoverageVeh5
                        },
                        Split_Covergae: {
                            vehicle_1: otherSplitCoverageVeh1,
                            vehicle_2: otherSplitCoverageVeh2,
                            vehicle_3: otherSplitCoverageVeh3,
                            vehicle_4: otherSplitCoverageVeh4,
                            vehicle_5: otherSplitCoverageVeh5
                        }
    
                    },
                    Transactional_Fee: {
                        Installment_late_fee_for_other_site: TransFeeInstalLateFeeOther,
                        Installment_late_fee_for_AAAA_site: TransFeeInstalLateFeeAAAA,
                        CASH: Cash,
                        MO: MO,
                        CARD: CARD,
                        CASH_MO: CARD_MO,
                        CARD_CASH: CARD_CASH,
                        CARD_MO: CARD_MO,
                        Renewal_fee: Renewal_fee
                    },
                    Miscellaneous_Fee: {
                        SR_22: SR_22,
                        UM_UIM_PIP: UM_UIM_PIP,
                        Customized_Equipment: Customized_Equipment,
                        NON_OWNERS_FEE: NON_OWNERS_FEE,
                        SR_22_Non_Owners: SR_22_Non_Owners
                    }
                }
            };

            const error = validationResult(req);

            if (!error.isEmpty()) {
                console.log(error.array(), 'called error');
                const newError = new Error(error.array()[0].msg);
                next(newError);
                return;
            }

            console.log("agentData", newAgentData)

            let user = await new User(newAgentData).save();

            res.send({
                status_code : 200,
                data :user
            });
            //send varification email
            // await NodeMailer.sendEmail({
            //     to: [newAgentData.PersonalEmail],
            //     subject: 'Email Verification',
            //     html: `<h1>OTP is : ${varificationOtp}</h1>`
            // })

        } catch (e) {
            next(e);
        }



    }

    static async verify(req, res, next) {

        const verificationToken = req.body.verification_token;
        const email = req.agent.PersonalEmail;
        try {
            console.log(email,verificationToken);
            const agent = await Agent.findOneAndUpdate({
                "PersonalEmail": email,
                "varification_token": verificationToken,
                "verification_token_time": { $gt: Date.now() }
            }, { varified: true, updated_at: new Date() }, { new: true });
            console.log("test134", agent)
            if (agent) {
                res.send(agent);
            } else {
                throw new Error('Verification Token Is Expired.Please Request For a new One');
            }
        } catch (e) {
            next(e);
        }

    }

    static getByid(req,res,next){
        const ID = req.query.ID;
        res.send(req.agent);
    }

    static async resendVerification(req, res, next) {

        const email = req.agent.PersonalEmail;
        const verificationToken = Utils.generateVarificationToken();
        try {
            const agent: any = await Agent.findOneAndUpdate({ "PersonalEmail": email },
                {
                    varification_token: verificationToken,
                    verification_token_time: Date.now() + new Utils().max_Token_Time
                },{new:true});
            if (agent) {
                res.json({ success: true })
                await NodeMailer.sendEmail({
                    to: [agent.PersonalEmail], subject: 'Email Verification',
                    html: `<h1>${verificationToken}</h1>`
                });
               
            } else {
                throw Error('User Does Not Exist');
            }
        } catch (e) {
            next(e);
        }

    }

    static async editAgent(req, res, next) {
        const ID = req.params.id;

        console.log("test", ID)

        try {
            const updateAgent = await Agent.findOneAndUpdate({ "_id": ID }, {

                //start modification

                ID: req.body.ID,
                updated_at: new Date(),
                Status : req.body.Status,
                Name: {
                    first_name: req.body.Name.first_name,
                    middle_name : req.body.Name.middle_name,
                    last_name: req.body.Name.last_name
                },
                Username: req.body.Username,
                Password: req.body.Password,
                LoginType : req.body.LoginType,
                PersonalEmail: req.body.PersonalEmail,
                OfficeEmail: req.body.OfficeName,
                JoiningDate: req.body.JoiningDate,
                Role: req.body.Role,
                OfficeName: req.body.OfficeName,
                OfficeIsland : req.body.OfficeIsland,
                DOB: req.body.DOB,
                Phone_No: req.body.Phone_No,
                Gender: req.body.Gender,
                Permission: {
                    Update_fees_for_individual_policy_version: req.body.Permission.Update_fees_for_individual_policy_version,
                    Fetch_all_office_reports: req.body.Permission.Fetch_all_office_reports,
                    Permission_to_generate_CSV_report: req.body.Permission.Permission_to_generate_CSV_report,
                    Permission_to_generate_all_date_report: req.body.Permission.Permission_to_generate_all_date_report,
                    Permission_to_access_payment_transaction: req.body.Permission.Permission_to_access_payment_transaction,
                    Permission_to_allow_login_24X7: req.body.Permission.Permission_to_allow_login_24X7,
                    Permission_to_edit_or_delete_notes: req.body.Permission.Permission_to_edit_or_delete_notes,
                    Permission_to_allow_edit_customer_profile_details: req.body.Permission.Permission_to_allow_edit_customer_profile_details,

                },

                FeeStructure: {
                    progressive: {
                        liability: {
                            vehicle_1: req.body.FeeStructure.progressive.liability.vehicle_1,
                            vehicle_2: req.body.FeeStructure.progressive.liability.vehicle_2,
                            vehicle_3: req.body.FeeStructure.progressive.liability.vehicle_3,
                            vehicle_4: req.body.FeeStructure.progressive.liability.vehicle_4,
                            vehicle_5: req.body.FeeStructure.progressive.liability.vehicle_5
                        },
                        Full_Coverage: {
                            vehicle_1: req.body.FeeStructure.progressive.Full_Coverage.vehicle_1,
                            vehicle_2: req.body.FeeStructure.progressive.Full_Coverage.vehicle_2,
                            vehicle_3: req.body.FeeStructure.progressive.Full_Coverage.vehicle_3,
                            vehicle_4: req.body.FeeStructure.progressive.Full_Coverage.vehicle_4,
                            vehicle_5: req.body.FeeStructure.progressive.Full_Coverage.vehicle_5
                        },
                        Split_Covergae: {
                            vehicle_1: req.body.FeeStructure.progressive.Split_Covergae.vehicle_1,
                            vehicle_2: req.body.FeeStructure.progressive.Split_Covergae.vehicle_2,
                            vehicle_3: req.body.FeeStructure.progressive.Split_Covergae.vehicle_3,
                            vehicle_4: req.body.FeeStructure.progressive.Split_Covergae.vehicle_4,
                            vehicle_5: req.body.FeeStructure.progressive.Split_Covergae.vehicle_5
                        }

                    },
                    Other: {
                        liability: {
                            vehicle_1: req.body.FeeStructure.Other.liability.vehicle_1,
                            vehicle_2: req.body.FeeStructure.Other.liability.vehicle_2,
                            vehicle_3: req.body.FeeStructure.Other.liability.vehicle_3,
                            vehicle_4: req.body.FeeStructure.Other.liability.vehicle_4,
                            vehicle_5: req.body.FeeStructure.Other.liability.vehicle_5
                        },
                        Full_Coverage: {
                            vehicle_1: req.body.FeeStructure.Other.Full_Coverage.vehicle_1,
                            vehicle_2: req.body.FeeStructure.Other.Full_Coverage.vehicle_2,
                            vehicle_3: req.body.FeeStructure.Other.Full_Coverage.vehicle_3,
                            vehicle_4: req.body.FeeStructure.Other.Full_Coverage.vehicle_4,
                            vehicle_5: req.body.FeeStructure.Other.Full_Coverage.vehicle_5
                        },
                        Split_Covergae: {
                            vehicle_1: req.body.FeeStructure.Other.Split_Covergae.vehicle_1,
                            vehicle_2: req.body.FeeStructure.Other.Split_Covergae.vehicle_2,
                            vehicle_3: req.body.FeeStructure.Other.Split_Covergae.vehicle_3,
                            vehicle_4: req.body.FeeStructure.Other.Split_Covergae.vehicle_4,
                            vehicle_5: req.body.FeeStructure.Other.Split_Covergae.vehicle_5
                        }

                    },
                    Transactional_Fee: {
                        Installment_late_fee_for_other_site: req.body.FeeStructure.Transactional_Fee.Installment_late_fee_for_AAAA_site,
                        Installment_late_fee_for_AAAA_site: req.body.FeeStructure.Transactional_Fee.Installment_late_fee_for_other_site,
                        CASH: req.body.FeeStructure.Transactional_Fee.CASH,
                        MO: req.body.FeeStructure.Transactional_Fee.MO,
                        CARD: req.body.FeeStructure.Transactional_Fee.CARD,
                        CASH_MO: req.body.FeeStructure.Transactional_Fee.CASH_MO,
                        CARD_CASH: req.body.FeeStructure.Transactional_Fee.CARD_CASH,
                        CARD_MO: req.body.FeeStructure.Transactional_Fee.CARD_MO,
                        Renewal_fee: req.body.FeeStructure.Transactional_Fee.Renewal_fee
                    },
                    Miscellaneous_Fee: {
                        SR_22: req.body.FeeStructure.Miscellaneous_Fee.SR_22,
                        UM_UIM_PIP: req.body.FeeStructure.Miscellaneous_Fee.UM_UIM_PIP,
                        Customized_Equipment: req.body.FeeStructure.Miscellaneous_Fee.Customized_Equipment,
                        NON_OWNERS_FEE: req.body.FeeStructure.Miscellaneous_Fee.NON_OWNERS_FEE,
                        SR_22_Non_Owners: req.body.FeeStructure.Miscellaneous_Fee.SR_22_Non_Owners
                    }
                }

                //end modification

            }, { new: true });

            if (updateAgent) {
                res.send({
                    status_code: 200,
                    data: updateAgent
                })
                //res.send(updateAgent)
            } else {
                throw new Error("Agent doesnt exist")
            }
        } catch (err) {
            next(err)
        }
    }

    static async getAllAgents(req,res,next){
        try {

            const getAllAgents = await Agent.find();
            if(getAllAgents){
                res.send(getAllAgents)
            }else{
                throw new Error("No Agent found")
            }

        }catch(e){
            next(e)
        }
    }

    static async logout(req,res,next){
        const authHeader = req.headers.authorization;

    }

    static async updateLoginTabel(agent,token){
        try{
            const newLogindata = {
                token       :  token,
                updated_at  :  Date.now(),
                isLoggedIn  :  "true",
                Username    :   agent.Username,
                PersonalEmail   :   agent.PersonalEmail,
                LoginType   :   agent.LoginType,
                OfficeName  :   agent.OfficeName,
                OfficeIsland    :   agent.OfficeIsland,
                OfficeEmail :   agent.OfficeEmail,
                created_at  :   agent.created_at
            }

            let newLoginSession = await new LoggedIn(newLogindata).save()
        }catch(e){
            throw new Error(e)
        }
    }

}



// try{

//     await Utils.comparePassword({
//         plainPassword : password,
//         encryptedPassword : agent.Password
//     })
//     //code for isloggedin true update
//     const setLoginFlag = await Agent.findOneAndUpdate({
//         "Username": req.agent.Username
//     },{isLoggedIn: true, updated_at: new Date() },{ new: true });

//     const token = Jwt.sign({Username:agent.Username,PersonalEmail:agent.PersonalEmail, agent_id: agent._id},
//         getEnvironmentVariable().jwt_secret,{expiresIn:'1d'})
    
//     res.send({token:token,data:req.agent})

// }catch(e){
//     next(e)
// }