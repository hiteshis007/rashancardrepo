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
const logger_1 = __importDefault(require("../../config/logger"));
const rc_model_1 = __importDefault(require("../masterRC/rc_model"));
class RCController {
    static listView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.render('list', { 'rcList': [] });
        });
    }
    static list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let paging = req.body.paging;
                const itemLimit = 100;
                let skip = (paging * itemLimit) - itemLimit;
                logger_1.default.log('list', skip);
                let data = yield rc_model_1.default.find().limit(itemLimit).skip(skip).exec();
                logger_1.default.log('list : ', 'RC size is : ' + data.length);
                res.json({ status: 200, data: data });
            }
            catch (error) {
                logger_1.default.error('list : ', error);
                res.json({ status: 500 });
            }
        });
    }
    static profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.session.user;
                logger_1.default.log('profile : ', user.name);
                res.render('profile', { 'user': user });
            }
            catch (error) {
                logger_1.default.error('profile : ', error);
                res.render('list');
            }
        });
    }
    static searchView(req, res) {
        res.render('search');
    }
    static search(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rcNo;
            try {
                rcNo = req.body.rcId;
                logger_1.default.log('search : ', 'RC id : ' + rcNo);
                let vError = validator_1.default(req);
                if (vError.isEmpty()) {
                    let rc = yield rc_model_1.default.findOne({ rasncrdno: rcNo }).exec();
                    if (rc) {
                        logger_1.default.log('search : ', 'RC found !');
                        res.render('search', { rc: rc });
                    }
                    else {
                        logger_1.default.log('search : ', 'RC not found !');
                        res.render('search', { rcId: rcNo, error: 'Rashan card details not found !' });
                    }
                }
                else {
                    logger_1.default.log('search : ', vError.mapped());
                    res.render('search', { rcId: rcNo, error: vError.mapped() });
                }
            }
            catch (error) {
                logger_1.default.log('search : ', error);
                res.render('search', { rcId: rcNo, error: error });
            }
        });
    }
    static searchForUpdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rcNo;
            try {
                rcNo = req.body.rcId;
                logger_1.default.log('searchForUpdate : ', 'RC id : ' + rcNo);
                let vError = validator_1.default(req);
                if (vError.isEmpty()) {
                    let rc = yield rc_model_1.default.findOne({ rasncrdno: rcNo }).exec();
                    if (rc) {
                        logger_1.default.log('searchForUpdate : ', 'RC found !');
                        res.render('update', { rc: rc });
                    }
                    else {
                        logger_1.default.log('searchForUpdate : ', 'RC not found !');
                        res.render('update', { rcId: rcNo, rc: new rc_model_1.default(), error: 'Rashan card details not found !' });
                    }
                }
                else {
                    logger_1.default.log('searchForUpdate : ', vError.mapped());
                    res.render('update', { rcId: rcNo, rc: new rc_model_1.default(), error: vError.mapped() });
                }
            }
            catch (error) {
                logger_1.default.log('searchForUpdate : ', error);
                res.render('update', { rcId: rcNo, rc: new rc_model_1.default(), error: error });
            }
        });
    }
    static updateView(req, res) {
        res.render('update', { rc: new rc_model_1.default() });
    }
    static update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let rcModel = new rc_model_1.default(req.body);
                let vErrors = validator_1.default(req);
                if (vErrors.isEmpty()) {
                    //logger.log('update : ', rcModel);
                    const result = yield rc_model_1.default.updateOne({ rasncrdno: rcModel.rasncrdno }, { mobile: rcModel.mobile, status: rcModel.status });
                    logger_1.default.log('update : ', 'Rashan card updated successfully !!');
                    res.render('update', { rc: new rc_model_1.default(), success: 'Rashan card updated successfully !!' });
                }
                else {
                    logger_1.default.log('update : ', vErrors.mapped());
                    res.render('update', { rc: rcModel, errors: vErrors.mapped() });
                }
            }
            catch (error) {
                logger_1.default.error('update catch : ', error);
                res.render('update', { rc: new rc_model_1.default(), errors: 'Could not save ! Some error occurred at server side !!' });
            }
        });
    }
}
exports.default = RCController;
