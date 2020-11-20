"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const mrc_controller_1 = __importDefault(require("./mrc_controller"));
class MRCRoute {
    constructor() {
        this.searchValidation = [
            express_validator_1.check('rcId')
                .notEmpty().withMessage('This field is required !')
                .isLength({ min: 12, max: 12 }).withMessage('Please type 12 digit rashan card number !')
                .isInt().withMessage('Rashan card number contains only numbers not characters and special numbers !')
        ];
        this.router = express_1.Router();
        this.router.get('/search', mrc_controller_1.default.searchView);
        this.router.post('/search', this.searchValidation, mrc_controller_1.default.search);
        this.router.post('/upload', mrc_controller_1.default.upload);
    }
}
const mrcRoute = new MRCRoute();
exports.default = mrcRoute.router;
