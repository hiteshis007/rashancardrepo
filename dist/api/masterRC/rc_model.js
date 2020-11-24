"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
//{"sno":"1.","rasncrdno":"008209800004","cardtyp":"APL","applicantnm":"मोहन लाल","fathernm":"प्रेमचन्द्र",
//"noffamilymember":"5","mobile":"","addr":"ढाणी नवोडा कुआं,","status":""}
const schema = new mongoose_1.Schema({
    sno: {
        type: String
    },
    rasncrdno: {
        type: String,
        unique: true
    },
    cardtyp: {
        type: String
    },
    applicantnm: {
        type: String
    },
    fathernm: {
        type: String
    },
    noffamilymember: {
        type: Number
    },
    mobile: {
        type: String
    },
    addr: {
        type: String
    },
    status: {
        type: String,
        default: ''
    }
});
exports.default = mongoose_1.model('Rashancard', schema);
