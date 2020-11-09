
import {Schema, model} from 'mongoose';

const schema=new Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:String
    },
    gender:{
        type:String
    },
    profilePic:{
        type:String
    },
    password:{
        type:String
    },
    rePassword:{
        type:String
    }

});

export default new model('Register', schema);