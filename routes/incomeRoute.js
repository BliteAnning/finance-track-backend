import express from "express"
import {addIncome, getAllIncome, deleteIncome, downloadIncomeExcel} from "../controllers/incomeController.js"
import authMiddleware from "../middlewares/authMiddleware.js";


const incomeRouter = express.Router();

incomeRouter.post("/add-income",authMiddleware, addIncome)
incomeRouter.get("/get-all-income",authMiddleware, getAllIncome)
incomeRouter.delete("/delete-income/:id",authMiddleware, deleteIncome)
incomeRouter.get("/download-income",authMiddleware, downloadIncomeExcel)



export default incomeRouter;