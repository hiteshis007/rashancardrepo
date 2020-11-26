import { Router } from "express";

import multer from '../../config/multer';
import RegisterController from './reg_controller';
import { check } from 'express-validator';



class RegisterRoute {

    public router:Router;
    constructor() {
        this.router=Router();

        this.router.get('/register', RegisterController.registerView);
        this.router.post('/register', multer.array('profilePic') , this.registerValidation, RegisterController.register);
        this.router.get('/login', RegisterController.loginView);
        this.router.post('/login', this.loginValidation, RegisterController.login);
        this.router.get('/logout', RegisterController.logout);
       
    }
    

    public registerValidation = [
        check('name')
            .notEmpty().withMessage('First name is required !'),
        check('mobile')
            .notEmpty().withMessage('Mobile is required !')
            .isMobilePhone('en-IN').withMessage('Enter valid mobile number !')
            .custom(async (mobile, {req}) => {
                let result = await RegisterController.isUserRegistered(mobile);
                if (result) return Promise.reject('This user is already available !!!');
            }),
        check('password')
            .notEmpty().withMessage('Password is required !'),
        check('rePassword')
            .notEmpty().withMessage('Re-password is required !')
            .custom((value, { req }) => value === req.body.password).withMessage('Re-password field must have the same value as the password field'),
        check('profilePic')
            .custom((value, {req}) => req.files.length > 0).withMessage('Profile pic is required !')
            .custom((value, {req})=>  ['image/jpg', 'image/JPG', 'image/jpeg'].includes(req.files[0].mimetype) ).withMessage('Please select only *jpg !!!')
            .custom((value, {req})=> req.files[0].size < 100*1024 ).withMessage('Image size is more then 100 KB !!!')
    ];

    

    public loginValidation = [
        check('mobile')
            .notEmpty().withMessage('Mobile is required !')
            .isMobilePhone('en-IN').withMessage('Enter valid mobile number !')
            .custom(async (mobile, {req}) => {
                let result = await RegisterController.isUserRegistered(mobile);
                if (!result) return Promise.reject('You are not registered with us !!! Please register first !');
            }),
        check('password')
            .notEmpty().withMessage('Password is required !')
            .custom(async (password, {req}) => {
                let result = await RegisterController.isUserRegistered(req.body.mobile);
                if (result && (result.password!=password)) return Promise.reject('Password is not correct !');
            })
    ];


}

const regRoute=new RegisterRoute();

export default regRoute.router;