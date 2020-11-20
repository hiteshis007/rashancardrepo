"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RegisterRoute {
    constructor() {
        this.loginValidation = [];
        this.router = express_1.Router();
    }
}
const regRoute = new RegisterRoute();
exports.default = regRoute.router;
