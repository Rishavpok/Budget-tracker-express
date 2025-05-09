import userIncome from "../Models/income-model";

export class IncomeService {
    constructor() {
    }

    async addIncome(amount : string, userId : string) {
        const income = new userIncome({user : userId ,amount })
        if(!income) {
            throw { status : 424, message : 'Please enter your income' }
        }
        await income.save()
        return income
    }

    async getIncome(userId: string) {
        const income = await userIncome.find({ user: userId }).populate('user');
        if(!income) {
            throw { status : 404 , message : 'No income added for this user' }
        }
        return income

    }
}