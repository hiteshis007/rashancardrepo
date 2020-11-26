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
const express_1 = require("express");
const multer_1 = __importDefault(require("../../config/multer"));
const reg_controller_1 = __importDefault(require("./reg_controller"));
const express_validator_1 = require("express-validator");
class RegisterRoute {
    constructor() {
        this.registerValidation = [
            express_validator_1.check('name')
                .notEmpty().withMessage('First name is required !'),
            express_validator_1.check('mobile')
                .notEmpty().withMessage('Mobile is required !')
                .isMobilePhone('en-IN').withMessage('Enter valid mobile number !')
                .custom((mobile, { req }) => __awaiter(this, void 0, void 0, function* () {
                let result = yield reg_controller_1.default.isUserRegistered(mobile);
                if (result)
                    return Promise.reject('This user is already available !!!');
            })),
            express_validator_1.check('password')
                .notEmpty().withMessage('Password is required !'),
            express_validator_1.check('rePassword')
                .notEmpty().withMessage('Re-password is required !')
                .custom((value, { req }) => value === req.body.password).withMessage('Re-password field must have the same value as the password field'),
            express_validator_1.check('profilePic')
                .custom((value, { req }) => req.files.length > 0).withMessage('Profile pic is required !')
                .custom((value, { req }) => ['image/jpg', 'image/JPG', 'image/jpeg'].includes(req.files[0].mimetype)).withMessage('Please select only *jpg !!!')
                .custom((value, { req }) => req.files[0].size < 100 * 1024).withMessage('Image size is more then 100 KB !!!')
        ];
        this.loginValidation = [
            express_validator_1.check('mobile')
                .notEmpty().withMessage('Mobile is required !')
                .isMobilePhone('en-IN').withMessage('Enter valid mobile number !')
                .custom((mobile, { req }) => __awaiter(this, void 0, void 0, function* () {
                let result = yield reg_controller_1.default.isUserRegistered(mobile);
                if (!result)
                    return Promise.reject('You are not registered with us !!! Please register first !');
            })),
            express_validator_1.check('password')
                .notEmpty().withMessage('Password is required !')
                .custom((password, { req }) => __awaiter(this, void 0, void 0, function* () {
                let result = yield reg_controller_1.default.isUserRegistered(req.body.mobile);
                if (result && (result.password != password))
                    return Promise.reject('Password is not correct !');
            }))
        ];
        this.router = express_1.Router();
        this.router.get('/register', reg_controller_1.default.registerView);
        this.router.post('/register', multer_1.default.array('profilePic'), this.registerValidation, reg_controller_1.default.register);
        this.router.get('/login', reg_controller_1.default.loginView);
        this.router.post('/login', this.loginValidation, reg_controller_1.default.login);
        this.router.get('/logout', reg_controller_1.default.logout);
    }
}
const regRoute = new RegisterRoute();
exports.default = regRoute.router;
