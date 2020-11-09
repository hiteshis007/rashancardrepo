import { json, Request, Response } from "express"; 
//import regRoute from '../api/register/reg_route';

export default class Routes {

    private app;
    
    constructor(app) {

        this.app = app;

        //this.app.use('/', regRoute);
        
        this.app.route('/').get((req:Request, res:Response)=>{
            res.render('Homepage');
        });

    }
}

