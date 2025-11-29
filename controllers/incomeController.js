import incomeModel from "../models/IncomeModel.js";
import xlsx from "xlsx";



//add income
export const addIncome =async(req, res)=>{
    const userId = req.userId
    
    try {
        const {icon, source,amount,date} = req.body

        if (!source || !amount || !date){
            throw new Error("Please fill required fields");
            
        }

        const newIncome = new incomeModel({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        })

        await newIncome.save();

        res.status(200).json({
            message:"income added",
            success:true,
            error:false,
            data: newIncome
        })

        
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//get all the incomes
export const getAllIncome = async(req, res)=>{
    const userId = req.userId;
     try {
        const incomes = await incomeModel.find({userId}).sort({date:-1});

        res.json({
            success:true,
            error:false,
            message:"all incomes fetched",
            data: incomes
        })
     } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
     }
}

//delete an income
export const deleteIncome = async(req, res)=>{

    const {id} = req.params;

    try {
         await incomeModel.findByIdAndDelete(id)
        res.json({
            message:"income deleted",
            success:true,
            error:false
        })
    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}

//download income
export const downloadIncomeExcel = async(req, res)=>{
    const userId = req.userId;

    try {
        const income = await incomeModel.find({userId}).sort({date:-1})

        //prepare data for excel
        const data = income.map((item)=>({
            Source: item.source,
            Amount:item.amount,
            Date:item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Income")
        xlsx.writeFile(wb,"income_details.xlsx");
        res.download("income_details.xlsx");

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}