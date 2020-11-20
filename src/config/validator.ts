import {validationResult} from 'express-validator';
import logger from '../config/logger';

const validation = (req) => {

    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {return `${msg}`};
    let vErrors = validationResult(req).formatWith(errorFormatter);
    //logger.log(vErrors);
    return vErrors;
    
}
 
export default validation;