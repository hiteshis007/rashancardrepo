
import {Schema, model} from 'mongoose';

const schema= new Schema({
    email:String,
    password:String
});

export default model('login', schema);