import {Router} from 'express';
import { amWinsController } from '../Controller/AmWinsController';
import { GlobalMiddleWare } from '../middleware/Globalmiddleware';
import {amwinsValidators} from '../validators/amwinsValidator';

class amWinsRouter {

    public router: Router;

    constructor(){
        
        this.router = Router();
        this.getRoutes();
        this.deleteRoutes();
    }

    getRoutes(){
        this.router.get('/getPolicyInfo',amwinsValidators.getPolicyInfo(),GlobalMiddleWare.checkError,amWinsController.getPolicyInfo);
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

export default new amWinsRouter().router;