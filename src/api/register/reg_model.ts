
import {Schema, model} from 'mongoose';

const schema=new Schema({
    name:{
        type:String
    },
    mobile:{
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

},
{
  timestamps: true
}
);

export default model('Register', schema);