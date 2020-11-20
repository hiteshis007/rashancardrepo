import {Request, Response} from 'express';

import validation from '../../config/validator';
import logger from '../../config/logger';
import RCModel from '../masterRC/rc_model';





export default class RCController {

    public static async listView(req:Request, res:Response) {
        res.render('list', {'rcList':[]});
    }

    public static async list(req:Request, res:Response) {
        try {

            let paging = req.body.paging;
            const itemLimit = 100;
            let skip = (paging * itemLimit) - itemLimit;
            
            logger.log('list', skip);
            let data = await RCModel.find().limit(itemLimit).skip(skip).exec();
            logger.log('list : ', 'RC size is : '+data.length);
            res.json({status:200, data:data});
            
        } catch (error) {

            logger.error('list : ', error);
            res.json({status:500});

        }
    }

    public static async profile(req:Request, res:Response) {
        try {

            let user = req.session.user;
            logger.log('profile : ', user.name);
            res.render('profile', {'user':user});
            
        } catch (error) {

            logger.error('profile : ', error);
            res.render('list');

        }
    }

    public static searchView(req:Request, res:Response){
        res.render('search');
    }
    
    public static async search(req:Request, res:Response) {
        
        let rcNo;
        try {

            rcNo=req.body.rcId;
            logger.log('search : ', 'RC id : '+rcNo);

            let vError = validation(req);
            if(vError.isEmpty()){

                let rc = await RCModel.findOne({rasncrdno:rcNo}).exec();          
                if(rc){

                    logger.log('search : ', 'RC found !');
                    res.render('search', {rc:rc});

                } else { 

                    logger.log('search : ', 'RC not found !');
                    res.render('search', {rcId:rcNo, error:'Rashan card details not found !'});

                }

            }else{

                logger.log('search : ', vError.mapped());
                res.render('search', {rcId:rcNo, error:vError.mapped()});

            }
            
        } catch (error) {

            logger.log('search : ', error);
            res.render('search', {rcId:rcNo, error:error});
        }
        
    }

    public static async searchForUpdate(req:Request, res:Response) {
        
        let rcNo;
        try {

            rcNo=req.body.rcId;
            logger.log('searchForUpdate : ', 'RC id : '+rcNo);

            let vError = validation(req);
            if(vError.isEmpty()){

                let rc = await RCModel.findOne({rasncrdno:rcNo}).exec();          
                if(rc){

                    logger.log('searchForUpdate : ', 'RC found !');
                    res.render('update', {rc:rc});

                } else { 

                    logger.log('searchForUpdate : ', 'RC not found !');
                    res.render('update', {rcId:rcNo, rc : new RCModel(), error:'Rashan card details not found !'});

                }

            }else{

                logger.log('searchForUpdate : ', vError.mapped());
                res.render('update', {rcId:rcNo, rc : new RCModel(), error:vError.mapped()});

            }
            
        } catch (error) {

            logger.log('searchForUpdate : ', error);
            res.render('update', {rcId:rcNo, rc : new RCModel(), error:error});
        }
        
    }

    public static updateView(req:Request, res:Response){
        res.render('update', {rc : new RCModel()});
    }

    public static async update(req:Request, res:Response) {

        try {

            let rcModel = new RCModel(req.body);
            
            let vErrors = validation(req);
            if(vErrors.isEmpty()){

                //logger.log('update : ', rcModel);
                const result = await RCModel.updateOne({ rasncrdno: rcModel.rasncrdno }, { mobile: rcModel.mobile, status:rcModel.status });
                logger.log('update : ', 'Rashan card updated successfully !!');
                res.render('update', {rc : new RCModel(), success:'Rashan card updated successfully !!'});
            
            } else {

                logger.log('update : ', vErrors.mapped());
                res.render('update', {rc : rcModel, errors : vErrors.mapped()});

            }

        } catch (error) {

            logger.error('update catch : ', error);
            res.render('update', {rc : new RCModel(), errors:'Could not save ! Some error occurred at server side !!'});

        }
    
    }

}