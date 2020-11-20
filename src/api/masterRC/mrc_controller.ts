import {Request, Response} from 'express';

import validation from '../../config/validator';
import logger from '../../config/logger';
import RCModel from './rc_model';






export default class MRCController {

    public static searchView(req:Request, res:Response){
        res.redirect('/home');
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
                    res.render('homepage', {rc:rc});

                } else { 

                    logger.log('search : ', 'RC not found !');
                    res.render('homepage', {rcId:rcNo, error:'Rashan card details not found !'});

                }

            }else{

                logger.log('search : ', vError.mapped());
                res.render('homepage', {rcId:rcNo, error:vError.mapped()});

            }
            
        } catch (error) {

            logger.log('search : ', error);
            res.render('homepage', {rcId:rcNo, error:error});
        }
        
    }

    public static async upload(req:Request, res:Response){

        let rcList = req.body.rcList;
        logger.log('upload', rcList.length);

        await RCModel.create(rcList);

       res.json({success:"success"});

     }
    
}