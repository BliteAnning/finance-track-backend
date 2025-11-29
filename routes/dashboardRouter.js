import express from 'express'
import authMiddleware from '../middlewares/authMiddleware.js';
import { getDashboardData } from '../controllers/dshbdController.js';



const dashboardRouter = express.Router();

dashboardRouter.get('/get-dashboard-data', authMiddleware,getDashboardData)

export default dashboardRouter;
