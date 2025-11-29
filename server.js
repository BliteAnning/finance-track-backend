import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import authRouter from './routes/authRouter.js';
import incomeRouter from './routes/incomeRoute.js';
import expressRouter from './routes/expenseRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';





const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "*",
    
}));
app.use(express.json());


//routes
app.use("/api",authRouter )
app.use("/api/income", incomeRouter)
app.use("/api/expense", expressRouter)
app.use("/api/dashboard", dashboardRouter)

//server uploads folder
app.use('/uploads', express.static('uploads'))


const PORT = process.env.PORT || 8000;
connectDB().then (()=>{
    app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("DB connected");
    
});
})
