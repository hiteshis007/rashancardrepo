"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dateformat_1 = __importDefault(require("dateformat"));
class Logger {
    position(type) {
        var err = new Error();
        var caller_line = err.stack.split("\n")[3];
        var baseLocation = path_1.default.basename(caller_line.substring(0, caller_line.length - 1));
        var d = dateformat_1.default(new Date(), "dd/mm/yy, h:MM TT");
        return [type, d, baseLocation];
    }
    log(...data) {
        console.log(this.position('LOG'), ...data);
    }
    // //For server console
    // public error(...data: any[]) {
    //    console.error(this.position('ERROR'), ...data);
    // }
    // //For file
    error(...data) {
        console.log(this.position('ERROR'), ...data);
    }
    //For both location.... file and server console
    // public error(...data: any[]) {
    //     console.error(this.position('ERROR'), ...data);
    //     console.log(this.position('ERROR'), ...data);
    // }
    info(...data) {
        console.info(this.position('INFO'), ...data);
    }
}
exports.default = new Logger();
