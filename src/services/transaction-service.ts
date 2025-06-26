import Transactions from "../Models/transaction-model";
import userIncome from "../Models/income-model";
import transaction from "../controllers/transaction";

export class TransactionService {
    constructor() {
    }

    async addTransaction(userId : string , cat_id : string , description : string , attachment : string , income : string, expense : string) {
        if(!description || (!income && !expense) || !cat_id) {
            throw { status : 401 , message : 'Please provide all information' }
        }

        const transactions = await Transactions.find({ user: userId });
        let totalIncome = 0

        for (const tx of transactions) {
            if (tx.income) {
                totalIncome += parseFloat(tx.income);
            }
        }

        // Check if sufficient balance
        if (totalIncome < parseFloat(expense)) {
            throw { status: 400, message: 'Insufficient income balance' };
        }

        // // save user transaction
        const transaction = new Transactions({user: userId , category : cat_id , description , attachment , income , expense })
        await transaction.save()

        return transaction

    }


    async getTransactionList(userId : string ,filter: { startDate?: string; endDate?: string; search?: string }) {
        const query :any = {
            user : userId
        }
        if(filter.startDate) {
            query.createdAt = {
                $gte: new Date(filter.startDate),
            };
        }
        if(filter.search) {
            query.description = { $regex : filter.search, $options:"i" }
        }
        const list = await Transactions.find(query)
            .populate("category","name")
            .sort(({createdAt: -1}));
        if(!list) {
            throw { status : 404 , message : 'No transactions list' }
        }
        return list
    }

    async deleteTransaction(id : string) {
        const transaction = await Transactions.findByIdAndDelete(id)
        if(!transaction) {
            throw { status : 404 , message : 'Transaction not found !!!' }
        }
        return transaction

    }

    async getIncomeAndExpenses(userId : string) {
        const transactions = await Transactions.find({ user: userId });

        let totalIncome = 0
        let totalExpense = 0

        for (const tx of transactions) {
            if (tx.income) {
                totalIncome += parseFloat(tx.income);
            }

            if (tx.expense) {
                totalExpense += parseFloat(tx.expense);
            }
        }

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense
        };

    }


    async updateTransaction( transaction_id : string , userId : string , cat_id : string , description : string , attachment : string , income : string, expense : string) {

        if(!description || (!income && !expense) || !cat_id) {
            throw { status : 401 , message : 'Please provide all information' }
        }

        const transactions = await Transactions.find({ user: userId });
        let totalIncome = 0

        for (const tx of transactions) {
            if (tx.income) {
                totalIncome += parseFloat(tx.income);
            }
        }

        // Check if sufficient balance
        if (totalIncome < parseFloat(expense)) {
            throw { status: 400, message: 'Insufficient income balance' };
        }

        // update your transaction
        const transaction = await Transactions.findByIdAndUpdate(transaction_id, {user: userId , category : cat_id , description , attachment , income , expense }, { new : true})
        return transaction
    }

}