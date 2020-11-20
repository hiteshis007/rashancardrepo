
import {Schema, model} from 'mongoose';

const schema= new Schema({
    mobile:String,
    password:String
});

export default model('login', schema);