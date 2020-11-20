"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const reg_route_1 = __importDefault(require("../api/register/reg_route"));
const mrc_route_1 = __importDefault(require("../api/masterRC/mrc_route"));
const urc_route_1 = __importDefault(require("../api/userRC/urc_route"));
class Routes {
    constructor(app) {
        this.app = app;
        this.app.use('/', reg_route_1.default);
        this.app.use('/home', mrc_route_1.default);
        this.app.use('/rc', urc_route_1.default);
        this.app.route('/home').get((req, res) => {
            res.render('homepage');
        });
    }
}
exports.default = Routes;
