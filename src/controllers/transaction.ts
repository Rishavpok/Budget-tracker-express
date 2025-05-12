import express from "express";
import {RequestUser} from "../types/requestUser";
import { TransactionService } from "../services/transaction-service";
var router = express.Router()


// get transaction list

router.get('/list', async (req:RequestUser, res) => {
    const { userId } = req
    const service = new TransactionService()

    try {
        const transaction = await service.getTransactionList(userId)
        if(transaction) res.status(200).json({ data : transaction })
    } catch (err) {
        const status = err.status || 500
        res.status(status).json({message : err.message || 'Server Error!!!!' })
    }

} )

// Add new transaction
router.post('/add', async (req : RequestUser, res) => {
    const { userId } = req
    const { category , description , attachment , income , expense  } = req.body
    const service  = new TransactionService()
    try {
        const transaction = await service.addTransaction(userId, category, description , attachment, income , expense)
         if(transaction)  res.status(200).json({ message : 'Transaction added successfully !!!!' })
    } catch (e) {
        const status = e.status || 500
        res.status(status).json({ message : e.message || 'Internal server error !!!!' })
    }
} )

// delete transaction
router.delete('/:id', async (req , res) => {
    const { id } = req.params
    const service = new TransactionService()
    try {
        const transaction = await service.deleteTransaction(id)
         if(transaction) res.status(200).json({ message : ' Transaction deleted  successfully !!!!' })
    } catch (e) {
        const status = e.status || 500;
        res.status(status).json({ message : e.message || 'Server error' })
    }
} )

// get user income and expenses total
router.get('/info', async (req: RequestUser, res) => {
    const { userId } = req
    const  service = new TransactionService()

    try {
       const data = await service.getIncomeAndExpenses(userId)
        res.status(200).json({ data : data })
    } catch (e) {
        res.status(500).json({ message : 'Internal server error !!!' })
    }

} )

// Update transaction


router.put('/:id', async (req : RequestUser, res) => {
    const { userId } = req
    const { id } = req.params
    const { category , description , attachment , income , expense  } = req.body
    const  service = new TransactionService()

    try {
        const transaction = service.updateTransaction(id , userId , category , description , attachment , income, expense)
        if(transaction) res.status(200).json({ message : 'Transaction updated successfully' })

    } catch (e) {
        res.status(500).json({ message : 'Internal server error !!!' })
    }

} )


export default router