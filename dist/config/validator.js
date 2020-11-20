"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validation = (req) => {
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => { return `${msg}`; };
    let vErrors = express_validator_1.validationResult(req).formatWith(errorFormatter);
    //logger.log(vErrors);
    return vErrors;
};
exports.default = validation;
