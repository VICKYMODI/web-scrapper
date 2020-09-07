import {Environment} from './env'

export const prodEnvironemnt : Environment= {
    db_url : "mongodb://localhost:27017/AMS",
    jwt_secret: 'prodSecret'
}