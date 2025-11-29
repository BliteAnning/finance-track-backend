import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullName : {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password: {type: String, required:true},
    profileImgUrl: {type: String, default:null}
},{timestamps:true})

const userModel = mongoose.model.user || mongoose.model('user', userSchema)

export default userModel;