import mongoose from "mongoose";


const expenseSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"user", required:true},
    icon:{type:String},
    category:{type:String, required:true},
    amount:{type:Number, required:true},
    date:{type:Date, default:Date.now},
},{timestamps:true})

const expenseModel = mongoose.model.expense || mongoose.model('expense', expenseSchema)

export default expenseModel;