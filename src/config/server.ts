import http from "http";
import Express from "../config/express"
import logger from "../config/logger";

const port = process.env.PORT || 8001;
Express.set('port', port);

const s = http.createServer(Express);
s.listen(port);

s.on('error', (error)=>{
    logger.error('Connection error', error.stack);
});

s.on('connection', ()=>{
    //console.log('Connection established..');
});

s.on('listening', ()=>{
    logger.log('Server listening on : '+port);
});



