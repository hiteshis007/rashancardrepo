"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const url_1 = __importDefault(require("url"));
const logger_1 = __importDefault(require("../config/logger"));
const path_1 = __importDefault(require("path"));
const routes_1 = __importDefault(require("../config/routes"));
class Express {
    constructor() {
        this.app = express_1.default();
        this.setEnv();
        this.connectToMongoDB();
        this.setView();
        this.setStaticDir();
        this.setMiddleware();
        this.setRoutes();
    }
    setRoutes() {
        new routes_1.default(this.app);
    }
    setEnv() {
        let envFile = 'src/config/.env';
        let _NODE_ENV = (process.env.NODE_ENV) ? (process.env.NODE_ENV).trim() : '';
        //logger.log(_NODE_ENV);
        if (_NODE_ENV == 'production')
            envFile += '.pro';
        else if (_NODE_ENV == 'development')
            envFile += '.dev';
        logger_1.default.log('Working with ' + envFile);
        dotenv_1.default.config({ path: envFile });
        dotenv_1.default.config({ path: 'src/config/.env.cmn' });
    }
    connectToMongoDB() {
        mongoose_1.default.connect(process.env.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            // we're connected!
            logger_1.default.log('Connected to mongoDB !!!!');
        });
    }
    setStaticDir() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, '../../src/public')));
    }
    setView() {
        this.app.set('views', path_1.default.join(__dirname, '../../src/views'));
        this.app.set('view engine', 'ejs');
    }
    setMiddleware() {
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false }));
        this.app.use(cookie_parser_1.default());
        this.app.use(express_session_1.default({
            secret: 'mysecret',
            resave: false,
            saveUninitialized: false // ,
            // cookie: {
            //     maxAge: 100000
            // }
        }));
        this.app.use(function (req, res, next) {
            // get the url pathname
            var pathname = url_1.default.parse(req.url).pathname;
            logger_1.default.log("Request coming from : " + pathname);
            //logger.log('Session timeout for : ', pathname, req.session.user ? true : false);
            if (pathname == '/')
                next();
            else if (req.session.user) {
                //console.log(req.session.user);
                res.locals.user = req.session.user;
                next();
            }
            else
                res.redirect('/');
        });
    }
}
exports.default = new Express().app;
