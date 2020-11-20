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
const rc_model_1 = __importDefault(require("./rc_model"));
class MRCController {
    static searchView(req, res) {
        res.redirect('/home');
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
                        res.render('homepage', { rc: rc });
                    }
                    else {
                        logger_1.default.log('search : ', 'RC not found !');
                        res.render('homepage', { rcId: rcNo, error: 'Rashan card details not found !' });
                    }
                }
                else {
                    logger_1.default.log('search : ', vError.mapped());
                    res.render('homepage', { rcId: rcNo, error: vError.mapped() });
                }
            }
            catch (error) {
                logger_1.default.log('search : ', error);
                res.render('homepage', { rcId: rcNo, error: error });
            }
        });
    }
    static upload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let rcList = req.body.rcList;
            logger_1.default.log('upload', rcList.length);
            yield rc_model_1.default.create(rcList);
            res.json({ success: "success" });
        });
    }
}
exports.default = MRCController;
