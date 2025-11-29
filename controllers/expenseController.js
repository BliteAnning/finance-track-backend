import expenseModel from "../models/ExpenseModel.js";
import xlsx from 'xlsx'

//add an expense
export const addExpense = async(req,res)=>{
     const userId = req.userId
        
        try {
            const {icon, category,amount,date} = req.body
    
            if (!category || !amount || !date){
                throw new Error("Please fill required fields");
                
            }
    
            const newExpense = new expenseModel({
                userId,
                icon,
                category,
                amount,
                date: new Date(date)
            })
    
            await newExpense.save();
    
            res.status(200).json({
                message:"expense added",
                success:true,
                error:false,
                data: newExpense
            })
    
            
        } catch (err) {
            res.json({
                message: err.message || err,
                error: true,
                success: false
            })
        }
}

//get all expenses
export const getAllExpense = async(req,res)=>{
    const userId = req.userId;
     try {
        const expenses = await expenseModel.find({userId}).sort({date:-1});

        res.json({
            success:true,
            error:false,
            message:"all expenses fetched",
            data: expenses
        })
     } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
     }
}

//delete an expense
export const deleteExpense = async(req,res)=>{
    const {id} = req.params;

    try {
         await expenseModel.findByIdAndDelete(id)
        res.json({
            message:"expense deleted",
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

//download expense excel
export const downloadExpenseExcel = async(req,res)=>{
    const userId = req.userId;

    try {
        const expense = await expenseModel.find({userId}).sort({date:-1})

        //prepare data for excel
        const data = expense.map((item)=>({
            Category: item.category,
            Amount:item.amount,
            Date:item.date
        }))

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense")
        xlsx.writeFile(wb,"expense_details.xlsx");
        res.download("expense_details.xlsx");

    } catch (err) {
        res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}