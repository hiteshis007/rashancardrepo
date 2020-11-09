import { Router } from "express";

import RegisterController from './reg_controller';
import { check } from 'express-validator';



class RegisterRoute {

    public router:Router;
    constructor() {
        this.router=Router();

        this.router.get('/register', RegisterController.registerView);
        this.router.get('/login', RegisterController.loginView);
       
    }

    

    public loginValidation = [
        check('email')
            .notEmpty().withMessage('Email is required !')
            .isEmail().withMessage('Enter valid email id !')
            .custom(async (email, {req}) => {
                let result = await RegisterController.isUserRegistered(email);
                if (!result) return Promise.reject('You are not registered with us !!! Please register first !');
            }),
        check('password')
            .notEmpty().withMessage('Password is required !')
            .custom(async (password, {req}) => {
                let result = await RegisterController.isUserRegistered(req.body.email);
                if (result && (result.password!=password)) return Promise.reject('Password is not correct !');
            })
    ];


}

const regRoute=new RegisterRoute();

export default regRoute.router;