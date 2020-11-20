"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
class Multer {
    constructor() {
        let multer_storage = multer_1.default.diskStorage({
            destination: (req, file, callBack) => {
                callBack(null, 'src/public/');
            },
            filename: (req, file, callBack) => {
                console.info(file);
                callBack(null, file.filename);
            }
        });
        this.multer_setting = multer_1.default({ dest: 'src/public/' });
        //this.multer_setting=multer(multer_storage);
    }
}
const obj = new Multer();
exports.default = obj.multer_setting;
