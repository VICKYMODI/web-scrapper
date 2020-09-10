import {body,query} from 'express-validator';


export class amwinsValidators{

    static getPolicyInfo() {
        return [query('Policy', 'Poicy is Required').isString()];
    }



}