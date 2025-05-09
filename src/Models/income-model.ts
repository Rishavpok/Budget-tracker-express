import mongoose, {Schema} from "mongoose";

const IncomeSchema = new mongoose.Schema({
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : 'User',
      required  : true
    },
    amount : {
       type: String,
        required : true
    }
})

const userIncome = mongoose.model('Income' , IncomeSchema);

export default userIncome