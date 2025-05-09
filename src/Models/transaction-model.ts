import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    description : String,
    attachment : String,
    income : {
        type : String,
    },
    expense : {
        type : String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})


const Transactions = mongoose.model('Transaction', TransactionSchema )

export default Transactions