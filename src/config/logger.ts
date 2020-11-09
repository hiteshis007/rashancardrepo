import path from 'path';
import dateFormat from 'dateformat';

class Logger {
    
    private position(type:String){
        var err = new Error();
        var caller_line = err.stack.split("\n")[3];
        var baseLocation=path.basename(caller_line.substring(0, caller_line.length-1));
        var d =dateFormat(new Date(), "dd/mm/yy, h:MM TT");
        return [type, d, baseLocation];
    }
    
    public log(...data: any[]) {
        console.log(this.position('LOG'), ...data);
    }

    // //For server console
    // public error(...data: any[]) {
    //    console.error(this.position('ERROR'), ...data);
    // }

    // //For file
    public error(...data: any[]) {
        console.log(this.position('ERROR'), ...data);
    }

    //For both location.... file and server console
    // public error(...data: any[]) {
    //     console.error(this.position('ERROR'), ...data);
    //     console.log(this.position('ERROR'), ...data);
    // }

    public info(...data: any[]) {
        console.info(this.position('INFO'), ...data);
    }


}

export default  new Logger();