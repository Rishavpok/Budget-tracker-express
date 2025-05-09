import express from "express";
var  router = express.Router()
import { IncomeService } from "../services/income-service";
import {RequestUser} from "../types/requestUser";

// Add income

router.post('/add', async (req:  RequestUser, res) => {
    const { amount } = req.body
    const { userId } = req
    const incomeService  = new IncomeService()
    try {
        const income = await incomeService.addIncome(amount, userId)
        if(income) res.status(200).json({ message : 'Income added successfully' })
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message : err.message || "Server error" })
    }
} )

router.get('/details', async (req: RequestUser , res) => {
    const { userId } = req
    const incomeService  = new IncomeService()
    try {
        const income = await incomeService.getIncome(userId)
        if(income) {
            res.status(200).json({ amount : income })
        }
    } catch (err) {
        const status = err.status || 500;
        res.status(status).json({ message : err.message || 'Server error' })
    }


} )

export default router