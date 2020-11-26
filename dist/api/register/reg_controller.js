"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("../../config/validator"));
const reg_model_1 = __importDefault(require("./reg_model"));
const login_model_1 = __importDefault(require("./login_model"));
const logger_1 = __importDefault(require("../../config/logger"));
class RegisterController {
    static isUserRegistered(mobile) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield reg_model_1.default.findOne({ mobile: mobile }).exec();
                if (result)
                    return result;
                else
                    return undefined;
            }
            catch (error) {
                return undefined;
            }
        });
    }
    static registerView(req, res) {
        res.render('register', { user: new reg_model_1.default() });
    }
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let regModel;
            try {
                regModel = new reg_model_1.default(req.body);
                if (req.files.length > 0) {
                    //logger.log(req.files[0]);
                    let bs = "data:" + req.files[0].mimetype + ";base64, " + req.files[0].buffer.toString('base64');
                    regModel.profilePic.data = bs;
                    regModel.profilePic.contentType = req.files[0].mimetype;
                }
                //logger.log(req.files[0])
                //logger.log('register : ', regModel);
                let vErrors = validator_1.default(req);
                if (vErrors.isEmpty()) {
                    //logger.log('register : ', regModel);
                    let result = yield regModel.save();
                    logger_1.default.log('register : ', 'User saved successfully !!');
                    res.send({
                        message: 'User saved successfully !!',
                        statusCode: 200,
                        redirect: '/home'
                    });
                }
                else {
                    logger_1.default.info('register : ', vErrors.mapped());
                    regModel.profilePic = '';
                    res.send({
                        message: 'Some form filling error occurred !!',
                        statusCode: 400,
                        data: regModel,
                        error: vErrors.mapped()
                    });
                }
            }
            catch (error) {
                logger_1.default.info('register catch : ', error);
                res.send({
                    message: 'Could not register user! Some server side error occurred !!',
                    statusCode: 500,
                    data: new reg_model_1.default(),
                    error: error
                });
            }
        });
    }
    static loginView(req, res) {
        res.render('login', { mobile: '' });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let loginModel = new login_model_1.default(req.body);
                let vErrors = validator_1.default(req);
                if (vErrors.isEmpty()) {
                    logger_1.default.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                    logger_1.default.log('login by : ', loginModel.mobile);
                    req.session.user = yield reg_model_1.default.findOne({ mobile: loginModel.mobile }).exec();
                    res.redirect('/rc/search');
                }
                else {
                    logger_1.default.log('login : ', vErrors.mapped());
                    res.render('login', { mobile: loginModel.mobile, error: vErrors.mapped() });
                }
            }
            catch (error) {
                logger_1.default.log('login : ', error);
                res.render('login', { mobile: '', error: { error: 'Could not login ! Some server side error occurred !!' } });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.log('login : ', 'You are logged out now !!');
                logger_1.default.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
                delete res.locals.user;
                yield req.session.destroy(function (err) { });
                res.redirect('/home');
            }
            catch (error) {
                res.redirect('/home');
            }
        });
    }
}
exports.default = RegisterController;
