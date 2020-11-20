import { json, Request, Response } from "express"; 
import regRoute from '../api/register/reg_route';
import mrcRoute from '../api/masterRC/mrc_route';
import urcRoute from '../api/userRC/urc_route';

export default class Routes {

    private app;
    
    constructor(app) {

        this.app = app;

        this.app.use('/', regRoute);
        this.app.use('/home', mrcRoute);
        this.app.use('/rc', urcRoute);
        
        this.app.route('/home').get((req:Request, res:Response)=>{
            res.render('homepage');
        });

    }
}

