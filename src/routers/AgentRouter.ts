import {Router} from 'express';
import { agentController } from '../Controller/agentController';
import { agentValidators } from '../validators/AgentValidators';
import { GlobalMiddleWare } from '../middleware/Globalmiddleware';

class agentRouter {

    public router: Router;

    constructor(){
        
        this.router = Router();
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes(){

        this.router.get('/send/varification/email',GlobalMiddleWare.authenticate,agentController.resendVerification);
        this.router.get('/login',agentValidators.login(),GlobalMiddleWare.checkError,agentController.login2);
        this.router.get('/getAllAgents',GlobalMiddleWare.authenticate,GlobalMiddleWare.checkError,agentController.getAllAgents);
        this.router.get('/agent',agentValidators.getByid(),GlobalMiddleWare.checkError,agentController.getByid)

    }

    postRoutes(){

        this.router.post('/signup',agentValidators.signup(), GlobalMiddleWare.checkError,agentController.signup); 

    }

    patchRoutes(){

        this.router.patch('/verify',agentValidators.verifyAgent(),GlobalMiddleWare.authenticate, GlobalMiddleWare.checkError ,agentController.verify)
        this.router.patch('/edit/:id',GlobalMiddleWare.authenticate,agentValidators.editAgent(), GlobalMiddleWare.checkError ,agentController.editAgent)


    }

    deleteRoutes(){

    }

}

export default new agentRouter().router;