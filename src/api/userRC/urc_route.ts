import { Router } from "express";

import { check } from 'express-validator';
import URCController from "./urc_controller";



class RegisterRoute {

    public router:Router;

    constructor() {

        this.router=Router();

        this.router.get('/list', URCController.listView);

        this.router.post('/list', URCController.list);

        this.router.get('/profile', URCController.profile);

        this.router.get('/search', URCController.searchView);

        this.router.post('/search', this.searchValidation, URCController.search);

        this.router.get('/searchForUpdate', URCController.updateView);
        
        this.router.post('/searchForUpdate', this.searchValidation, URCController.searchForUpdate);

        this.router.get('/update', URCController.updateView);

        this.router.post('/update', this.updateValidation, URCController.update);

    }

    

    public searchValidation = [
        check('rcId')
         .notEmpty().withMessage('This field is required !')
         .isLength({min:12, max:12}).withMessage('Please type 12 digit rashan card number !')
         .isInt().withMessage('Rashan card number contains only numbers not characters and special numbers !')
    ];

    public updateValidation = [
        check('mobile')
         .notEmpty().withMessage('This field is required !')
         .isLength({min:10, max:10}).withMessage('Please enter 10 digit mobile number !')
         .isInt().withMessage('Mobile number contains only numbers not characters and special numbers !'),
        check('status')
         .notEmpty().withMessage('This field is required !')
    ];

}

const regRoute=new RegisterRoute();

export default regRoute.router;