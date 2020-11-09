"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("../config/express"));
const logger_1 = __importDefault(require("../config/logger"));
const port = process.env.port;
express_1.default.set('port', port);
const s = http_1.default.createServer(express_1.default);
s.listen(port);
s.on('error', (error) => {
    logger_1.default.error('Connection error', error.stack);
});
s.on('connection', () => {
    //console.log('Connection established..');
});
s.on('listening', () => {
    logger_1.default.log('Server listening on : ' + port);
});
