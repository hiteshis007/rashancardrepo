import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import session from "express-session";
import url from "url";
import logger from "../config/logger";
import path from "path";
import Routes from "../config/routes";
import { validationResult } from "express-validator";

class Express {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.setEnv();

    this.connectToMongoDB();

    this.setView();

    this.setStaticDir();

    this.setMiddleware();

    this.setRoutes();
  }

  private setRoutes() {
    new Routes(this.app);
  }

  private setEnv() {
    let envFile = "src/config/.env";
    let _NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.trim() : "";
    //logger.log(_NODE_ENV);
    if (_NODE_ENV == "production") envFile += ".pro";
    else if (_NODE_ENV == "development") envFile += ".dev";
    logger.log("Working with " + envFile);

    dotenv.config({ path: envFile });
    
  }

  private connectToMongoDB() {
    mongoose.connect(process.env.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function () {
      // we're connected!
      logger.log("Connected to mongoDB !!!!");
    });
  }

  private setStaticDir() {
    this.app.use(express.static(path.join(__dirname, "../../src/public")));
  }

  private setView() {
    this.app.set("views", path.join(__dirname, "../../src/views"));
    this.app.set("view engine", "ejs");
  }

  private setMiddleware() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    this.app.use(cookieParser());

    this.app.use(
      session({
        secret: "mysecret",
        resave: false,
        saveUninitialized: false, // ,
        // cookie: {
        //     maxAge: 100000
        // }
      })
    );

    this.app.use(function (req, res, next) {
      // get the url pathname
      var pathname = url.parse(req.url).pathname;
      logger.log("Request coming from : " + pathname);
      //logger.log('Session timeout for : ', pathname, req.session.user ? true : false);

      if (pathname == "/home" || pathname == "/login" || pathname == "/register" || pathname == "/home/search") next();
      else if(pathname == "/") res.redirect("/home");
      else if (req.session.user) {
        //console.log(req.session.user);
        res.locals.user = req.session.user;
        next();
      } else res.redirect("/login");
    });
  }
}

export default new Express().app;
