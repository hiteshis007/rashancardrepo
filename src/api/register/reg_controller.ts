import {Request, Response} from 'express';
import fs from 'fs';

import RegModel from './reg_model';
import LoginModel from './login_model';
import logger from '../../config/logger';



export default class RegisterController {
    
    public static async isUserRegistered(email){

        try {
            
            let result = await RegModel.findOne({email:email}).exec();
            if(result) return result;
            else return undefined;

        } catch (error) {
            return undefined;
        }

    }
    
    public static registerView(req:Request, res:Response){
        res.render('clientRegister', {client:new RegModel()});
    }

    // public static async register(req, res:Response){

    //     let regModel;
    //     try {

    //         regModel = new RegModel(req.body);
    //         if(req.files.length>0) regModel['profilePic']=req.files[0].filename;
        
    //         let vErrors = validation(req);
    //         if(vErrors.isEmpty()){

    //             logger.log('register : ', regModel);
    //             let result = await regModel.save();
    //             logger.log('register : ', 'User saved successfully !!');
    //             res.redirect('/login');
            
    //         } else {

    //             logger.info('register : ',vErrors.mapped());
    //             if(regModel.profilePic) fs.unlinkSync('src/public/'+regModel.profilePic);
    //             res.render('clientRegister', {client:regModel, error:vErrors.mapped()});

    //         }
            
    //     } catch (error) {

    //         logger.info('register : ', error);
    //         if(regModel.profilePic) fs.unlinkSync('src/public/'+regModel.profilePic);
    //         res.render('clientRegister', {error:{error:'Could not register user! Some server side error occurred!!'}});

    //     }
    
    // }

    public static loginView(req:Request, res:Response){
        res.render('clientLogin', {email:''});
    }

    // public static async login(req:Request, res:Response){

    //     try {
            
    //         let loginModel=new LoginModel(req.body);
            
    //         let vErrors = validation(req);
    //         if(vErrors.isEmpty()){

    //             logger.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
    //             logger.log('login by : ', loginModel.email);
    //             req.session.user = await RegModel.findOne({email:loginModel.email}).exec();
    //             res.redirect('/emp/list');

    //         } else{
                
    //             logger.log('login : ',vErrors.mapped());
    //             res.render('clientLogin', {email: loginModel.email, error:vErrors.mapped()});
            
    //         }

    //     } catch (error) {

    //         logger.log('login : ',error);
    //         res.render('clientLogin', {error:{error:'Could not login ! Some server side error occurred !!'}});
            
    //     }
        
    // }

    public static async logout(req:Request, res:Response){

        try {
            
            logger.log('login : ', 'You are logged out now !!');
            logger.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            delete res.locals.user;
            await req.session.destroy(function(err) {});
            res.redirect('/login');

        } catch (error) {
            res.redirect('/login');
        }
        
    }

}