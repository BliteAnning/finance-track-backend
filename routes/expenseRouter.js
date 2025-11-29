import express from "express"
import {addExpense, getAllExpense, deleteExpense, downloadExpenseExcel} from "../controllers/expenseController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const expenseRouter = express.Router();

expenseRouter.post("/add-expense",authMiddleware, addExpense)
expenseRouter.get("/get-all-expense",authMiddleware, getAllExpense)
expenseRouter.delete("/delete-expense/:id",authMiddleware, deleteExpense)
expenseRouter.get("/download-expense",authMiddleware, downloadExpenseExcel)



export default expenseRouter;