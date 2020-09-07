
import {prodEnvironemnt} from './prod.env';

import {devEnvironemnt} from './dev.env';


export interface Environment {
    db_url : string,
    jwt_secret: string
}


export function getEnvironmentVariable(){
    if(process.env.NODE_ENV === 'production'){
        return prodEnvironemnt;
    }
    return devEnvironemnt;
}