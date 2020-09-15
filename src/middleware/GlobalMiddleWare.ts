
import { validationResult } from 'express-validator';
import * as Jwt from 'jsonwebtoken';
import {getEnvironmentVariable} from '../environment/env';
import LoggedIn from '../models/LoggedIn';

export class GlobalMiddleWare {

    static checkError(req,res,next){
        const error = validationResult(req);
        if(!error.isEmpty()){
            next(new Error(error.array()[0].msg));
            
        } else{
            next();
        }
    }

    static async authenticate(req, res, next) {
        const authHeader = req.headers.authorization;
        const isLoggedIn = req.header.isLoggedIn;
        const token = authHeader ? authHeader : null;
        try {

            console.log(token)
            req.errorStatus = 401;
            Jwt.verify(token, getEnvironmentVariable().jwt_secret, (async (err, decoded) => {
                if (err) {
                    console.log("t1",err)
                    next(err)
                } else if (!decoded) {
                    console.log("t2",decoded)
                    next(new Error('User Not Authorised'))
                } else {
                    const userdata:any = await LoggedIn.findOne({'token':token});
                    console.log("userdata",userdata)
                    console.log("decoded",decoded)
                    if(userdata.isLoggedIn == true){
                        req.agent = decoded
                        next()
                    }else{
                        next(new Error('Token Expired'))
                    }
                    
                }
            }))
        } catch (e) {
            next(e);
        }
    }

    static async checkLoginstatus(req,res,next){
        const username = req.query.username;
        console.log("test",username)
        try{
            const UserData:any = await LoggedIn.findOne({'Username' : username,'isLoggedIn':true});
            if(UserData){
                const loggedInAt = UserData.created_at;
                const currentDate = new Date();
                loggedInAt.setMinutes( loggedInAt.getMinutes() + 30 );
                console.log("loggedInAt",loggedInAt)
                console.log("currentDate",currentDate)
                if(currentDate > loggedInAt){
                    req.setTabStatus = "use same session"
                    console.log("test",req.setTabStatus)
                    next()
                }else{
                   
                    req.setTabStatus = "create new session";
                    console.log("test1",req.setTabStatus)
                    next()
                }
            }else{
                req.setTabStatus = "create new session";
                console.log("test2",req.setTabStatus)
                next()
            }
        }catch(e){
            next(e)
        }
    }
}
