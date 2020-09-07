import {Router} from 'express';
import { connectController } from '../Controller/connectController';
import { GlobalMiddleWare } from '../middleware/Globalmiddleware';

class connectRouter {

    public router: Router;

    constructor(){
        
        this.router = Router();
        this.getRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/getScrapConnect',connectController.getScrapConnect);
    }

    // postRoutes(){

    //     this.router.post('/macID',GlobalMiddleWare.authenticate,macValidators.macID(),GlobalMiddleWare.checkError,macController.macID);
        
    // }

    // patchRoutes(){

    //     this.router.patch('/macID/edit/:id',Globa flMiddleWare.authenticate,macValidators.editmac(), GlobalMiddleWare.checkError ,macController.editMac)


    // }

    deleteRoutes(){

    }

}

export default new connectRouter().router;