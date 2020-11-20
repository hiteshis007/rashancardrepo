import { Router } from "express";
import { check } from 'express-validator';

import MRCController from './mrc_controller'



class MRCRoute {

    public router:Router;

    constructor() {

        this.router=Router();

        this.router.get('/search', MRCController.searchView);

        this.router.post('/search', this.searchValidation, MRCController.search);

        this.router.post('/upload', MRCController.upload);
          
    }

    

    public searchValidation = [
        check('rcId')
         .notEmpty().withMessage('This field is required !')
         .isLength({min:12, max:12}).withMessage('Please type 12 digit rashan card number !')
         .isInt().withMessage('Rashan card number contains only numbers not characters and special numbers !')
    ];


}

const mrcRoute=new MRCRoute();

export default mrcRoute.router;