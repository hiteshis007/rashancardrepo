"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import regRoute from '../api/register/reg_route';
class Routes {
    constructor(app) {
        this.app = app;
        //this.app.use('/', regRoute);
        this.app.route('/').get((req, res) => {
            res.render('Homepage');
        });
    }
}
exports.default = Routes;
