import {body,query} from 'express-validator';
import Agent from '../models/Agent';


export class amwinsValidators{

    static getPolicyInfo() {
        return [query('Policy', 'Poicy is Required').isString()];
    }

    static getByid(){
        return [query('id','id is required').isString().custom((id, {req})=>{
            return Agent.findOne({"_id":id}).then(agent => {
                if(agent){
                    req.agent = agent;
                    return true;
                } else{
                    throw new Error("Agent Doesnt exist")
                }
            })
         })
        ]
    }

    static signup(){

        return [body('PersonalEmail','PersonalEmail is Required').isEmail().custom((email,{req})=>{
         
            return Agent.findOne({'PersonalEmail': email}).then(agent =>{
                console.log(agent,"agent found");
                if(agent){
                    throw new Error('Agent already exist')
                }else{
                    return
                }
            })
        }),
        body('Username', 'Username is Required').isString().custom((username,{req})=>{
            return Agent.findOne({'Username':username}).then(agent => {
                if(agent){
                    throw new Error("Agent with this Username already exist");
                }else{
                    return
                }
            })
        }),
        body('Password', 'Password is Required').isAlphanumeric().isLength({min: 5, max: 20}).withMessage('Password can be from 8-20 Characters only'),
        ];
    }

    static verifyAgent(){

        return [body('verification_token','Verifcation Token is required').isNumeric()]
    }

    static resendVerificationEmail() {
        return [query('email', 'Email is Required').isEmail()]
    }

    static editAgent(){
        return[body('Username', 'Username is Required').isString().custom((username,{req})=>{
            return Agent.findOne({'username':username}).then(agent => {
                if(agent){
                    throw new Error("Agent with this Username already exist");
                }else{
                    return
                }
            })
        }),
            ];
    }

}