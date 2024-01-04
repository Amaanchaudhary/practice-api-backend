import mongoose, { Schema } from "mongoose";

const user = new Schema({
    name  : String,
    email : String,
    password : String 
} , {timestamps : true})

export default mongoose.model('users' , user )