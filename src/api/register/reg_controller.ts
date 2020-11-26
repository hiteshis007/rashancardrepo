import {Request, Response} from 'express';
import fs from 'fs';

import validation from '../../config/validator';
import RegModel from './reg_model';
import LoginModel from './login_model';
import logger from '../../config/logger';



export default class RegisterController {
    
    public static async isUserRegistered(mobile){

        try {
            
            let result = await RegModel.findOne({mobile:mobile}).exec();
            if(result) return result;
            else return undefined;

        } catch (error) {
            return undefined;
        }

    }
    
    public static registerView(req:Request, res:Response){
        res.render('register', {user:new RegModel()});
    }

    public static async register(req, res:Response){

        let regModel;
        try {

            regModel = new RegModel(req.body);
            if(req.files.length>0){
                //logger.log(req.files[0]);
                let bs = "data:"+req.files[0].mimetype+";base64, "+req.files[0].buffer.toString('base64');
                regModel.profilePic.data=bs;
                regModel.profilePic.contentType=req.files[0].mimetype;
            }
            //logger.log(req.files[0])
            //logger.log('register : ', regModel);

            let vErrors = validation(req);
            if(vErrors.isEmpty()){

                //logger.log('register : ', regModel);
                let result = await regModel.save();
                logger.log('register : ', 'User saved successfully !!');
                res.send({
                    message: 'User saved successfully !!',
                    statusCode: 200,
                    redirect: '/home'
                });
            
            } else {

                logger.info('register : ',vErrors.mapped());
                regModel.profilePic = '';
                res.send({
                    message: 'Some form filling error occurred !!',
                    statusCode: 400,
                    data:regModel,
                    error:vErrors.mapped()
                });

            }
            
        } catch (error) {

            logger.info('register catch : ', error);
            res.send({
                message: 'Could not register user! Some server side error occurred !!',
                statusCode: 500,
                data:new RegModel(),
                error:error
            });

        }
    
    }

    public static loginView(req:Request, res:Response){
        res.render('login', {mobile:''});
    }

    public static async login(req:Request, res:Response){

        try {
            
            let loginModel=new LoginModel(req.body);
            
            let vErrors = validation(req);
            if(vErrors.isEmpty()){

                logger.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                logger.log('login by : ', loginModel.mobile);
                req.session.user = await RegModel.findOne({mobile:loginModel.mobile}).exec();
                res.redirect('/rc/search');

            } else{
                
                logger.log('login : ',vErrors.mapped());
                res.render('login', {mobile: loginModel.mobile, error:vErrors.mapped()});
            
            }

        } catch (error) {

            logger.log('login : ',error);
            res.render('login', {mobile:'', error:{error:'Could not login ! Some server side error occurred !!'}});
            
        }
        
    }

    public static async logout(req:Request, res:Response){

        try {
            
            logger.log('login : ', 'You are logged out now !!');
            logger.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
            delete res.locals.user;
            await req.session.destroy(function(err) {});
            res.redirect('/home');

        } catch (error) {
            res.redirect('/home');
        }
        
    }

}