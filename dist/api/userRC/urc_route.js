"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const urc_controller_1 = __importDefault(require("./urc_controller"));
class RegisterRoute {
    constructor() {
        this.searchValidation = [
            express_validator_1.check('rcId')
                .notEmpty().withMessage('This field is required !')
                .isLength({ min: 12, max: 12 }).withMessage('Please type 12 digit rashan card number !')
                .isInt().withMessage('Rashan card number contains only numbers not characters and special numbers !')
        ];
        this.updateValidation = [
            express_validator_1.check('mobile')
                .notEmpty().withMessage('This field is required !')
                .isLength({ min: 10, max: 10 }).withMessage('Please enter 10 digit mobile number !')
                .isInt().withMessage('Mobile number contains only numbers not characters and special numbers !'),
            express_validator_1.check('status')
                .notEmpty().withMessage('This field is required !')
        ];
        this.router = express_1.Router();
        this.router.get('/list', urc_controller_1.default.listView);
        this.router.post('/list', urc_controller_1.default.list);
        this.router.get('/profile', urc_controller_1.default.profile);
        this.router.get('/search', urc_controller_1.default.searchView);
        this.router.post('/search', this.searchValidation, urc_controller_1.default.search);
        this.router.get('/searchForUpdate', urc_controller_1.default.updateView);
        this.router.post('/searchForUpdate', this.searchValidation, urc_controller_1.default.searchForUpdate);
        this.router.get('/update', urc_controller_1.default.updateView);
        this.router.post('/update', this.updateValidation, urc_controller_1.default.update);
    }
}
const regRoute = new RegisterRoute();
exports.default = regRoute.router;
