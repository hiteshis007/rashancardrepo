import multer from 'multer';

class Multer {

    public multer_setting;

    constructor() {

        let multer_storage = multer.diskStorage({
            destination:(req, file, callBack)=>{
                callBack(null, 'src/public/');
            },
            filename:(req, file, callBack)=>{
                console.info(file);
                callBack(null, file.filename);
            }
        });

        var storage = multer.memoryStorage();
        
        //this.multer_setting=multer({ dest: 'src/public/' })
        //this.multer_setting=multer(multer_storage);
        this.multer_setting = multer({ storage: storage });
        
    }
}

const obj = new Multer();

export default obj.multer_setting;