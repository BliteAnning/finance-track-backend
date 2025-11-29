import { isValidObjectId, Types } from "mongoose";
import incomeModel from "../models/IncomeModel.js";
import expenseModel from "../models/ExpenseModel.js";


export const getDashboardData = async(req,res)=>{
    try {
        const userId = req.userId;
        const userObjectId = new Types.ObjectId(String(userId))

        //fetch total incomes and expenses
        const totalIncome = await incomeModel.aggregate([
            {$match:{userId: userObjectId}},
            {$group: {_id:null, total:{$sum:"$amount"}}},
        ]);

        console.log("total income", {totalIncome, userId: isValidObjectId(userId)});
        
        const totalExpense = await expenseModel.aggregate([
            {$match:{userId: userObjectId}},
            {$group: {_id:null, total:{$sum:"$amount"}}},
        ]);

        //get income transaxtions in the last 60 days
        const last60DaysIncomeTransactions = await incomeModel.find({
            userId,
            date: { $gte: new Date(Date.now() - 60*24*60*60*1000)},
        }).sort({date:-1});

        //get total income for the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum,transaction)=>sum+transaction.amount, 0
        );

        //get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await expenseModel.find({
            userId,
            date:{$gte:new Date(Date.now() - 30*24*60*60*1000)},
        }).sort({date:-1});

        //get total expenses for the last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction)=>sum + transaction.amount,0
        )

        //fetch last 5 transactions (income and expenses)
        const lastTransactions = [
            ...(await incomeModel.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"income",
                })
            ),
            ...(await expenseModel.find({userId}).sort({date:-1}).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type:"expense"
                })
            ),
        ].sort((a,b)=>b.date-a.date); //sort latest first

        res.json({
            totalBalance:
            (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: totalIncome[0]?.total || 0,
            totalExpenses: totalExpense[0]?.total || 0,
            last30DaysExpenses: {
                total:expenseLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome:{
                total: incomeLast60Days,
                transactions:last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
            success:true,
            error:false,
            message:"dashboard data success"
        })

    } catch (err) {
         res.json({
            message: err.message || err,
            error: true,
            success: false
        })
    }
}